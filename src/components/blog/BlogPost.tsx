import { useParams, Navigate } from 'react-router-dom'
import { getPost } from '@/content/blog'
import BlogLayout from './BlogLayout'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPost(slug) : null

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  const { Component, meta } = post

  return (
    <BlogLayout>
      <article>
        <header className="mb-12">
          <time className="text-neutral-500 font-mono text-xs tracking-widest uppercase">
            {new Date(meta.date + 'T00:00').toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-4 text-neutral-900 dark:text-white">
            {meta.title}
          </h1>
          <p className="text-lg text-neutral-500 font-light">
            {meta.description}
          </p>
          {meta.tags && (
            <div className="flex gap-2 mt-4">
              {meta.tags.map(tag => (
                <span key={tag} className="text-xs font-mono text-neutral-500 border border-neutral-200 dark:border-white/10 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div className="prose-blog">
          <Component />
        </div>
      </article>
    </BlogLayout>
  )
}
