import { createRenderer } from "@vue/runtime-core"
import {Graphics,Text} from "pixi.js"
const render = createRenderer({
  //创建一个元素
  createElement(type){
    // rect=>矩形
    let elememt
    if(type==="rect"){
      elememt = new Graphics()
      elememt.beginFill(0xff0000)
      elememt.drawRect(0,0,300,300)
      elememt.endFill()
    }else if(type==="circle"){
      elememt = new Graphics()
      elememt.beginFill(0xffff00)
      elememt.drawCircle(0,0,50)
      elememt.endFill()
    }
    return elememt
  },
  //将创建的元素插入到容器中
  insert(el,parent){
    parent.addChild(el)
  },
  patchProp(el,key,prevValue,nextValue){
    el[key]=nextValue
  },
  setElementText(node,text){
    const cText = new Text(text)
    node.addChild(cText)
  }
})
export function createApp(rootComponent){
  return render.createApp(rootComponent)
}