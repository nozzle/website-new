import React from 'react'
import { fetchBlogPosts } from '../../contentful'
import Link from 'next/link'
import Head from 'components/Head'
import { BlogContainer, Header, SubMenu } from 'components/Layout'
import { H1 } from 'components/Html'
import PostList from 'components/PostList'
import Pagination from 'components/Pagination'

export default function Devblog() {
  const [posts, setPosts] = React.useState([])
  const [currentPage, setCurrentPage] = React.useState(1)
  const [categories, setCategories] = React.useState([])
  const postsPerPage = 12

  React.useEffect(() => {
    const getInitialProps = async () => {
      const res = await fetchBlogPosts()
      setPosts(res.posts)
      setCategories(res.categories)
    }
    getInitialProps()
  }, [])

  if (posts.length) {
    posts.sort((a, b) =>
      (a.fields.date || a.sys.createdAt) > (b.fields.date || b.sys.createdAt)
        ? -1
        : 1
    )
  }

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <Head
        title="Blog | Nozzle"
        description="The Nozzle blog provides SEO tips, strategies, and information for ranking better in the SERPs. Don't forget to monitor your keywords with Nozzle too. :)"
      />
      <main>
        <Header>
          <H1>Blog</H1>
          {categories.length ? (
            <SubMenu>
              <ul>
                {categories.map(category => (
                  <li key={category.fields.slug}>
                    <Link
                      href="/blog/categories/[category]"
                      as={`/blog/categories/${category.fields.slug}`}
                    >
                      <a>{category.fields.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </SubMenu>
          ) : null}
        </Header>
        <BlogContainer>
          <PostList prefix="blog" posts={currentPosts} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts}
            paginate={paginate}
            currentPage={currentPage}
          />
        </BlogContainer>
      </main>
    </div>
  )
}
