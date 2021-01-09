import { defineComponent, h } from "@vue/runtime-core"
import bgcImg from "../../assets/start_page.jpg"
import startBtn from "../../assets/startBtn.png"
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
      h("Sprite", { texture: bgcImg }),
      h("Sprite", {
        texture: startBtn,
        x: 225, 
        y: 510,
        interactive:true,
        onClick:ctx.onClick
      }),
    ])
  }
})