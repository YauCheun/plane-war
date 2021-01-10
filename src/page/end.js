import { defineComponent, h } from "@vue/runtime-core"
import end from "../../assets/end_page.jpg"
import restartBtn from "../../assets/restartBtn.png"
export default defineComponent({
  setup(props,ctx){
    const onClick=()=>{
      console.log('click')
      ctx.emit("changePage","Game")
    }
    return {
      onClick
    }
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: end }),
      h("Sprite", {
        texture: restartBtn,
        x: 225, 
        y: 510,
        interactive:true,
        onClick:ctx.onClick
      }),
    ])
  }
})