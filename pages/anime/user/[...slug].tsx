import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import EpisodeCard from "../../../components/episodecard/EpisodeCard";
import {
    EpisodeType,
    IDProps,
    WatchedAnimeType
} from "../../../shared/sharedtypes";
import customAxios from "../../../utils/axios";

const getAnime = async (id: number) => {
    const response = await customAxios.get("/anime/getanime/", {
        params: { id }
    });
    return response.data;
};

const UserAnime = ({ id }: IDProps) => {
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();

    const { data: anime, isLoading } = useQuery<WatchedAnimeType, Error>(
        ["anime"],
        () => getAnime(id)
    );

    const deleteAnime = async (id: number) => {
        const response = await customAxios.delete(`/anime/deleteanime`, {
            data: { id }
        });
        if (response.status === 200) {
            router.push("/user/userwatchlist");
        }
    };

    if (isLoading) {
        return (
            <h2 className="flex items-center justify-center h-screen text-xl font-bold">
                Loading...
            </h2>
        );
    }

    if (!anime) {
        return (
            <h2 className="flex items-center justify-center h-screen text-xl font-bold">
                No Anime Found
            </h2>
        );
    }

    return (
        <>
            <Head>
                <title>{anime?.title}</title>
            </Head>
            <div className="container flex flex-col items-center w-screen h-screen mx-auto gap-y-2">
                <h1 className="text-4xl font-bold">{anime.title}</h1>
                <div className="relative">
                    <Image
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        className="rounded"
                        src={anime.image_url}
                        width={250}
                        height={450}
                        alt={anime.title}
                    />
                    {isHovering && (
                        <label
                            htmlFor="delete-anime-modal"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            className="absolute z-30 text-white bg-red-700 border-none rounded btn btn-sm hover:bg-red-900 right-2 top-2 ">
                            Delete
                        </label>
                    )}
                </div>

                <div className="grid w-5/6 grid-cols-4 gap-4 pb-10 mt-6 md:pb-20 md:w-full md:grid-cols-12">
                    {anime.episodes
                        .sort((a, b) => a.id - b.id)
                        .map((episode: EpisodeType, index: number) => (
                            <EpisodeCard
                                episode={episode}
                                index={index + 1}
                                key={episode.id}
                            />
                        ))}
                </div>
                <input
                    type="checkbox"
                    id="delete-anime-modal"
                    className="modal-toggle"
                />
                <label
                    htmlFor="projectDeleteModal"
                    className="cursor-pointer modal">
                    <label className="relative modal-box">
                        <p className="pb-10 text-center">
                            Are you sure you want to delete this project?
                        </p>
                        <div className="flex justify-evenly">
                            <label
                                htmlFor="delete-anime-modal"
                                className="btn btn-outline btn-success">
                                Cancel
                            </label>
                            <label
                                onClick={() => deleteAnime(anime.id)}
                                htmlFor="delete-anime-modal"
                                className="btn btn-outline btn-error">
                                Delete
                            </label>
                        </div>
                    </label>
                </label>
            </div>
        </>
    );
};

export default UserAnime;

export const getServerSideProps = async (context: any) => {
    const id = JSON.parse(context.query.id);

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery(["anime"], () => getAnime(id));

    return {
        props: { id, deydratedState: dehydrate(queryClient) }
    };
};
