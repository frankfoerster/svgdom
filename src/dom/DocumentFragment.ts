import { Node } from './Node.js';
import { mixin } from '../utils/objectCreationUtils.js';
import { elementAccess } from './mixins/elementAccess.js';
import { ParentNode } from './mixins/ParentNode.js';
import { NonElementParentNode } from './mixins/NonElementParentNode.js';
export class DocumentFragment extends Node {
  declare nodeType: number;

  constructor(name: string, props: import('./Node.js').NodeProps = {}) {
    super(name, props);
    this.nodeType = Node.DOCUMENT_FRAGMENT_NODE;
  }
}

mixin(elementAccess, DocumentFragment);
mixin(ParentNode, DocumentFragment);
mixin(NonElementParentNode, DocumentFragment);

type elementAccessInterface = typeof elementAccess;
type ParentNodeInterface = typeof ParentNode;
type NonElementParentNodeInterface = typeof NonElementParentNode;
export interface DocumentFragment
  extends
    elementAccessInterface,
    ParentNodeInterface,
    NonElementParentNodeInterface {}
