import React from 'react'
import { Helmet } from 'react-helmet'
import Header, { PostHeaderContent } from '../components/Header'
import Footer from '../components/Footer'
import { formatDate } from '../components/BlogPost'
import Comments from '../components/Comments'

const BlogPost = ({ data }) => {
  const post = data.contentfulBlogPost
  const site = data.site.siteMetadata
  return (
    <div>
      <Header> 
        <PostHeaderContent 
          title={post.title} 
          date={formatDate(post.date)} 
        />
      </Header> 
      <section className='foreground'>
        <Helmet>
          <title> {post.title} </title>
          <meta property='og:type' content='article' />
          <meta property='og:title' content={post.title} />
          <meta property='og:site_name' content={site.title} />
          <meta property='og:url' content={`${site.siteUrl}/${post.slug}`} />
          <meta property='og:image' content={site.avatar} />
          <meta property='article:published_time' content={post.date} />
          <meta property='article:author' content={site.siteUrl} />
        </Helmet>
        <section className='markup-area'>
          <div dangerouslySetInnerHTML={{ __html: post.content.childMarkdownRemark.html }} />
          <section className='comments'>
            <Comments 
              id={post.id}
              title={post.title}
              url={`${site.siteUrl}/${post.slug}`}
            />
          </section>
        </section>
      </section>
      <Footer social={site.social} />
    </div>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        avatar
        siteUrl
        social {
          email
          twitter
          linkedin
          github
        }
      }
    }

    contentfulBlogPost(slug: { eq: $slug }) {
      id
      title
      slug
      date
      content {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default BlogPost