import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { ChildNode } from './mixins/ChildNode.js'

export class DocumentType extends Node {
  declare nodeType: number
  declare name: string
  declare publicId: string
  declare systemId: string
  declare internalSubset: string | null

  constructor(
    name,
    props: import('./Node.js').NodeProps & {
      publicId?: string
      systemId?: string
      internalSubset?: string
    } = {}
  ) {
    super(name, props)

    this.nodeType = Node.DOCUMENT_TYPE_NODE
    this.name = name

    const { publicId, systemId } = props
    this.publicId = String(publicId ?? '')
    this.systemId = String(systemId ?? '')
    this.internalSubset = props.internalSubset ?? null
  }
}

mixin(ChildNode, DocumentType)

type ChildNodeInterface = typeof ChildNode
export interface DocumentType extends ChildNodeInterface {}
