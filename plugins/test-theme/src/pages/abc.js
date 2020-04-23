import React from "react"
import { graphql } from "gatsby"

import Test from '@test-theme/components/test'

import { contentfulArticleToReactComponents } from "@/utils/contentful/rich-text"

const AbcPage = ({ data }) => {
  
  return (
    <div>
      <Test />
      <div>
        {contentfulArticleToReactComponents(data.contentfulFixPage.body.json)}
      </div>
    </div>
  )
}

export const query = graphql`
  query {
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

export default AbcPage