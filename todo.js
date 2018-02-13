1. //TODO: Organize all the underline - text-decoration:none;
123


//those are the dependancy thats slow down under pakage.
"dev": "concurrently -k \"npm run devWebpack\" \"npm run devServer\"",
"devWebpack": "webpack --watch",
"devServer": "node ./Server/server.js"
