import { useMutation, useQueryClient } from "@tanstack/react-query";
import customAxios from "../../utils/axios";
import { EpisodeCardProps } from "./episodecard.types";

const EpisodeCard = ({ episode, index }: EpisodeCardProps) => {
    const queryClient = useQueryClient();

    const toggleWatchedEpisode = async () => {
        episode.watched = !episode.watched;
        const response = await customAxios.put("/anime/updateanime", {
            data: episode
        });
        return response.data;
    };

    const { mutate } = useMutation(toggleWatchedEpisode, {
        onSettled: async () => {
            await queryClient.invalidateQueries(["animes"]);
        }
    });

    return (
        <div
            onClick={() => mutate()}
            className={`${
                episode.watched ? "bg-accent" : "bg-base-300"
            } p-2 hover:cursor-pointer tooltip rounded flex justify-center  items-center`}
            data-tip={episode.title}>
            <p>{index}</p>
        </div>
    );
};

export default EpisodeCard;
