// 自定义根组件
import {defineComponent,h} from "@vue/runtime-core"
import Home from './page/home'
import Game from './page/home'
export default defineComponent({
  render() {
    // 创建vnode
    return h("Container",[h(Home),{
      onChangePage(page){
        console.log(page)
      }
    }])
  }
})