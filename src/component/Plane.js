import { defineComponent, h, ref,toRefs, onMounted, onUnmounted } from "@vue/runtime-core"
import plane from "../../assets/plane.png"
import { useKeyboard } from '../use'
import {game} from '../Game'
export default defineComponent({
  props:["x","y"],
  setup(props,ctx){
    const {x,y} = toRefs(props)
    useAttackHandler(ctx, x, y)
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
function useAttackHandler(ctx, x, y) {
  let isAttack = false
  const ATTACK_INTERVAL = 10
  let startTime = 0
  const handleTicker = () => {
    if (isAttack) {
      startTime++
      if(startTime > ATTACK_INTERVAL) {
        emitAttack()
        startTime = 0
      }
    }
  }

  onMounted(() => {
    game.ticker.add(handleTicker)
  })

  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })

  const emitAttack = () => {
    ctx.emit('attack', {
      x: x.value + 110,
      y: y.value + 0
    })
  }

  const startAttack = () => {
    isAttack = true
    startTime = 100
  }

  const stopAttack = () => {
    isAttack = false
  }

  useKeyboard({
    Space: {
      keydown: startAttack,
      keyup: stopAttack
    }
  })
}