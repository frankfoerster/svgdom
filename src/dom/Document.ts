import type { Element } from './Element.js';
import { Node } from './Node.js';
import { Comment } from './Comment.js';
import { Text } from './Text.js';
import { CDATASection } from './CDATASection.js';
import { Attr } from './Attr.js';
import { DocumentFragment } from './DocumentFragment.js';
import { HTMLLinkElement } from './html/HTMLLinkElement.js';
import { HTMLScriptElement } from './html/HTMLScriptElement.js';
import { HTMLImageElement } from './html/HTMLImageElement.js';
import { HTMLElement } from './html/HTMLElement.js';
import { elementAccess } from './mixins/elementAccess.js';
import { mixin } from '../utils/objectCreationUtils.js';
import { SVGSVGElement } from './svg/SVGSVGElement.js';
import { SVGPathElement } from './svg/SVGPathElement.js';
import { SVGTextContentElement } from './svg/SVGTextContentElement.js';
import { SVGGraphicsElement } from './svg/SVGGraphicsElement.js';
import { ParentNode } from './mixins/ParentNode.js';
import {
  svg,
  html,
  normalizeNamespace,
  validateAndExtract,
  validateName
} from '../utils/namespaces.js';
import { DocumentType } from './DocumentType.js';
import { NonElementParentNode } from './mixins/NonElementParentNode.js';
import { SVGRectElement } from './svg/SVGRectElement.js';
import { SVGCircleElement } from './svg/SVGCircleElement.js';
import { SVGLineElement } from './svg/SVGLineElement.js';
import { SVGEllipseElement } from './svg/SVGEllipseElement.js';
import { SVGForeignObjectElement } from './svg/SVGForeignObjectElement.js';
import { SVGImageElement } from './svg/SVGImageElement.js';

function getChildByTagName(parent, name) {
  if (!parent) return null;
  const expectedName =
    parent.ownerDocument?.namespaceURI === html ? name.toUpperCase() : name;
  for (
    let child = parent.firstChild;
    child != null;
    child = child.nextSibling
  ) {
    if (
      child.nodeType === Node.ELEMENT_NODE &&
      child.nodeName === expectedName
    ) {
      return child;
    }
  }
  return null;
}

const getSVGElementForName = name => {
  switch (name.toLowerCase()) {
    case 'svg':
      return SVGSVGElement;
    case 'path':
      return SVGPathElement;
    case 'circle':
      return SVGCircleElement;
    case 'ellipse':
      return SVGEllipseElement;
    case 'line':
      return SVGLineElement;
    case 'rect':
      return SVGRectElement;
    case 'foreignobject':
      return SVGForeignObjectElement;
    case 'image':
      return SVGImageElement;
    case 'text':
    case 'tspan':
    case 'tref':
    case 'altglyph':
    case 'textpath':
      return SVGTextContentElement;
    default:
      return SVGGraphicsElement;
  }
};

const getHTMLElementForName = name => {
  switch (name.toLowerCase()) {
    case 'img':
      return HTMLImageElement;
    case 'link':
      return HTMLLinkElement;
    case 'script':
      return HTMLScriptElement;
    default:
      return HTMLElement;
  }
};

const getElementForNamespace = (ns, name) => {
  switch (ns) {
    case svg:
      return getSVGElementForName(name);
    case html:
    case null:
    case '':
    default:
      return getHTMLElementForName(name);
  }
};

// Feature/version pairs that DOMImplementation.hasFeature() returns true for.  It returns false for anything else.
const supportedFeatures = {
  xml: { '': true, '1.0': true, '2.0': true },
  core: { '': true, '2.0': true },
  html: { '': true, '1.0': true, '2.0': true },
  xhtml: { '': true, '1.0': true, '2.0': true } // HTML
};

export const DOMImplementation = {
  hasFeature(feature: string, version = ''): boolean {
    const f = supportedFeatures[(feature || '').toLowerCase()];
    return (f && f[version || '']) || false;
  },

  createDocumentType(
    qualifiedName: string,
    publicId: unknown = '',
    systemId: unknown = ''
  ) {
    return new DocumentType(validateName(qualifiedName), {
      publicId: String(publicId ?? ''),
      systemId: String(systemId ?? ''),
      ownerDocument: null
    });
  },

  createDocument<N extends string | null>(
    namespace: N,
    qualifiedName = '',
    doctype: DocumentType | null = null
  ) {
    const doc = new Document(namespace);
    if (doctype) {
      if (!(doctype instanceof DocumentType)) {
        throw new Error('Hierarchy Request Error');
      }
      if (doctype.ownerDocument) {
        throw new Error(
          'the object is in the wrong Document, a call to importNode is required'
        );
      }
    }

    // Construct the root before consuming a caller-owned doctype so invalid
    // qualified names leave that doctype detached and reusable.
    const root = qualifiedName
      ? doc.createElementNS(namespace, qualifiedName)
      : null;
    if (doctype) {
      doc.appendChild(doctype);
    }
    if (root) doc.appendChild(root);
    return doc;
  },

  createHTMLDocument(titleText = '') {
    const d = new Document(html);
    const root = d.createElement('html');
    const head = d.createElement('head');
    const title = d.createElement('title');
    title.appendChild(d.createTextNode(titleText));
    head.appendChild(title);
    root.appendChild(head);
    root.appendChild(d.createElement('body'));

    d.appendChild(root);
    return d;
  }
};

export class Document<
  Namespace extends string | null = string | null
> extends Node {
  declare nodeType: number;
  declare implementation: typeof DOMImplementation;
  declare defaultView: import('./Window.js').Window | null;

  constructor(ns: Namespace = null) {
    super('#document', {}, ns);
    this.nodeType = Node.DOCUMENT_NODE;
    this.implementation = DOMImplementation;
    this.defaultView = null;
  }

  // https://dom.spec.whatwg.org/#dom-document-createattribute
  createAttribute(localName: string) {
    if (this.namespaceURI === html) {
      localName = localName.toLowerCase();
    }
    return this.createAttributeNS(null, localName, true);
  }

  createAttributeNS(ns: string | null, qualifiedName: string, local = false) {
    // `local` is used by createAttribute()/setAttribute(): in that API a colon
    // belongs to the local name and does not introduce a namespace prefix.
    if (local) {
      ns = normalizeNamespace(ns);
      qualifiedName = validateName(qualifiedName);
    } else {
      [ns] = validateAndExtract(ns, qualifiedName);
    }

    return new Attr(qualifiedName, { ownerDocument: this, local }, ns);
  }

  createCDATASection(text: unknown) {
    if (this.namespaceURI === html) throw new Error('Not Supported Error');

    const value = String(text);
    if (value.includes(']]>')) throw new Error('Invalid Character Error');
    return new CDATASection('#cdata-section', {
      nodeValue: value,
      ownerDocument: this
    });
  }

  createComment(text: unknown) {
    return new Comment('#comment', {
      nodeValue: String(text),
      ownerDocument: this
    });
  }

  createDocumentFragment() {
    return new DocumentFragment('#document-fragment', { ownerDocument: this });
  }

  createElement<K extends string>(localName: K): CreatedElement<Namespace, K> {
    // svgdom historically inherits the document namespace here. This differs
    // from browser XML DOMs, but keeps the convenient SVG creation API stable.
    if (this.namespaceURI === html)
      localName = String(localName).toLowerCase() as K;
    return this.createElementNS(
      this.namespaceURI,
      localName,
      true
    ) as CreatedElement<Namespace, K>;
  }

  createElementNS<N extends string | null, K extends string>(
    ns: N,
    qualifiedName: K,
    local = false
  ): CreatedElement<N, K> {
    let localName;
    // See createAttributeNS(): non-namespace creation deliberately keeps the
    // complete supplied name as the local name.
    if (local) {
      ns = normalizeNamespace(ns);
      qualifiedName = validateName(qualifiedName);
      localName = qualifiedName;
    } else {
      [ns, , localName] = validateAndExtract(ns, qualifiedName);
    }

    // Concrete SVG/HTML classes are selected by local name, not by a possibly
    // prefixed qualified name such as `svg:rect`.
    const Element = getElementForNamespace(ns, localName);

    return new Element(
      qualifiedName,
      {
        ownerDocument: this,
        local
      },
      ns
    ) as CreatedElement<N, K>;
  }

  createTextNode(text: unknown) {
    return new Text('#text', {
      nodeValue: String(text),
      ownerDocument: this
    });
  }

  get compatMode() {
    return 'CSS1Compat'; // always be in standards-mode
  }

  get body(): HTMLElement | null {
    return getChildByTagName(this.documentElement, 'body');
  }

  get head(): HTMLElement | null {
    return getChildByTagName(this.documentElement, 'head');
  }

  get documentElement(): Element | null {
    return (
      this.childNodes.find(node => node.nodeType === Node.ELEMENT_NODE) || null
    );
  }
}

mixin(elementAccess, Document);
mixin(ParentNode, Document);
mixin(NonElementParentNode, Document);

type elementAccessInterface = typeof elementAccess;
type ParentNodeInterface = typeof ParentNode;
type NonElementParentNodeInterface = typeof NonElementParentNode;
export interface Document<Namespace extends string | null = string | null>
  extends
    elementAccessInterface,
    ParentNodeInterface,
    NonElementParentNodeInterface {
  namespaceURI: Namespace;
}

export interface SVGElementTagNameMap {
  svg: SVGSVGElement;
  path: SVGPathElement;
  circle: SVGCircleElement;
  ellipse: SVGEllipseElement;
  line: SVGLineElement;
  rect: SVGRectElement;
  foreignObject: SVGForeignObjectElement;
  image: SVGImageElement;
  text: SVGTextContentElement;
  tspan: SVGTextContentElement;
  tref: SVGTextContentElement;
  altGlyph: SVGTextContentElement;
  textPath: SVGTextContentElement;
}
export interface HTMLElementTagNameMap {
  img: HTMLImageElement;
  link: HTMLLinkElement;
  script: HTMLScriptElement;
}
export type CreatedElement<N, K extends string> = N extends typeof svg
  ? K extends keyof SVGElementTagNameMap
    ? SVGElementTagNameMap[K]
    : SVGGraphicsElement
  : K extends keyof HTMLElementTagNameMap
    ? HTMLElementTagNameMap[K]
    : HTMLElement;
