import { defineComponent, h, reactive,onMounted,onUnmounted } from "@vue/runtime-core"
import Map from "../component/Map"
import Plane from "../component/Plane"
import EnemyPlanes from "../component/EnemyPlanes"
import {game} from '../Game'
import {hitTestObject} from '../utils/index'
export default defineComponent({
  setup(props,ctx) {
    //我方飞机
    const { planeinfo } = useCreatePlane()
    //敌方飞机
    const { enemyPlanes } = useCreateEnemyPlanes()
    const handleTicker=()=>{
      //敌方飞机移动
      enemyPlanes.forEach(item=>{
        item.y++
      })
      //碰撞检测
      enemyPlanes.forEach(item=>{
        if(hitTestObject(item,planeinfo)){
          //游戏结束
          ctx.emit("changePage","End")
        }
      })
    }
    onMounted(() => {
      game.ticker.add(handleTicker)
    }) 
    onUnmounted(() => {
      game.ticker.remove(handleTicker)
    })
    return {
      planeinfo,
      enemyPlanes
    }
  },
  render(ctx) {
    const createEnemyPlanes = ()=>{
      return ctx.enemyPlanes.map(info=>{
        return h(EnemyPlanes,{x:info.x,y:info.y})
      })
    }
    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeinfo.x,
        y: ctx.planeinfo.y
      }),
      ...createEnemyPlanes()
    ])
  }
});
//创建敌方飞机
function useCreateEnemyPlanes(){
  const enemyPlanes = reactive([
    {
      x:50,
      y:50,
      width:308,
      height:207
    }
  ])
  return { enemyPlanes }
}
//创建我方飞机
function useCreatePlane() {
  const planeinfo = reactive({ x: 150, y: 450,width:258,height:364 })
  //控制飞机的移动
  const speed = 15
  window.addEventListener("keydown", (e) => {
    switch (e.code) {
      case "ArrowUp":
        planeinfo.y -= speed
        break;
      case "ArrowDown":
        planeinfo.y += speed
        break;
      case "ArrowLeft":
        planeinfo.x -= speed
        break;
      case "ArrowRight":
        planeinfo.x += speed
        break;
      default:
        break;
    }
  })
  return { planeinfo }
}
