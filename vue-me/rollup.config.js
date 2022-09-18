import babel from 'rollup-plugin-babel'
// rollup默认可以导出一个对象作为打包的配置文件
export default {
  input: './src/index.js', //入口
  output: {
    file:'./dist/vue.js', // 出口
    name:'Vue',
    format:'umd',
    sourcemap:true,
  },
  plugins:[
    babel({
      exclude:'node_modules/**' //排除node_modules下的所有文件
    })
  ]

}