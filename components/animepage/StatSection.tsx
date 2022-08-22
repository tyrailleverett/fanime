import { AnimeProps } from "../../shared/sharedtypes";
import AnimeStat from "./AnimeStat";

const StatSection = ({ anime }: AnimeProps) => {
    const episodes = anime.episodes || "No Data";
    const score = anime.score || "No Data";
    const popularity = anime.popularity || "No Data";
    const members = anime.members || "No Data";
    return (
        <div className="flex justify-between p-4 rounded-md bg-base-300 md:p-8">
            <AnimeStat title={"Episodes"} stat={episodes as number} />
            <AnimeStat title={"Score"} stat={score} />
            <AnimeStat title={"Popularity"} stat={`#${popularity}`} />
            <AnimeStat title={"Members"} stat={members} />
        </div>
    );
};

export default StatSection;
