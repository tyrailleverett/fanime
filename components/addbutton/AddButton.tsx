import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import { EpisodeType } from "../../shared/sharedtypes";
import customAxios from "../../utils/axios";
import { AddButtonProps } from "./addbutton.types";

const AddButton = ({ title, image, malId }: AddButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const router = useRouter();

    const getEpisodes = async () => {
        const episodeList: EpisodeType[] = [];
        const response = await axios.get(
            `https://api.jikan.moe/v4/anime/${malId}/episodes?page=${pageCount}`
        );
        const data = await response.data;
        if (data["pagination"]["has_next_page"] === true) {
            episodeList.push(
                ...data["data"].map((episode: EpisodeType) => {
                    return {
                        id: episode.mal_id,
                        title: episode.title
                    };
                })
            );
            setPageCount(pageCount + 1);
            //setting timeout due to api rate limiting
            setTimeout(getEpisodes, 1000);
        } else {
            episodeList.push(
                ...data["data"].map((episode: EpisodeType) => {
                    return {
                        id: episode.mal_id,
                        title: episode.title
                    };
                })
            );
        }

        return episodeList;
    };

    const addToWatchlist = async () => {
        setIsLoading(true);
        const episodes = await getEpisodes();

        const animeToAdd = {
            id: malId,
            title,
            image_url: image,
            episodes: episodes
        };

        try {
            const response = await customAxios.post("/anime/addanime", {
                anime: animeToAdd
            });
            setIsLoading(false);
            toast.success("Anime added to watchlist");
            router.push("/user/userwatchlist");
        } catch (error) {
            setIsLoading(false);
            toast.error(error as string);
        }
    };
    return (
        <button
            onClick={addToWatchlist}
            className="p-2 text-white rounded bg-accent ">
            {isLoading ? (
                <ClipLoader size={20} color="#fff" />
            ) : (
                "Add to Watchlist"
            )}
        </button>
    );
};

export default AddButton;
