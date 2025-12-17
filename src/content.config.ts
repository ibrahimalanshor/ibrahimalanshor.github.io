import { glob, file } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/contents/blogs' }),
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        tag: z.string().array(),
        date: z.coerce.date(),
        thumbnail: image().nullable().optional()
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

const bookmark = defineCollection({
  loader: file('./src/contents/bookmarks.json'),
  schema: z.object({
    name: z.string(),
    url: z.string().url()
  })
})

export const collections = { blog, service, project, bookmark }
