import { PostCard } from 'src/components/PostCard'
import { PageSEO } from 'src/components/SEO'
import { compareDesc } from 'date-fns'
import { allPosts, type Post, allMixes, type Mix } from '@/contentlayer/generated'

export default function Index() {
  const posts: Post[] = allPosts
    .sort((a, b) => compareDesc(new Date(a.lastmod || a.date), new Date(b.lastmod || b.date)))
    .filter((post) => post.title !== 'Template post')
  const draftsFilteredOut = posts.filter((post) => post?.draft !== true)

  const mixes: Mix[] = allMixes.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return (
    <>
      <PageSEO title="Curated music - Posts" description="Curated Music & the occasional prose" />
      {/* Add Link to a page with Spotify now playing. move the now playing app here? */}

      <section>
        <h3 className="title">Mixes</h3>
        <div className="grid grid-cols-2 gap-12 mx-4 lg:mx-auto max-w-7xl lg:gap-24 md:grid-cols-2">
          {mixes.map((mix: Mix) => (
            <PostCard
              slug={mix.url}
              title={mix.title}
              description={mix.description}
              date={mix.date}
              key={mix._id}
              thumbnailUrl={mix.thumbnailUrl ? mix.thumbnailUrl : ''}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className="title">Playlists & words</h3>
        <div className="grid grid-cols-2 gap-12 mx-4 lg:mx-auto max-w-7xl lg:gap-24 md:grid-cols-2">
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
        </div>
      </section>
    </>
  )
}
