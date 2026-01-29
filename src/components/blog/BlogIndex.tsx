import { motion } from 'framer-motion'
import { getAllPosts } from '@/content/blog'
import BlogCard from './BlogCard'

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-[10vw] leading-[0.8] font-bold tracking-tighter mb-4 text-neutral-200 dark:text-neutral-800 select-none"
      >
        BLOG
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-neutral-500 mb-16 font-light"
      >
        Thoughts on AI, software engineering, and more.
      </motion.p>

      <div className="space-y-8">
        {posts.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {posts.length === 0 && (
        <p className="text-neutral-500 font-light">No posts yet. Check back soon.</p>
      )}
    </div>
  )
}
