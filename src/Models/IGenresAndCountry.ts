export interface IGenreAndCountry {
    countries: Country[]
    global: Global
}

export interface Country {
    id: string
    listid: string
    momentum_listid?: string
    name: string
    cities: City[]
    genres: GenreCountry[]
}

export interface City {
    id: string
    name: string
    countryid: string
    listid: string
}

export interface GenreCountry {
    id: string
    countryid: string
    listid: string
    name: string
    urlPath: string
    count: number
}

export interface Global {
    genres: Genre[]
}

export interface Genre {
    id: string
    listid: string
    name: string
    urlPath: string
    count: number
}
