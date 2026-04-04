import type { MetadataRoute } from "next";
import { teams } from "@/data/players";

const BASE_URL = "https://www.fc-schwarzach.at";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,                    lastModified: new Date(), priority: 1.0,  changeFrequency: "daily"   },
    { url: `${BASE_URL}/spielplan`,     lastModified: new Date(), priority: 0.9,  changeFrequency: "daily"   },
    { url: `${BASE_URL}/news`,          lastModified: new Date(), priority: 0.8,  changeFrequency: "weekly"  },
    { url: `${BASE_URL}/mannschaften`,  lastModified: new Date(), priority: 0.8,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/verein`,        lastModified: new Date(), priority: 0.6,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/sponsoren`,     lastModified: new Date(), priority: 0.5,  changeFrequency: "monthly" },
    { url: `${BASE_URL}/kontakt`,       lastModified: new Date(), priority: 0.5,  changeFrequency: "yearly"  },
    { url: `${BASE_URL}/impressum`,     lastModified: new Date(), priority: 0.3,  changeFrequency: "yearly"  },
  ];

  const teamRoutes: MetadataRoute.Sitemap = teams.map((team) => ({
    url: `${BASE_URL}/mannschaften/${team.id}`,
    lastModified: new Date(),
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...teamRoutes];
}
