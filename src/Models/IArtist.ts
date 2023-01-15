export interface IArtist {
    data: Daum[]
}

export interface Daum {
    id: string
    type: string
    attributes: Attributes
    relationships: Relationships
}

export interface Attributes {
    genreNames: string[]
    name: string
    editorialNotes: EditorialNotes
    artwork: Artwork
    url: string
}

export interface EditorialNotes {
    name: string
    standard: string
    short: string
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

export interface Relationships {
    albums: Albums
}

export interface Albums {
    data: Daum2[]
}

export interface Daum2 {
    id: string
    type: string
}
