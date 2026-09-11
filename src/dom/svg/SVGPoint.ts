import type { MatrixLike } from './SVGMatrix.js'
export class SVGPoint {
  declare x: number
  declare y: number

  constructor() {
    this.x = 0
    this.y = 0
  }

  matrixTransform(m: MatrixLike) {
    var r = new SVGPoint()
    r.x = m.a * this.x + m.c * this.y + m.e * 1
    r.y = m.b * this.x + m.d * this.y + m.f * 1
    return r
  }
}
