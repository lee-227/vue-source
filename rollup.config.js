import server from 'rollup-plugin-serve'
import babel from 'rollup-plugin-babel'
export default {
  input: './src/index.js',
  output: {
    file: 'dist/vue.js',
    name: 'Vue',
    format: 'umd',
    sourcemap: true,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    server({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: '',
    }),
  ],
}
