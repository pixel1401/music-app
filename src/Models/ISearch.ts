import { Track } from "../Models/Tracks"

export interface ISearch {
    tracks: Tracks
    artists: Artists
}

export interface Tracks {
    hits: Hit[]
}

export interface Hit {
    track: Track
    snippet?: string
}




export interface Artists {
    hits: Hit2[]
}

export interface Hit2 {
    artist: ArtistSearch
}

export interface ArtistSearch {
    avatar: string
    name: string
    verified: boolean
    weburl: string
    adamid: string
}