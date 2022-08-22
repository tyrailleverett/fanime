import { Dispatch, SetStateAction } from "react";

export interface HeaderSearchProps {
    searchAnime: () => void;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    searchTerm: string;
}

export interface HeaderTitleProps {
    title: string;
}
