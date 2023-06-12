import { PostCard } from 'src/components/PostCard'
import { PageSEO } from 'src/components/SEO'
import { compareDesc } from 'date-fns'
import { allPosts, type Post } from '@/contentlayer/generated'
import Layout from '../components/Layout'

export default function Index() {
  const posts: Post[] = allPosts
    .sort((a, b) => compareDesc(new Date(a.lastmod || a.date), new Date(b.lastmod || b.date)))
    .filter((post) => post.title !== 'Template post')
  const draftsFilteredOut = posts.filter((post) => post?.draft !== true)

  return (
    <>
      <PageSEO title="Curated music - Posts" description="Curated Music & the occasional prose" />
      {/* Add Link to a page with Spotify now playing. move the now playing app here? */}
      {/* Add mix cards here too */}

      <h3 className="title">Prose, Sounds, Research</h3>
      <section className="grid grid-cols-2 gap-12 mx-4 lg:mx-auto max-w-7xl lg:gap-24 md:grid-cols-2">
        {draftsFilteredOut.map((post: Post) => (
          <PostCard
            slug={post.url}
            title={post.title}
            description={post.description}
            date={post.date}
            key={post._id}
            thumbnailUrl={post.thumbnailUrl ? post.thumbnailUrl : ''}
          />
        ))}
      </section>
    </>
  )
}
