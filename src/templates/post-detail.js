import React from "react";
import { graphql, Link } from 'gatsby';

import Layout from "@/components/layout";
import SEO from "@/components/seo";
import { contentfulArticleToReactComponents } from "@/utils/contentful/rich-text"

const PostDetail = ({ data }) => {
  return (
    <Layout>
      <SEO title="投稿詳細" />
      <main>
        <h1>記事詳細</h1>
        <p>{data.contentfulPost.title.title}</p>
        <div>
          {contentfulArticleToReactComponents(data.contentfulPost.post.json)}
        </div>
        <p>{data.contentfulPost.updatedAt}</p>
      </main>
      <Link to="/post-list/page/1">投稿一覧へ戻る</Link>
    </Layout>
  )
}

export const query = graphql`
  query($contentfulId: String!) {
    contentfulPost(contentful_id: {eq: $contentfulId}) {
      id
      contentful_id
      createdAt
      updatedAt
      title {
        title
      }
      post {
        json
      }
    }
  }
`;

export default PostDetail;