export const NonDocumentTypeChildNode = {} as {
  readonly previousElementSibling: import('../Element.js').Element | null
  readonly nextElementSibling: import('../Element.js').Element | null
}

Object.defineProperties(NonDocumentTypeChildNode, {
  previousElementSibling: {
    get() {
      let node = this
      while ((node = node.previousSibling)) {
        if (node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  },

  nextElementSibling: {
    get() {
      let node = this
      while ((node = node.nextSibling)) {
        if (node.nodeType === node.ELEMENT_NODE) {
          return node
        }
      }
      return null
    }
  }
})
