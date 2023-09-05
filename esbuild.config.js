/**
 * esbuild config
 * @type
 */
const esbuild = require('esbuild');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
    entryPoints: [{in: 'src/index.ts', out: 'index'}, {in: 'src/decorator/index.ts', out: 'decorator/index'}],
    bundle: true,
    platform: 'node',
    outdir: 'lib',
    target: 'es2016',
    sourcemap: true,
    minify: true,
    logLevel: 'info',
    metafile: true,
    format: 'cjs',
    plugins: [nodeExternalsPlugin()],
});