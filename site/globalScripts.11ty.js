import * as Parcel from "@parcel/core";
import { MemoryFS } from "@parcel/fs";
import { writeFileSync } from "fs";

let workerFarm = Parcel.createWorkerFarm();
let outputFS = new MemoryFS(workerFarm);

class GlobalScripts {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      tag: [],
      permalink: () => {
        return `clientScripts.js`;
      },
      layout: null,
    };
  }

  async render(data) {
    let content = "";
    let bundler = new Parcel.default({
      entries: ["client/clientScripts.js"],
      defaultConfig: "@parcel/config-default",
      mode:
        process.env.NODE_ENV === "production" ? "production" : "development",
      defaultTargetOptions: {
        engines: {
          browsers: ["last 1 Chrome version"],
        },
      },
      workerFarm,
      outputFS,
    });
    try {
      let out = await bundler.run();
      const bundles = out.bundleGraph.getBundles();
      for (const bundle of bundles) {
        const out = await outputFS.readFile(bundle.filePath, "utf8");
        content += out;
        const map = await outputFS.readFile(bundle.filePath + ".map", "utf8");
        writeFileSync(data.page.outputPath + ".map", map);
      }
    } catch (err) {
      console.log(err);
    } finally {
      await workerFarm.end();
      return content;
    }
  }
}

module.exports = GlobalScripts;
