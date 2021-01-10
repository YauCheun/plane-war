import { defineComponent, h, ref,toRefs,onMounted,onUnmounted } from "@vue/runtime-core"
import enemy from "../../assets/enemy.png"
import {game} from '../Game'
export default defineComponent({
  props:["x","y"],
  setup(props,ctx){
    const {x,y} = toRefs(props)
    useAttack(ctx, x, y)
    return {
      x,y
    }
  },
  render(ctx) {
    return h("Container",{x:ctx.x,y:ctx.y}, [
      h("Sprite", { texture: enemy})
    ])
  }
})
const useAttack = (ctx, x, y) => {
  // 发射子弹
  const attackInterval = 1000
  let intervalId
  onMounted(() => {
    intervalId = setInterval(() => {
      ctx.emit('attack', {
        x: x.value + 105,
        y: y.value + 200
      })
    },attackInterval)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })
}