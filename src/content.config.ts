import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/contents/blogs' }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        tag: z.string().array(),
        date: z.coerce.date()
    })
})

const service = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/contents/services' }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        description: z.string(),
        icon: z.string(),
        order: z.number()
    })
})

const project = defineCollection({
    loader: glob({ pattern: '**/*.{md,mdx}', base: './src/contents/projects' }),
    schema: z.object({
        title: z.string(),
        summary: z.string(),
        description: z.string(),
        icon: z.string()
    })
})

export const collections = { blog, service, project }