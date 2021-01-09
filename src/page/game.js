import { defineComponent, h } from "@vue/runtime-core"
import map from "../../assets/map.jpg"
export default defineComponent({
  render() {
    return h("Container", [
      h("Sprite", { texture: map })
    ])
  }
})