import axios from "axios";
import Head from "next/head";
import AnimeGrid from "../../components/animegrid/AnimeGrid";
import GenreSection from "../../components/animepage/GenreSection";
import ImageSection from "../../components/animepage/ImageSection";
import StatSection from "../../components/animepage/StatSection";
import SynopsisSection from "../../components/animepage/SynopsisSection";
import { AnimeProps } from "../../shared/sharedtypes";

const getRecommendations = async (animeId: number) => {
    const newAnimeResponse = await axios.get(
        `https://api.jikan.moe/v4/anime/${animeId}`
    );
    const { data: anime } = await newAnimeResponse.data;
    const recommendationsResponse = await axios.get(
        `https://api.jikan.moe/v3/anime/${animeId}/recommendations`
    );
    const { recommendations } = await recommendationsResponse.data;
    anime.recommendations = recommendations.slice(0, 5);
    return anime;
};

const AnimePage = ({ anime }: AnimeProps) => {
    if (anime === undefined) {
        return (
            <h2 className="text-xl font-bold text-center">No results found</h2>
        );
    }

    return (
        <>
            <Head>
                <title>{anime.title}</title>
            </Head>
            <div className="max-w-5xl mx-auto sm:my-10 md:my-20">
                <div className="grid md:grid-cols-2 md:grid-rows-1">
                    <div className="w-3/5 justify-self-center">
                        <ImageSection anime={anime} />
                    </div>
                    <div>
                        <StatSection anime={anime} />
                        <SynopsisSection synopsis={anime.synopsis} />
                        <GenreSection genres={anime.genres} />
                    </div>

                    <div className="col-span-2">
                        <h2 className="pt-6 pb-2 text-lg font-semibold ">
                            Recommendations
                        </h2>
                        <AnimeGrid animes={anime.recommendations} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnimePage;

export const getServerSideProps = async ({ query }: any) => {
    const animeID = JSON.parse(query.id);

    const anime = await getRecommendations(animeID);
    return {
        props: { anime }
    };
};
