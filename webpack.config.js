const path = require("path"),
    Dotenv = require("dotenv-webpack");

module.exports = {
    mode: "development",
    entry: "./src/display.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    plugins: [new Dotenv()],
    watch: true,
};
