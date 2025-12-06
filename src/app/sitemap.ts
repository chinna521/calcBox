import { MetadataRoute } from 'next';
import { categories, tools } from '@/data/tools';
import { blogPosts } from '@/data/blog-posts';

const BASE_URL = 'https://calcbox.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ];

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${BASE_URL}/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Tool pages
    const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
        url: `${BASE_URL}/${tool.categoryId}/${tool.slug}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
    }));

    // Blog posts
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...categoryPages, ...toolPages, ...blogPages];
}
