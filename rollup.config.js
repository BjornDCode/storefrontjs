import vue from 'rollup-plugin-vue';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-storefront.js',
        format: 'cjs'
    },
    plugins: [ vue() ]
}
