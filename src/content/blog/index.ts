import type { ComponentType } from 'react'
import * as helloWorld from './hello-world.mdx'
import * as signalAiCoach from './signal-ai-coach.mdx'
import * as synthbench from './synthbench.mdx'
import * as distill from './distill.mdx'
import * as beyondLieDetection from './beyond-lie-detection.mdx'
import * as ciscoAiDefense from './cisco-ai-defense.mdx'
import * as rlOrData from './rl-or-data.mdx'

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

function blogPost(mod: BlogPostModule): BlogPostModule {
  return { default: mod.default, frontmatter: mod.frontmatter }
}

const postModules = {
  'hello-world': blogPost(helloWorld),
  'signal-ai-coach': blogPost(signalAiCoach),
  synthbench: blogPost(synthbench),
  distill: blogPost(distill),
  'beyond-lie-detection': blogPost(beyondLieDetection),
  'cisco-ai-defense': blogPost(ciscoAiDefense),
  'rl-or-data': blogPost(rlOrData),
}

export type BlogSlug = keyof typeof postModules

function isBlogSlug(slug: string): slug is BlogSlug {
  return Object.prototype.hasOwnProperty.call(postModules, slug)
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
  if (!isBlogSlug(slug)) return null
  const mod = postModules[slug]
  if (mod.frontmatter.published === false) return null
  return {
    Component: mod.default,
    meta: { slug, ...mod.frontmatter },
  }
}
