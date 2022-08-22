import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import prisma from "../../../db/db";
import { authOptions } from "../auth/[...nextauth]";

const getAnime = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    if (!session) {
        return res.status(401).end();
    }

    if (req.method === "GET") {
        try {
            const id = session!.user!.id!;

            const { id: animeId } = req.query;
            const parsedId = parseInt(animeId as string);

            const data = await prisma.user.findUnique({
                where: {
                    id: id
                },
                include: {
                    anime: {
                        where: {
                            id: parsedId
                        },
                        include: {
                            episodes: true
                        }
                    }
                }
            });

            res.status(200).json(data?.anime[0]);
        } catch (error) {
            res.status(400).json(error);
        }
    }
};

export default getAnime;
