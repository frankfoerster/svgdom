import { extendStatic } from '../utils/objectCreationUtils.js'

export class NodeFilter {
  declare static FILTER_ACCEPT: 1
  declare static FILTER_REJECT: 2
  declare static FILTER_IGNORE: 4
  declare static SHOW_ALL: -1
  declare static SHOW_ELEMENT: 1
  declare static SHOW_TEXT: 4
  declare static SHOW_ENTITY_REFERENCE: 16
  declare static SHOW_ENTITY: 32
  declare static SHOW_PROCESSING_INSTRUCTION: 64
  declare static SHOW_COMMENT: 128
  declare static SHOW_DOCUMENT: 256
  declare static SHOW_DOCUMENT_TYPE: 512
  declare static SHOW_DOCUMENT_FRAGMENT: 1024
  declare static SHOW_NOTATION: 2048

  acceptNode() {
    return NodeFilter.FILTER_ACCEPT
  }
}

extendStatic(NodeFilter, {
  FILTER_ACCEPT: 1,
  FILTER_REJECT: 2,
  FILTER_IGNORE: 4,
  SHOW_ALL: -1,
  SHOW_ELEMENT: 1,
  SHOW_TEXT: 4,
  SHOW_ENTITY_REFERENCE: 16,
  SHOW_ENTITY: 32,
  SHOW_PROCESSING_INSTRUCTION: 64,
  SHOW_COMMENT: 128,
  SHOW_DOCUMENT: 256,
  SHOW_DOCUMENT_TYPE: 512,
  SHOW_DOCUMENT_FRAGMENT: 1024,
  SHOW_NOTATION: 2048
})
