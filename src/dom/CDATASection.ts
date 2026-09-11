import { Text } from './Text.js'
import { Node } from './Node.js'

export class CDATASection extends Text {
  declare nodeType: number

  constructor(name: string, props: import('./Node.js').NodeProps = {}) {
    super(name, props)

    this.nodeType = Node.CDATA_SECTION_NODE
  }
}
