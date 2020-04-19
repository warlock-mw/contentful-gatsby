import React from "react";
import { graphql, Link } from 'gatsby';

import Layout from "@/components/layout";
import SEO from "@/components/seo";
import Pagination from "@/components/pagination";

const PostList = ({ data, pageContext }) => {
  return (
    <Layout>
      <SEO title="投稿一覧" />
      <main>
        <h1>記事一覧</h1>
        {data.allContentfulPost.edges.map(({ node }) => 
          <div key={node.contentful_id}>
            <p>{node.title.title}</p>
            <Link to={"/post-detail/" + node.contentful_id}>詳細を見る</Link>
          </div>
        )}
        <Pagination
          pageCount={pageContext.pageCount}
          currentPage={pageContext.currentPage}/>
      </main>
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(sort: {fields: updatedAt, order: DESC}, limit: $limit, skip: $skip) {
      edges {
        node {
          post {
            json
          }
          id
          createdAt
          title {
            title
          }
          contentful_id
        }
      }
    }
  }
`;

export default PostList;