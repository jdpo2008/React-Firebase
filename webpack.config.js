const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.js"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["ts", "tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test : /\.(css|scss)$/, 
        use : [ "style-loader" , "css-loader" ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    port: 9000
  }
};