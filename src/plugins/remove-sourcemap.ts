import path from 'path';
import fs from 'fs';
import { compilation, Compiler, Stats } from 'webpack';

class RemoveSourcemapPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.done.tapPromise('RemoveSourcemapPlugin', async (stats: Stats) => {
      await this.deleteFiles(stats);
    });
  }

  getAssetPath(compilation: compilation.Compilation, name: string) {
    return path.join(compilation.getPath(compilation.compiler.outputPath, {}), name.split('?')[0]);
  }

  async deleteFiles(stats: Stats) {
    const deleteRegex = /\.map$/;
    Object.keys(stats.compilation.assets)
      .filter((name) => deleteRegex.test(name))
      .forEach((name) => {
        const filePath = this.getAssetPath(stats.compilation, name);
        if (filePath) {
          fs.unlinkSync(filePath);
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            `RemoveSourcemapPlugin: unable to delete '${name}'. ` +
              'File does not exist; it may not have been created ' +
              'due to a build error.'
          );
        }
      });
  }
}

export default RemoveSourcemapPlugin;
