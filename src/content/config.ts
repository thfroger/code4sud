import { defineCollection, z } from 'astro:content';

const schools = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    city: z.union([
      z.enum(['marseille', 'nice']),
      z.array(z.enum(['marseille', 'nice']))
    ]).transform(v => Array.isArray(v) ? v : [v]),
    site: z.string(),
    description: z.string(),
  }),
});

const events = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    type: z.enum(['hackathon', 'jobdating', 'talent-day', 'atelier']),
    description: z.string(),
    location: z.string(),
    status: z.enum(['passe', 'a-venir']),
    image: z.string().optional(),
  }),
});

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    image: z.string().optional(),
  }),
});

const partners = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    logo: z.string().optional(),
    link: z.string().optional(),
    active: z.boolean(),
  }),
});

const realisations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.enum(['hackathon', 'application', 'evenement', 'formation']),
    date: z.coerce.date(),
    description: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { schools, events, articles, partners, realisations };
