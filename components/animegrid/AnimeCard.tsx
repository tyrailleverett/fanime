import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaStar } from "react-icons/fa";
import { AnimeProps } from "../../shared/sharedtypes";

const AnimeCard = ({ anime }: AnimeProps) => {
    const animeImage = anime.image_url || anime.images.webp.image_url;
    const hasScore = anime.score !== undefined;

    const router = useRouter();

    const animePageRoute = {
        pathname: `/anime/${anime.title}`,
        query: { id: JSON.stringify(anime.mal_id) }
    };
    const userAnimeRoute = {
        pathname: `/anime/user/${anime.title}`,
        query: { id: JSON.stringify(anime.id) }
    };

    return (
        <Link
            href={
                router.asPath.includes("userwatchlist")
                    ? userAnimeRoute
                    : animePageRoute
            }>
            <div className="flex flex-col transition hover:cursor-pointer hover:-translate-y-5">
                <Image
                    className="rounded-t"
                    src={animeImage}
                    alt={anime.title}
                    width={250}
                    height={420}
                />
                <div className="flex items-center justify-between flex-1 p-2 rounded-b bg-base-200">
                    <h3
                        className={`${
                            hasScore ? "w-3/5 " : "w-full"
                        }font-semibold`}>
                        {anime.title}
                    </h3>
                    {hasScore && (
                        <div className="flex items-center gap-2">
                            <p className="font-semibold">{anime.score}</p>
                            <FaStar className="text-yellow-500" size={20} />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default AnimeCard;
