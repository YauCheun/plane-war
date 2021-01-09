import { createApp } from "./src/runtime-canvas"
import App from './src/App'
import {getRootContanier} from './src/Game'
// console.log(PIXI)
//App=>根組件
// 根容器 =>通过创建一个canvas

//整体流程是通过createRenderer API 自定义一个渲染函数，然后通过这个自定义渲染函数在dom中渲染出自己想要的元素
//在这里自定义渲染函数，由于是挂载在一个canvas的根容器上，可以通过pixi.js脚本自定义绘制图形在根容器上

createApp(App).mount(getRootContanier())