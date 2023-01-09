import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { MusicPlayer } from './Components/MusicPlayer';
import { SearchBar } from './Components/SearchBar';
import { Sidebar } from './Components/SIdebar';
import { TopPlay } from './Components/TopPlay';
import Discover from './pages/Discover';
import { useAppSelector } from './redux/store/hooks';

export function App() {
  const { isActive } = useAppSelector((state) => state.player);
  return (
    <>
      <div className="relative flex">
        <Sidebar/>
        <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
          <SearchBar />
          <div className="px-6 h-[calc(100vh-72px)]  xl:overflow-y-hidden overflow-y-scroll  hide-scrollbar flex xl:flex-row flex-col-reverse">
            <div className=" xl:overflow-y-scroll xl:h-[100%] flex-1 h-fit pb-60">
              <Routes>
                <Route path='/' element={<Discover />} />
              </Routes>
            </div>
            <div className="xl:overflow-x-scroll xl:pb-24 xl:h-[100%] xl:sticky relative top-0 h-fit">
              <TopPlay/>
            </div>
          </div>
        </div>
        {isActive && <MusicPlayer />}
      </div>
    </>
  );
}

export default App;
