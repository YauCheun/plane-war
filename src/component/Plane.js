import { defineComponent, h, ref,toRefs } from "@vue/runtime-core"
import plane from "../../assets/plane.png"
import {game} from '../Game'
export default defineComponent({
  props:["x","y"],
  setup(props,ctx){
    const {x,y} = toRefs(props)
    return {
      x,y
    }
  },
  render(ctx) {
    return h("Container",{x:ctx.x,y:ctx.y}, [
      h("Sprite", { texture: plane})
    ])
  }
})