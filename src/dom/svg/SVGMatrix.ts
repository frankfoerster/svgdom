export interface MatrixLike {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
}

const radians = function (d: number) {
  return ((d % 360) * Math.PI) / 180
}

export function matrixFactory(
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
) {
  var r = new SVGMatrix()
  r.a = a
  r.b = b
  r.c = c
  r.d = d
  r.e = e
  r.f = f
  return r
}

export class SVGMatrix {
  declare a: number
  declare d: number
  declare b: number
  declare c: number
  declare e: number
  declare f: number

  constructor() {
    this.a = this.d = 1
    this.b = this.c = this.e = this.f = 0
  }

  inverse() {
    // Get the current parameters out of the matrix
    var a = this.a
    var b = this.b
    var c = this.c
    var d = this.d
    var e = this.e
    var f = this.f

    // Invert the 2x2 matrix in the top left
    var det = a * d - b * c
    if (!det) throw new Error('Cannot invert ' + this)

    // Calculate the top 2x2 matrix
    var na = d / det
    var nb = -b / det
    var nc = -c / det
    var nd = a / det

    // Apply the inverted matrix to the top right
    var ne = -(na * e + nc * f)
    var nf = -(nb * e + nd * f)

    // Construct the inverted matrix
    this.a = na
    this.b = nb
    this.c = nc
    this.d = nd
    this.e = ne
    this.f = nf

    return this
  }

  multiply(m: MatrixLike) {
    var r = new SVGMatrix()
    r.a = this.a * m.a + this.c * m.b
    r.b = this.b * m.a + this.d * m.b
    r.c = this.a * m.c + this.c * m.d
    r.d = this.b * m.c + this.d * m.d
    r.e = this.a * m.e + this.c * m.f + this.e
    r.f = this.b * m.e + this.d * m.f + this.f
    return r
  }

  rotate(r: number, x = 0, y = 0) {
    r = ((r % 360) * Math.PI) / 180
    const cos = Math.cos(r)
    const sin = Math.sin(r)
    // The translation terms combine T(x, y) * R(angle) * T(-x, -y), keeping
    // the requested center fixed while the surrounding matrix is preserved.
    return this.multiply(
      matrixFactory(
        cos,
        sin,
        -sin,
        cos,
        -cos * x + sin * y + x,
        -sin * x - cos * y + y
      )
    )
  }

  scale(scaleX: number, scaleY = scaleX) {
    return this.multiply(matrixFactory(scaleX, 0, 0, scaleY, 0, 0))
  }

  skew(x: number, y: number) {
    return this.multiply(
      matrixFactory(1, Math.tan(radians(y)), Math.tan(radians(x)), 1, 0, 0)
    )
  }

  skewX(x: number) {
    return this.skew(x, 0)
  }

  skewY(y: number) {
    return this.skew(0, y)
  }

  toString() {
    return 'SVGMatrix'
  }

  translate(x = 0, y = 0) {
    return this.multiply(matrixFactory(1, 0, 0, 1, x, y))
  }
}
