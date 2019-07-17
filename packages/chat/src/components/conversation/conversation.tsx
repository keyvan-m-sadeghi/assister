import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'assister-conversation',
  styleUrl: 'conversation.css',
  shadow: true
})
export class Conversation {

  @Prop() foo = 'bar';

  render() {
    return (
        <ion-list>
          <slot />
        </ion-list>
    );
  }
}
