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
        "@test-theme": path.resolve(__dirname, "./src"),
      },
    },
  })
}

exports.createPages = ({ actions }) => {
  const { createPage } = actions

  return [
    createPage({
      path: '/blog-post/test',
      component: path.resolve(__dirname + `/src/templates/blog-post.js`)
    })
  ]
}