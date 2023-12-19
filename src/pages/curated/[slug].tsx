import { allPosts, type Post } from '@/contentlayer/generated'
import { LongPost } from '@/components/Layouts/LongPost'

export const getStaticPaths = () => {
  const paths: string[] = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = ({ params }) => {
  const post: Post = allPosts.find(
    (singlePost) => singlePost._raw.flattenedPath === `curated/${params.slug}`
  )

  return {
    props: {
      post,
    },
  }
}

export default function PostPage({ post }: { post: Post }) {
  return (
    <LongPost
      content={post.body.code}
      title={post.title}
      date={post.date}
      thumbnailUrl={post.thumbnailUrl}
      description={post.description}
      canonicalUrl={post.canonicalUrl}
    />
  )
}
