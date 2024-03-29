export interface AppUserType {
    user: {
        id: number;
        username: string;
        avatar: string;
    };
}

export interface AnimesProps {
    animes: AnimeType[];
}

export interface IDProps {
    id: number;
}

export interface AnimeProps {
    anime: AnimeType;
}

export interface AnimeType {
    id: number;
    mal_id: number;
    title: string;
    image_url: string;
    synopsis: string;
    genres: GenreType[];
    episodes: number;
    score: number;
    popularity: number;
    members: number;
    images: any;
    recommendations: AnimeType[];
}

export interface WatchedAnimeType extends Omit<AnimeType, "episodes"> {
    episodes: EpisodeType[];
}

export interface GenreType {
    name: string;
}

export interface EpisodeType {
    id: number;
    mal_id: number;
    anime_id: number;
    watched: boolean;
    title: string;
}

export interface AnimeSearchProps {
    animes: AnimeType[];
    searchTerm: string;
}
