import type { Event } from './Event.js'

export type EventListener = (event: Event) => void

const $ = Symbol('private properties')

export class EventTarget {
  declare private [$]: { listeners: Record<string, EventListener[]> }
  constructor() {
    this[$] = { listeners: {} }
  }

  addEventListener(type: string, callback: EventListener) {
    if (!(type in this[$].listeners)) {
      this[$].listeners[type] = []
    }
    this[$].listeners[type].push(callback)
  }

  dispatchEvent(event: Event) {
    if (!(event.type in this[$].listeners)) {
      return true
    }

    var stack = this[$].listeners[event.type]
    event.target = this

    stack.forEach(function (el) {
      el(event)
    })

    return !event.defaultPrevented
  }

  removeEventListener(type: string, callback: EventListener) {
    if (!(type in this[$].listeners)) {
      return
    }

    var stack = this[$].listeners[type]
    for (var i = 0, il = stack.length; i < il; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return
      }
    }
  }
}
