const stage = {
  width: 750,
  height: 1080
}
export const moveEnemyPlane = (enemyPlanes) => {
  enemyPlanes.forEach((enemyPlane, index) => {
    if (!enemyPlane.moveInfo) {
      enemyPlane.moveInfo = {}
      enemyPlane.moveInfo.dir = 1
      enemyPlane.moveInfo.count = 0
    }

    enemyPlane.y++
    enemyPlane.x += 1 * enemyPlane.moveInfo.dir
    enemyPlane.moveInfo.count++

    if (enemyPlane.moveInfo.count > 120) {
      const factor = Math.random() > 0.5 ? 1 : -1
      enemyPlane.moveInfo.dir = enemyPlane.moveInfo.dir * factor
      enemyPlane.moveInfo.count = 0
    }

    // 检测到边界了
    if (isArrivedRightBorder(enemyPlane)) {
      enemyPlane.x = stage.width - enemyPlane.width
    }

    if (isArrivedLeftBorder(enemyPlane)) {
      enemyPlane.x = 0
    }
  })
}

function isArrivedRightBorder (enemyPlane) {
  return enemyPlane.x + enemyPlane.width >= stage.width
}

function isArrivedLeftBorder (enemyPlane) {
  return enemyPlane.x <= 0
}