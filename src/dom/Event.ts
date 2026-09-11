export class Event {
  declare type: string;
  declare cancelable: boolean;
  declare defaultPrevented: boolean;
  declare target: import('./EventTarget.js').EventTarget | null;

  constructor(type: string) {
    this.type = type;
    this.cancelable = false;
    this.defaultPrevented = false;
    this.target = null;
  }

  preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true;
    }
  }
}
