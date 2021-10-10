#! /usr/bin/env node
const esbuild = require("esbuild");
const child_process = require("child_process");

let child;
function startOrRestartNodeProcess() {
  child?.kill();
  child = child_process.exec("node out/server.js");
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
}

esbuild
  .build({
    external: ["better-sqlite3", "express", "http", "ws"],
    bundle: true,
    watch: {
      onRebuild: startOrRestartNodeProcess,
    },
    logLevel: "info",
    platform: "node",
    incremental: true,
    entryPoints: ["src/server/index.ts"],
    outfile: "out/server.js",
  })
  .then(startOrRestartNodeProcess);
