import { GenreSectionProps } from "./animepage.types";
import GenreBadge from "./GenreBadge";

const GenreSection = ({ genres }: GenreSectionProps) => {
    return (
        <div className="p-4 rounded-md bg-base-300 md:p-8">
            <h2 className="pb-3 text-lg font-medium underline">Genres</h2>
            <li className="flex pl-4 gap-x-3">
                {genres.map((genre) => (
                    <GenreBadge key={genre.name} name={genre.name} />
                ))}
            </li>
        </div>
    );
};

export default GenreSection;
