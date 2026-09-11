import { Node } from './Node.js'
import { mixin } from '../utils/objectCreationUtils.js'
import { NonDocumentTypeChildNode } from './mixins/NonDocumentTypeChildNode.js'
import { ChildNode } from './mixins/ChildNode.js'

export class CharacterData extends Node {
  declare _data: string

  constructor(name: string, props: import('./Node.js').NodeProps = {}) {
    super(name, props)
  }

  appendData(data: unknown) {
    this.data += String(data)
  }

  deleteData(offset: number, count: number) {
    ;[offset, count] = this._validateRange(offset, count)
    this.data = this.data.slice(0, offset) + this.data.slice(offset + count)
  }

  insertData(offset: number, data: unknown) {
    ;[offset] = this._validateRange(offset, 0)
    this.data =
      this.data.slice(0, offset) + String(data) + this.data.slice(offset)
  }

  replaceData(offset: number, count: number, data: unknown) {
    ;[offset, count] = this._validateRange(offset, count)
    this.data =
      this.data.slice(0, offset) +
      String(data) +
      this.data.slice(offset + count)
  }

  substringData(offset: number, count: number) {
    ;[offset, count] = this._validateRange(offset, count)
    return this.data.slice(offset, offset + count)
  }

  _validateRange(offset: number, count: number): [number, number] {
    // Offsets outside the data are errors; an otherwise valid count is clamped
    // to the remaining data so every mutator can use ordinary slice operations.
    offset = Math.trunc(Number(offset))
    count = Math.trunc(Number(count))
    if (
      !Number.isFinite(offset) ||
      !Number.isFinite(count) ||
      offset < 0 ||
      count < 0 ||
      offset > this.length
    ) {
      throw new Error('Index Size Error')
    }
    return [offset, Math.min(count, this.length - offset)]
  }

  get length() {
    return this.data.length
  }

  get data(): string {
    return this._data
  }

  // data and nodeValue are two views of the same backing value. Keeping the
  // conversion here prevents the aliases from drifting after direct writes.
  set data(value: unknown) {
    this._data = String(value)
  }

  get nodeValue(): string {
    return this._data
  }

  set nodeValue(value: unknown) {
    this._data = String(value)
  }
}

mixin(NonDocumentTypeChildNode, CharacterData)
mixin(ChildNode, CharacterData)

type NonDocumentTypeChildNodeInterface = typeof NonDocumentTypeChildNode
type ChildNodeInterface = typeof ChildNode
export interface CharacterData
  extends NonDocumentTypeChildNodeInterface, ChildNodeInterface {}
