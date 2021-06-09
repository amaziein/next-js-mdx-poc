import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import path from 'path'
import CustomLink from '../../components/CustomLink'
import Layout from '../../components/Layout'
import {Tab, Tabs} from '../../components/Tabs'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'
import styles from './post.module.css'

const getAnchorUrl = (name) => `#${name.replace(/ /g,"_")}`

const Anchor = ({children, ...props}) => {
  const anchorUrl = getAnchorUrl(children)
  const anchorName = anchorUrl.replace('#', '')

  return <h2 {...props}><a name={anchorName} href={anchorUrl}>{children}</a></h2>
} 

const CustomWrapper = ({children}) => <div style={{background: 'red'}}>{children}</div>

const components = {
  a: CustomLink,
  TestComponent: dynamic(() => import('../../components/TestComponent')),
  h2: Anchor,
  tabs: Tabs,
  tab: Tab,
  CustomWrapper,
}

export default function PostPage({ source, frontMatter, content, headers }) {
  return (
    <Layout>
      <header>
        <nav>
          <Link href="/">
            <a>👈 Go back home</a>
          </Link>
        </nav>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.contentWrapper}>
          <h1>{frontMatter.title}</h1>
          {frontMatter.description && (
            <p className="description">{frontMatter.description}</p>
          )}
          <main>
            <MDXRemote {...source} components={components} />
          </main>
        </div>
        <nav className={styles.navMenu}>
          {headers.map(({title, url}) => <div key={url}><a href={url}>{title}</a></div>)}
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

  const headers = (content.match(/^#+ (.*$)/gim) || []).map((headerItem) => {
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
      content,
      headers,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
