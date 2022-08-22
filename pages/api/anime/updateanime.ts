import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { updateEpisodeSchema } from "../../../shared/animeschemas";
import { authOptions } from "../auth/[...nextauth]";

const updateAnime = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }

    if (req.method === "PUT") {
        const { id, watched } = updateEpisodeSchema.parse(req.body.data);

        try {
            const updatedAnime = await prisma.episode.update({
                where: { id },
                data: { watched }
            });

            res.status(200).json(updatedAnime);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default updateAnime;
