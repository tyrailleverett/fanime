import { GenreType } from "../../shared/sharedtypes";

export interface AnimeStatProps {
    title: string;
    stat: number | string;
}

export interface SynopsisSectionProps {
    synopsis: string;
}

export interface GenreSectionProps {
    genres: GenreType[];
}

export interface GenreBadgeProps {
    name: string;
}
