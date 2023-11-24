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
