import { defineComponent, h, ref } from "@vue/runtime-core"
import map from "../../assets/map.jpg"
import {game} from '../Game'
export default defineComponent({
  setup(){
    const viewHeight = 1080
    const MapY1 = ref(0)
    const MapY2 = ref(-viewHeight)
    const speed = 5
    game.ticker.add(()=>{
      MapY1.value+=speed
      MapY2.value+=speed
      if(MapY1.value>=viewHeight){
        MapY1.value=-viewHeight
      }
      if(MapY2.value>=viewHeight){
        MapY2.value=-viewHeight
      }
    })
    return {
      MapY1,
      MapY2
    }
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", { texture: map,y:ctx.MapY1 }),
      h("Sprite", { texture: map,y:ctx.MapY2 })
    ])
  }
})