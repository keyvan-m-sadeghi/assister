import { Component, h, Method } from '@stencil/core';

@Component({
  tag: 'chat-conversation',
  styleUrl: 'conversation.css',
  shadow: true
})
export class Conversation {
  private content?: HTMLIonContentElement;
  private list?: HTMLIonListElement;

  @Method()
  async scrollToBottom() {
    let slot = this.list.querySelector('*') as HTMLSlotElement;
    let rootSlot = false;
    while (!rootSlot) {
      const children = slot.assignedElements();
      if (children[0].tagName === 'SLOT') {
        slot = children[0] as HTMLSlotElement;
      } else {
        rootSlot = true;
      }
    }
    const children = slot.assignedElements();
    let height = 0;
    for (let i = 0; i < children.length; i++) {
      height += children[i].clientHeight;
    }
    return this.content.scrollToPoint(0, height, 800);
  }

  render() {
    return (
      <ion-content class="content"
        ref={element => this.content = element}
      >
        <ion-list
          ref={element => this.list = element}
        >
          <slot />
        </ion-list>
      </ion-content>
    );
  }
}
