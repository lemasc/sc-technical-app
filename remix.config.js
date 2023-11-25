const { withEsbuildOverride } = require("remix-esbuild-override");

withEsbuildOverride((option, { isServer, isDev }) => {
  option.define = {
    ...(option.define ?? {}),
    "process.env.ELECTRON": JSON.stringify(process.env.ELECTRON ? "1" : "0"),
  };
  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // serverBuildPath: "build/index.js",
  serverModuleFormat: "cjs",
  routes: (defineRoutes) => {
    const isElectronProduction =
      process.env.NODE_ENV === "production" && process.env.ELECTRON === "1";
    return defineRoutes((route) => {
      if (!isElectronProduction) {
        route("/api/*", "../api/handler.ts");
      }
    });
  },
};
