export interface ISongArtist {
    data: Daum[]
  }
  
  export interface Daum {
    id: string
    type: string
    attributes: Attributes
  }
  
  export interface Attributes {
    hasTimeSyncedLyrics: boolean
    albumName: string
    genreNames: string[]
    trackNumber: number
    releaseDate: string
    durationInMillis: number
    isVocalAttenuationAllowed: boolean
    isMasteredForItunes: boolean
    isrc: string
    artwork: Artwork
    audioLocale: string
    composerName: string
    url: string
    playParams: PlayParams
    discNumber: number
    isAppleDigitalMaster: boolean
    hasLyrics: boolean
    audioTraits: string[]
    name: string
    previews: Preview[]
    artistName: string
    contentRating?: string
  }
  
  export interface Artwork {
    width: number
    url: string
    height: number
    textColor3: string
    textColor2: string
    textColor4: string
    textColor1: string
    bgColor: string
    hasP3: boolean
  }
  
  export interface PlayParams {
    id: string
    kind: string
  }
  
  export interface Preview {
    url: string
  }
  