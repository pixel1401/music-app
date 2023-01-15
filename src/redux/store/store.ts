import { geoCore } from './../service/geoCore';

import { configureStore, combineReducers } from '@reduxjs/toolkit'
import {
    MiddlewareAPI,
    isRejectedWithValue,
    Middleware,
} from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from './../../../node_modules/@reduxjs/toolkit/src/getDefaultMiddleware';


import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { shazamCoreApi } from './../service/shazamCore';
import playerReducer from '../features/playerSlice';
import logger from 'redux-logger';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import globalSlice from '../features/globalSlice';



const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['player']
};


const rootReducer = combineReducers({
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
    [geoCore.reducerPath]: geoCore.reducer,
    globalSlice : globalSlice   
});
const persistedReducer = persistReducer(persistConfig, rootReducer);



const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
        if (isRejectedWithValue(action)) {
            console.warn('We got a rejected action!');
            // toast.warn({ title: 'Async error!', message: action.error.data.message });
        }

        return next(action);
};

const middlewareHandler = (getDefaultMiddleware: any) => {
    const middlewareList = [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
        shazamCoreApi.middleware,
        geoCore.middleware,
        rtkQueryErrorLogger,
    ];
    if (process.env.NODE_ENV === 'development') {
        middlewareList.push(logger);
    }
    return middlewareList;
};





export const rootStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware),
});


// export const store = configureStore({
//     reducer: {
//         [shazamCoreApi.reducerPath] : shazamCoreApi.reducer ,
//         player: playerReducer,
//     } ,
//     middleware: (CurriedGetDefaultMiddleware) => CurriedGetDefaultMiddleware().concat(shazamCoreApi.middleware)
// })


export const persistor = persistStore(rootStore);
export type RootState = ReturnType<typeof rootStore.getState>;


// export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof rootStore.dispatch

setupListeners(rootStore.dispatch);