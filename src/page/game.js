import { defineComponent, h, reactive,onMounted,onUnmounted } from "@vue/runtime-core"
import Map from "../component/Map"
import Plane from "../component/Plane"
import EnemyPlanes from "../component/EnemyPlanes"
import Bullet from '../component/Bullet'
import {game} from '../Game'
import { moveBullets } from '../component/moveBullets'
import { moveEnemyPlane } from '../component/moveEnemyPlane'
import {hitTestObject} from '../utils/index'
import { useKeyboardMove } from '../use/index'
export default defineComponent({
  setup(props,{emit}) {
    //我方飞机
    const { planeinfo } = useCreatePlane()
    //敌方飞机
    const { enemyPlanes } = useCreateEnemyPlanes()
    //子弹
    const { bullets,addBullet } = useCreateBullets()
    const onAttack =(info)=>{
      //添加子弹
      addBullet({...info,width:61,height:99})
    }
    //敌军子弹
    const { enemyPlaneBullets, createEnemyPlaneBullet } = useEnemyPlaneBullets()
    useFighting(enemyPlanes,bullets,planeinfo,enemyPlaneBullets,emit)
    return {
      planeinfo,
      enemyPlanes,
      bullets,
      onAttack,
      enemyPlaneBullets,
      createEnemyPlaneBullet
    }
  },
  render(ctx) {
    const createEnemyPlanes = ()=>{
      return ctx.enemyPlanes.map(info=>{
        return h(EnemyPlanes,{
          x:info.x,
          y:info.y,  
          onAttack({ x, y }) {
            ctx.createEnemyPlaneBullet({x, y,width:61,height:99})
          }
        })
      })
    }
    const createBullets = ()=>{
      return ctx.bullets.map(info=>{
        return h(Bullet,{x:info.x,y:info.y,dir:-1})
      })
    }
    const enemyBullets = ()=>{
      return ctx.enemyPlaneBullets.map(info=>{
        return h(Bullet,{x:info.x,y:info.y,dir:1})
      })
    }
    return h("Container", [
      h(Map),
      h(Plane, {
        x: ctx.planeinfo.x,
        y: ctx.planeinfo.y,
        onAttack: ctx.onAttack
      }),
      ...createBullets(),
      ...enemyBullets(),
      ...createEnemyPlanes()
    ])
  }
});
//创建子弹
function useCreateBullets(){
  const bullets = reactive([])
  const addBullet = (info)=>{
    bullets.push({
      x:info.x,
      y:info.y,
      width:info.width,
      height:info.height,
      dir:-1
    })
  }
  return { bullets,addBullet }
}
//创建敌方飞机
function useCreateEnemyPlanes(){
  const enemyPlanes = reactive([])
  setInterval(() => {
    const x = Math.floor(Math.random() * (1 + 750))
    enemyPlanes.push({
      x:50,
      y:50,
      width:308,
      height:207
    })
  }, 600)
  return { enemyPlanes }
}
// 敌军战机子弹
const useEnemyPlaneBullets = () => {
  // 创建敌军子弹
  const enemyPlaneBullets = reactive([])
  const createEnemyPlaneBullet = (info)=>{
    enemyPlaneBullets.push({
      x:info.x,
      y:info.y,
      width:info.width,
      height:info.height,
      dir:1
    })
  }
  return {
    enemyPlaneBullets,
    createEnemyPlaneBullet
  }
}
//创建我方飞机
function useCreatePlane() {
  const planeinfo = reactive({ x: 150, y: 450,width:258,height:364,speed:7})
  //控制飞机的移动
  const { moveX,moveY } = useKeyboardMove({
    x: planeinfo.x,
    y: planeinfo.y,
    speed: planeinfo.speed
  })
  planeinfo.x=moveX
  planeinfo.y=moveY
  console.log(moveX)
  return { planeinfo }

}
function useFighting(enemyPlanes,bullets,planeinfo,enemyPlaneBullets,emit){
  const handleTicker=()=>{
    moveBullets(bullets)
    moveBullets(enemyPlaneBullets)
    moveEnemyPlane(enemyPlanes)
    //碰撞检测 我方飞机和敌方飞机
    enemyPlanes.forEach(item=>{
      if(hitTestObject(item,planeinfo)){
        //游戏结束
        emit("changePage","End")
      }
    })
    // 碰撞检测，我方子弹和敌方飞机
    bullets.forEach((bulletinfo,bulletIndex)=>{
      enemyPlanes.forEach((enemyinfo,enemyIndex)=>{
        if(hitTestObject(bulletinfo,enemyinfo)){
          //我方子弹和敌方飞机消失
          bullets.splice(bulletIndex,1)
          enemyPlanes.splice(enemyIndex,1)
        }
      })
       // 检测是否碰到了敌方子弹
      enemyPlaneBullets.forEach((enemyBullet, enemyBulletIndex) => {
        const isIntersect = hitTestObject(bulletinfo, enemyBullet)
        if (isIntersect) {
          bullets.splice(bulletIndex, 1)
          enemyPlaneBullets.splice(enemyBulletIndex, 1)
        }
      })
    })
    const hitSelfHandle = (enemyObject) => {
      const isIntersect = hitTestObject(planeinfo, enemyObject)
      if (isIntersect) {
        emit("changePage","End")
      }
    }
    // 遍历敌军子弹
    enemyPlaneBullets.forEach(enemyBullet => {
      hitSelfHandle(enemyBullet)
    })

    // 遍历敌军
    enemyPlanes.forEach(enemyPlane => {
      hitSelfHandle(enemyPlane)
    })
  }
  onMounted(() => {
    game.ticker.add(handleTicker)
  }) 
  onUnmounted(() => {
    game.ticker.remove(handleTicker)
  })
}