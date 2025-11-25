import { getCollection, type CollectionEntry } from "astro:content";

export async function getServices() : Promise<CollectionEntry<'service'>[]> {
    const services = await getCollection('service')

    services.sort((a, b) => a.data.order - b.data.order)

    return services
}