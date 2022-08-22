import { AnimesProps } from "../../shared/sharedtypes";
import AnimeCard from "./AnimeCard";

const AnimeGrid = ({ animes }: AnimesProps) => {
    return (
        <div className="grid gap-4 mx-8 mb-10 md:container md:mx-auto md:grid-cols-5 md:gap-10">
            {animes.map((anime) => {
                return (
                    <AnimeCard
                        anime={anime}
                        key={anime.mal_id || anime.title}
                    />
                );
            })}
        </div>
    );
};

export default AnimeGrid;
