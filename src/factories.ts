import { Window } from './dom/Window.js'
import { DOMImplementation } from './dom/Document.js'
import * as namespaces from './utils/namespaces.js'

const { createDocument, createHTMLDocument } = DOMImplementation

const createWindow = <N extends string | null>(
  namespace: N,
  qualifiedName = '',
  doctype: Parameters<typeof createDocument>[2] = null
) => {
  const window = new Window<N>()
  const document = createDocument(namespace, qualifiedName, doctype)
  window.document = document
  document.defaultView = window
  return window
}

const createHTMLWindow = (title = '') => {
  const window = new Window<typeof namespaces.html>()
  const document = DOMImplementation.createHTMLDocument(title)
  window.document = document
  document.defaultView = window
  return window
}

const createSVGWindow = () => {
  return createWindow(namespaces.svg, 'svg')
}

const createSVGDocument = () => {
  return createDocument(namespaces.svg, 'svg')
}

export {
  createDocument,
  createHTMLDocument,
  createSVGDocument,
  createWindow,
  createHTMLWindow,
  createSVGWindow
}
