import Link from 'src/components/CustomLink'
import { PageSEO } from 'src/components/SEO'
import { SuperHero } from '../components/FrontPage/SuperHero'
import Layout from '../components/Layout'

export default function Index() {
  return (
    <Layout>
      <PageSEO title="goosebumps.fm" description="Curated Music & the occasional prose" />
      <SuperHero />
      <ul className="max-w-full mb-20">
        <li className="title">
          <Link href="curated" as="curated">
            Curated Sounds & Prose
          </Link>
        </li>
        <li className="title">
          <Link href="curated/how-to" as="curated/how-to">
            How to use this site
          </Link>
        </li>
        <li className="title">
          <Link href="labels" as="labels">
            Record Labels I like
          </Link>
        </li>
        <li className="title">
          <Link href="tweets" as="tweets">
            Bumps - micro posts
          </Link>
        </li>
        <li className="title">
          <Link href="curated/inspo" as="curated/inspo">
            Inspired By
          </Link>
        </li>
      </ul>
    </Layout>
  )
}