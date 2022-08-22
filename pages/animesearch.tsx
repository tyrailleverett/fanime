import axios from "axios";
import Head from "next/head";
import AnimeGrid from "../components/animegrid/AnimeGrid";
import HeaderTitle from "../components/header/HeaderTitle";
import { AnimeSearchProps } from "../shared/sharedtypes";

const searchAnime = async (searchTerm: string) => {
    const response = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchTerm}`
    );
    const { data } = response;
    return data.data;
};

const AnimeSearch = ({ searchTerm, animes }: AnimeSearchProps) => {
    return (
        <>
            <Head>
                <title>Search | {searchTerm}</title>
            </Head>
            <div className="w-screen h-screen">
                <HeaderTitle title={`Search results for ${searchTerm}`} />
                <AnimeGrid animes={animes!} />
            </div>
        </>
    );
};

export default AnimeSearch;

export const getServerSideProps = async ({ query }: any) => {
    const searchTerm = query.search;
    const animes = await searchAnime(searchTerm);
    return {
        props: { animes, searchTerm }
    };
};
