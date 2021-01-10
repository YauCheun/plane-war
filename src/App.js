// 自定义根组件
import {defineComponent,h,ref,computed} from "@vue/runtime-core"
import Home from './page/home'
import Game from './page/game'
import End from './page/end'
export default defineComponent({
  setup(){
    const currentPageName = ref("Home")
    const currentPage = computed(()=>{
      if(currentPageName.value==="Home"){
        return Home
      }else if(currentPageName.value==="Game"){
        return Game
      }else if(currentPageName.value==="End"){
        return End
      }
    })
    return {
      currentPageName,
      currentPage
    }
  },
  render(ctx) {
    // 创建vnode
    return h("Container",[h(ctx.currentPage,{
      onChangePage(page){
        ctx.currentPageName=page
      }
    })])
  }
})