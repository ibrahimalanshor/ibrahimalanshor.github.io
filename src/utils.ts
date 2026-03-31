import { getCollection, type CollectionEntry } from "astro:content";
import dayjs from "dayjs";

export async function getServices() : Promise<CollectionEntry<'service'>[]> {
    const services = await getCollection('service')

    services.sort((a, b) => a.data.order - b.data.order)

    return services
}

export async function getPosts() : Promise<CollectionEntry<'blog'>[]> {
    const blogs = await getCollection('blog')

    blogs.sort((a, b) => dayjs(a.data.date).isAfter(b.data.date) ? -1 : 0)

    return blogs
}