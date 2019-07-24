import { Component, h, State, Method } from '@stencil/core';

@Component({
  tag: 'chat-conversation',
  shadow: true
})
export class Conversation {
  @State() top = [];
  @State() bottom = [];
  private resolveUpdate?: Function;

  getUpdatePromise() {
    return new Promise(resolve => this.resolveUpdate = resolve);
  }

  @Method()
  insertToTop(content) {
    this.top = [content, ...this.top];
  }

  // TODO make this a method decorator
  @Method()
  async insertToBottom(content) {
    const updated = this.getUpdatePromise();
    this.bottom = [...this.bottom, content];
    return updated;
  }

  // TODO make this a class decorator
  componentDidUpdate() {
    if (this.resolveUpdate) {
      this.resolveUpdate();
    }
  }

  render() {
    return (
        <ion-list>
          { this.top }
          <slot />
          { this.bottom }
        </ion-list>
    );
  }
}
