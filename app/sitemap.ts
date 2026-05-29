import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://studypassplus.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://studypassplus.com/quiz',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://studypassplus.com/quiz?cert=netplus',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://studypassplus.com/quiz?cert=aplus',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://studypassplus.com/daily',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://studypassplus.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://studypassplus.com/blog/free-security-plus-sy0-701-practice-questions',
      lastModified: new Date('2026-05-19'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://studypassplus.com/blog/free-network-plus-n10-009-practice-questions',
      lastModified: new Date('2026-05-27'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://studypassplus.com/blog/how-long-to-study-for-security-plus-sy0-701',
      lastModified: new Date('2026-05-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://studypassplus.com/blog/security-plus-vs-network-plus-which-first',
      lastModified: new Date('2026-05-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://studypassplus.com/blog/hardest-domains-on-security-plus-sy0-701',
      lastModified: new Date('2026-05-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://studypassplus.com/blog/how-long-to-study-for-network-plus-n10-009',
      lastModified: new Date('2026-05-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://studypassplus.com/blog/comptia-security-plus-passing-score',
      lastModified: new Date('2026-05-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
