// import resolve from 'rollup-plugin-node-resolve';
import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-storefront.js',
        format: 'cjs'
    },
    plugins: [ 
        // resolve(),
        vue()
     ]
}
