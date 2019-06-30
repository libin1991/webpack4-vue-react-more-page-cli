import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import compiler from '@ampproject/rollup-plugin-closure-compiler';
//export default {
//entry: 'src/main.js',
//dest: 'rollup.bundle.js',
//format: 'cjs',
//treeshake: true,
//plugins: [
//  babel(),
//  uglify()
//]
//}



export default {
  input: 'main.js',
  output: {
    file: 'closure-compiler-bundle.js',
    format: 'iife',
  },
  plugins: [
    compiler(),
  ],
}