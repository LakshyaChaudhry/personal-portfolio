import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { BlogPostMeta } from '@/content/blog'

interface BlogCardProps {
  post: BlogPostMeta
  index: number
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block border-b border-neutral-200 dark:border-white/10 pb-8 hover:pl-4 transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-2">
          <time className="text-neutral-500 font-mono text-xs tracking-widest">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          {post.tags?.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-mono text-neutral-400">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors mb-2">
          {post.title}
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
          {post.description}
        </p>
      </Link>
    </motion.article>
  )
}
