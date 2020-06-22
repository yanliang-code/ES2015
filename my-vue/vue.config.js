module.exports = {
  devServer: {
    proxy: {
      '/user': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '/user': 'user.json',
        },
      },
      '/list': {
        target: 'http://localhost:8080',
        pathRewrite: {
          '/list': 'list.json',
        },
      },
    },
  },
};
