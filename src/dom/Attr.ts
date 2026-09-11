import { Node } from './Node.js'
export class Attr extends Node {
  declare nodeType: number
  declare ownerElement: import('./Element.js').Element | null
  declare _nodeValue: string

  constructor(
    name: string,
    props: import('./Node.js').NodeProps = {},
    ns: string | null = null
  ) {
    super(name, { nodeValue: '', ...props }, ns)

    // createAttribute() performs HTML lowercasing before construction;
    // createAttributeNS() must preserve the supplied qualified name.
    this.nodeName = name
    this.nodeType = Node.ATTRIBUTE_NODE
    this.ownerElement = null
  }

  get nodeValue(): string {
    return this._nodeValue
  }

  set nodeValue(val: unknown) {
    this._nodeValue = String(val)
  }

  get value(): string {
    return this.nodeValue
  }

  set value(val: unknown) {
    this.nodeValue = val
  }

  get name() {
    return this.nodeName
  }
}
