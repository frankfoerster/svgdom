import { describe, it, beforeEach } from 'vitest'
// @ts-check

import assert from 'assert'
import { createSVGDocument } from '../src/index.js'
import { svg } from '../src/utils/namespaces.js'

describe('append', function () {
  /** @type {Element} */
  let svgElement

  beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
  })

  it('appends one node', function () {
    svgElement.append(svgElement.ownerDocument.createElementNS(svg, 'circle'))
    assert.strictEqual(svgElement.children.length, 2)
    assert.strictEqual(svgElement.children[1].tagName, 'circle')
  })

  it('appends multiple nodes', function () {
    svgElement.append(
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      svgElement.ownerDocument.createElementNS(svg, 'circle')
    )
    assert.strictEqual(svgElement.children.length, 3)
    assert.strictEqual(svgElement.children[1].tagName, 'circle')
    assert.strictEqual(svgElement.children[2].tagName, 'circle')
  })
})

describe('prepend', function () {
  /** @type {Element} */
  let svgElement

  beforeEach(function () {
    const svgDoc = createSVGDocument()
    svgElement = svgDoc.documentElement
    svgElement.innerHTML = '<rect width="10" height="1in"/>'
  })

  it('prepends one node', function () {
    svgElement.prepend(svgElement.ownerDocument.createElementNS(svg, 'circle'))
    assert.strictEqual(svgElement.children.length, 2)
    assert.strictEqual(svgElement.children[0].tagName, 'circle')
  })

  it('prepends multiple nodes', function () {
    svgElement.prepend(
      svgElement.ownerDocument.createElementNS(svg, 'circle'),
      svgElement.ownerDocument.createElementNS(svg, 'circle')
    )
    assert.strictEqual(svgElement.children.length, 3)
    assert.strictEqual(svgElement.children[0].tagName, 'circle')
    assert.strictEqual(svgElement.children[1].tagName, 'circle')
  })
})
