import { createRenderer } from "@vue/runtime-core"
import {Graphics,Text,Sprite,Container, Texture} from "pixi.js"
const render = createRenderer({
  //创建一个元素
  createElement(type){
    // rect=>矩形
    let elememt
    switch (type) {
      case "Sprite":
        elememt = new Sprite()
        break;
      case "Container":
        elememt = new Container()
        break;
      default:
        break;
    }
    return elememt
  },
  //将创建的元素插入到容器中
  insert(el,parent){
    parent.addChild(el)
  },
  //渲染函数第二个参数接受props
  patchProp(el,key,prevValue,nextValue){
    switch (key) {
      case "texture":
        el.texture = Texture.from(nextValue)
        break;
      case "onClick":
        el.on("pointertap",nextValue)
        break;
      default:
        el[key]=nextValue
        break;
    }
  },
  //设置文本内容
  setElementText(node,text){
    const cText = new Text(text)
    node.addChild(cText)
  },
  // createText(text){
  //   return new Text(text)
  // },
  //处理注释
  createComment(){

  },
  // 获取父节点
  parentNode(){

  },
  //获取兄弟节点
  nextSibling(){

  },
  //删除节点
  remove(el){
    const parent = el.parent
    if(parent){
      parent.removeChild(el)
    }
  }
})
export function createApp(rootComponent){
  return render.createApp(rootComponent)
}