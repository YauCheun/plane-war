// 自定义根组件
import {defineComponent,h} from "@vue/runtime-core"

export default defineComponent({
  render() {
    // 创建vnode
    const vnode = h("rect",{x:100,y:100},[
      h("circle",{x:100,y:100},"有意思")
    ])
    return vnode
  }
})