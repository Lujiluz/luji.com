import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://luji-space.vercel.app";

  // 1. Daftar halaman statis
  const staticRoutes = ["", "/work", "/writing"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  //   // 2. Simulasi fetch data blog
  //   // const posts = await prisma.post.findMany({ select: { slug: true, updatedAt: true } })
  //   const posts = [{ slug: "setup-backend-ai-2026", updatedAt: new Date() }];

  //   const blogRoutes = posts.map((post) => ({
  //     url: `${baseUrl}/blog/${post.slug}`,
  //     lastModified: post.updatedAt,
  //     changeFrequency: "weekly" as const,
  //     priority: 0.7,
  //   }));

  return [...staticRoutes];
}
