import type { ComponentType } from 'react'
import * as helloWorld from './hello-world.mdx'
import * as signalAiCoach from './signal-ai-coach.mdx'

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags?: string[]
  published?: boolean
}

interface BlogPostModule {
  default: ComponentType
  frontmatter: Omit<BlogPostMeta, 'slug'>
}

const postModules: Record<string, BlogPostModule> = {
  'hello-world': helloWorld as unknown as BlogPostModule,
  'signal-ai-coach': signalAiCoach as unknown as BlogPostModule,
}

export function getAllPosts(): BlogPostMeta[] {
  return Object.entries(postModules)
    .map(([slug, mod]) => ({
      slug,
      ...mod.frontmatter,
    }))
    .filter(post => post.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPost(slug: string): { Component: ComponentType; meta: BlogPostMeta } | null {
  const mod = postModules[slug]
  if (!mod || mod.frontmatter.published === false) return null
  return {
    Component: mod.default,
    meta: { slug, ...mod.frontmatter },
  }
}
