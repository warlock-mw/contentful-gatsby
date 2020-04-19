import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "@/components/layout"
import Image from "@/components/image"
import SEO from "@/components/seo"
import { contentfulArticleToReactComponents } from "@/utils/contentful/rich-text"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {contentfulArticleToReactComponents(data.contentfulFixPage.body.json)}
      </div>
      <Link to="/post-list/page/1">投稿一覧へ</Link>
      <hr />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const query = graphql`
  query getTopFixPage {
    contentfulFixPage(id: { eq: "8c4dff57-722d-5863-843f-46a41ec65d69" }) {
      id
      title
      updatedAt
      body {
        json
      }
    }
  }
`

export default IndexPage
