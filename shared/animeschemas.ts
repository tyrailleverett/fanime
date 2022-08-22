import { z } from "zod";

export const addAnimeSchema = z.object({
    anime: z.object({
        id: z.number().positive(),
        title: z.string().min(1, "Anime must have a title").trim(),
        image_url: z.string().min(1, "Anime must have an image").trim(),
        episodes: z.array(
            z.object({
                id: z.number().positive(),
                title: z.string().min(1, "Episode must have a title").trim()
            })
        )
    })
});

export const deleteAnimeSchema = z.object({
    id: z.number().positive()
});

export const updateEpisodeSchema = z.object({
    id: z.number().positive(),
    watched: z.boolean()
});
