import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
export default function sitemap(): MetadataRoute.Sitemap {
  const b = siteConfig.url;
  return [
    { url:b,             lastModified:new Date(), changeFrequency:"weekly",  priority:1.0 },
    { url:`${b}/menu`,   lastModified:new Date(), changeFrequency:"weekly",  priority:0.95 },
    { url:`${b}/winery`, lastModified:new Date(), changeFrequency:"monthly", priority:0.85 },
    { url:`${b}/about`,  lastModified:new Date(), changeFrequency:"monthly", priority:0.8 },
    { url:`${b}/contact`,lastModified:new Date(), changeFrequency:"yearly",  priority:0.9 },
    { url:`${b}/cookies`,lastModified:new Date(), changeFrequency:"yearly",  priority:0.3 },
  ];
}
