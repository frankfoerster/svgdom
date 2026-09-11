import { CharacterData } from './CharacterData.js';
import { Node } from './Node.js';
export class Comment extends CharacterData {
  declare nodeType: number;

  constructor(name: string, props: import('./Node.js').NodeProps = {}) {
    super(name, props);
    this.nodeType = Node.COMMENT_NODE;
  }
}
