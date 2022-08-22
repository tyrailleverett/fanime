import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Head from "next/head";
import AnimeGrid from "../components/animegrid/AnimeGrid";
import HeaderTitle from "../components/header/HeaderTitle";
import { AnimesProps, AnimeType } from "../shared/sharedtypes";

const getAnimes = async () => {
    const response = await axios.get(`https://api.jikan.moe/v4/top/anime`);
    const { data } = response;
    return data.data;
};

const Home: NextPage<AnimesProps> = () => {
    const {
        data: animes,
        isLoading,
        isFetched
    } = useQuery<AnimeType[], Error>(["animes"], () => getAnimes());

    if (isLoading) {
        return (
            <h2 className="flex items-center justify-center h-screen text-xl font-bold">
                Loading...
            </h2>
        );
    }
    if (isFetched && !animes) {
        return (
            <h2 className="flex items-center justify-center h-screen text-xl font-bold">
                No Results Found
            </h2>
        );
    }

    return (
        <div>
            <Head>
                <title>Fanime</title>
            </Head>

            <main className="w-screen h-screen">
                <HeaderTitle title="Top Anime Shows" />
                <AnimeGrid animes={animes!} />
            </main>
        </div>
    );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["animes"], () => getAnimes());
    return {
        props: {
            deydratedState: dehydrate(queryClient)
        }
    };
};
