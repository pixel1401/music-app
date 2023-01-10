import { HiOutlineHashtag, HiOutlineHome, HiOutlinePhotograph, HiOutlineUserGroup } from 'react-icons/hi';


class IGenres {
    title: string;
    value: string;

    constructor(title: string, value: string) {
        this.title = title;
        this.value = value;
    }
}


class ILinks  {
    
}



export const genres = [
    new IGenres('Pop', 'POP'),
    new IGenres('Hip-Hop', 'HIP_HOP_RAP',),
    new IGenres('Dance', 'DANCE',),
    new IGenres('Electronic', 'ELECTRONIC',),
    new IGenres('Soul', 'SOUL_RNB',),
    new IGenres('Alternative', 'ALTERNATIVE',),
    new IGenres('Rock', 'ROCK',),
    new IGenres('Latin', 'LATIN',),
    new IGenres('Film', 'FILM_TV'),
    new IGenres('Country', 'COUNTRY'),
    new IGenres('Worldwide', 'WORLDWIDE'),
    new IGenres('Reggae', 'REGGAE_DANCE_HALL',),
    new IGenres('House', 'HOUSE',),
    new IGenres('K-Pop', 'K_POP',)
]

export const links = [
    { name: 'Discover', to: '/', icon: HiOutlineHome },
    { name: 'Around You', to: '/around-you', icon: HiOutlinePhotograph },
    { name: 'Top Artists', to: '/top-artists', icon: HiOutlineUserGroup },
    { name: 'Top Charts', to: '/top-charts', icon: HiOutlineHashtag },
];




export function youtube_parser (url : string)   {
    console.log(url);
    let urlArr = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return (urlArr[2] !== undefined) ? urlArr[2].split(/[^0-9a-z_\-]/i)[0] : urlArr[0];

}