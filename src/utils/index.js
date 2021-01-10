//碰撞检测算法
/**
 * 
 * @param {*} objA 敌方
 * @param {*} objB 我方
 */
export function hitTestObject(objA,objB){
  return (
    objA.x+objA.width >= objB.x &&
    objB.x+objB.width >= objA.x &&
    objA.y+objA.height >= objB.y &&
    objB.y+objB.height >= objA.y 
  )
}