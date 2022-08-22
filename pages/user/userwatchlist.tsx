import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { unstable_getServerSession } from "next-auth/next";
import Head from "next/head";
import AnimeGrid from "../../components/animegrid/AnimeGrid";
import HeaderTitle from "../../components/header/HeaderTitle";
import { AnimeType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { authOptions } from "../api/auth/[...nextauth]";

const getWatchedAnimes = async () => {
    const response = await customAxios.get("/anime/getanimes");
    return response.data;
};

const UserWatchListPage = () => {
    const { data: animes, isLoading } = useQuery<AnimeType[], Error>(
        ["animes"],
        () => getWatchedAnimes()
    );

    if (isLoading) {
        return (
            <h2 className="flex items-center justify-center h-screen text-xl font-bold">
                Loading...
            </h2>
        );
    }

    if (animes?.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center">
                <HeaderTitle title={"Your Anime Watchlist"} />
                <p className="p-4 text-xl font-medium text-center">
                    There are no animes in your watchlist.
                    <br /> Add some animes to get started!
                </p>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Watch List</title>
            </Head>
            <div className="w-screen h-screen">
                <HeaderTitle title={"Your Anime Watchlist"} />

                <AnimeGrid animes={animes!} />
            </div>
        </>
    );
};

export default UserWatchListPage;

export const getServerSideProps = async (ctx: any) => {
    const session = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
    );

    if (!session) {
        return {
            redirect: {
                destination: "/signin?redirect=/user/userwatchlist",
                permanent: false
            }
        };
    }

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["animes"], () => getWatchedAnimes());

    return {
        props: {
            deydratedState: dehydrate(queryClient)
        }
    };
};
