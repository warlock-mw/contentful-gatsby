const path = require("path")

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  })
}

const allContentfulPostQuery = `{
  allContentfulPost(sort: {fields: updatedAt, order: DESC}) {
    edges {
      node {
        contentful_id
      }
    }
  }
}`

const createDetailPages = ({ allContentfulPost }, createPage) => {
  return allContentfulPost.edges.map(({ node }) =>
    createPage({
      path: `/post-detail/${node.contentful_id}`,
      component: path.resolve("./src/templates/post-detail.js"),
      context: { contentfulId: node.contentful_id },
    })
  )
}

const pageSize = 1

const createPaginationPages = ({ allContentfulPost }, createPage) => {
  const pageCount = Math.ceil(allContentfulPost.edges.length / pageSize)

  return Array.from({ length: pageCount }).map((_, index) => {
    createPage({
      path: `/post-list/page/${index + 1}`,
      component: path.resolve(`./src/templates/post-list.js`),
      context: {
        skip: index * pageSize,
        limit: pageSize,
        pageCount,
        currentPage: index + 1,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(allContentfulPostQuery).then(({ errors, data }) => {
    if (errors) {
      return Promise.reject(errors)
    }

    return [
      ...createDetailPages(data, createPage),
      ...createPaginationPages(data, createPage),
    ]
  })
}
