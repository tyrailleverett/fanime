import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { deleteAnimeSchema } from "../../../shared/animeschemas";
import { authOptions } from "../auth/[...nextauth]";

const deleteAnime = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }

    if (req.method === "DELETE") {
        const { id } = deleteAnimeSchema.parse(req.body);
        try {
            const deletedAnime = await prisma.anime.delete({
                where: { id }
            });
            res.status(200).json(deletedAnime);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default deleteAnime;
