import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import Anchor from '../../components/Anchor'
import { Tab, Tabs } from '../../components/Tabs'
import Tag from '../../components/Tag'
import Code from '../../components/Code'
import InlineCode from '../../components/InlineCode'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import Img from '../../components/Img'
import { getAnchorUrl } from '../../utils/anchorUtils'
import styles from './post.module.css'

const CustomWrapper = ({ children }) => <div style={{ background: 'red' }}>{children}</div>

const components = {
  a: CustomLink,
  h2: Anchor,
  tabs: Tabs,
  tab: Tab,
  CustomWrapper,
  Tag,
  img: Img,
  code: Code,
  inlineCode: InlineCode,
}

export default function PostPage({ source, frontMatter, anchorsNavItems }) {
  return (
    <Layout>
      <header>
        <nav>
          <Link href="/">
            <a>Go back home</a>
          </Link>
        </nav>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <h1>{frontMatter.title}</h1>
          {frontMatter.description && <p className={styles.description}>{frontMatter.description}</p>}
          <main>
            <MDXRemote {...source} components={components} />
          </main>
        </div>
        <nav className={styles.navMenu}>
          {anchorsNavItems.map(({ title, url }) => (
            <div key={url}>
              <a href={url}>{title}</a>
            </div>
          ))}
        </nav>
      </div>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  const anchorsNavItems = (content.match(/^#+ (.*$)/gim) || []).map((headerItem) => {
    const title = headerItem.replace(/^#+ (.*$)/gim, '$1')
    return {
      title,
      url: getAnchorUrl(title),
    }
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      anchorsNavItems,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths.map((path) => path.replace(/\.mdx?$/, '')).map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
