import Image from "next/image";
import { AnimeProps } from "../../shared/sharedtypes";
import AddButton from "../addbutton/AddButton";

const ImageSection = ({ anime }: AnimeProps) => {
    const title = anime.title || "No Title Available";

    const image =
        anime.images.webp.image_url || "https://via.placeholder.com/250x450";

    return (
        <div className="flex flex-col justify-center gap-y-3">
            <h1 className="text-2xl font-bold">{title}</h1>

            <Image
                className="rounded"
                src={image}
                width={250}
                height={450}
                alt={title}
            />
            <AddButton title={title} image={image} malId={anime.mal_id} />
        </div>
    );
};

export default ImageSection;
