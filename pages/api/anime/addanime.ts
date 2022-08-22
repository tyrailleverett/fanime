import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { addAnimeSchema } from "../../../shared/animeschemas";
import { authOptions } from "../auth/[...nextauth]";

const addAnime = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }

    if (req.method === "POST") {
        try {
            const id = session!.user!.id!;
            const { anime } = addAnimeSchema.parse(req.body);

            const addedAnime = await prisma.anime.create({
                data: {
                    id: anime.id,
                    title: anime.title,
                    image_url: anime.image_url,
                    user_id: id,
                    episodes: {
                        createMany: {
                            data: [...anime.episodes]
                        }
                    }
                }
            });
            res.status(201).json(addedAnime);
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return res.status(409).json({
                        error: "Anime already in your watchlist"
                    });
                }
            }
            res.status(400).json(error);
        }
    }
};

export default addAnime;
