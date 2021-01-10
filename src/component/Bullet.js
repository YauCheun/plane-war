import { defineComponent, h, ref,toRefs } from "@vue/runtime-core"
import bullet from "../../assets/bullet.png"
import bunnyImg from '../../assets/bunny.png'
import {game} from '../Game'
export default defineComponent({
  props:["x","y","dir"],
  setup(props,ctx){
    const {x,y,dir} = toRefs(props)
    return {
      x,y,dir
    }
  },
  render(ctx) {
    return h("Container",{x:ctx.x,y:ctx.y}, [
      h("Sprite", { texture:ctx.dir === 1 ? bunnyImg : bullet})
    ])
  }
})