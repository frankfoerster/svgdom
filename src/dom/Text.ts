import { CharacterData } from './CharacterData.js'
import { Node } from './Node.js'

export class Text extends CharacterData {
  declare nodeType: number

  constructor(name: string, props: import('./Node.js').NodeProps = {}) {
    super(name, props)
    this.nodeType = Node.TEXT_NODE
  }
}
