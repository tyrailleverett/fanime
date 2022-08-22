import { AnimeStatProps } from "./animepage.types";

const AnimeStat = ({ title, stat }: AnimeStatProps) => {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium underline">{title}</h3>
            {stat}
        </div>
    );
};

export default AnimeStat;
