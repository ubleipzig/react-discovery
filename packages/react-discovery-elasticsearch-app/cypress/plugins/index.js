const browserify = require('@cypress/browserify-preprocessor')

module.exports = (on) => {
  const options = {
    browserifyOptions: {
      extensions: ['.js', '.ts'],
      plugin: [
        ['tsify'],
      ],
    },
  }
  on('task', require('@cypress/code-coverage/task'))
  on('file:preprocessor', browserify(options))
}
