import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify-es'
import resolve from 'rollup-plugin-node-resolve'

export default {
	entry: 'src/index.js',
	dest: 'rollup.bundle.js',
	format: 'cjs',
	treeshake: false,
	plugins: [
		resolve(),
		babel(),
		uglify({
			compress: {
				warnings: false,
				drop_console: true,
				collapse_vars: true,
				reduce_vars: true
			}
		})
	]
}

//import compiler from '@ampproject/rollup-plugin-closure-compiler';
//
//export default {
//	entry: 'src/index.js',
//	dest: 'rollup.bundle.js',
//	format: 'es',
//treeshake: true,
//	plugins: [
//		compiler()
//	]
//}