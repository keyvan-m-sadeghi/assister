import { Component, h, Prop } from '@stencil/core';
import { MessageState } from '../../interfaces';

@Component({
  tag: 'chat-message-status',
  styleUrl: 'message-status.css',
  shadow: true
})
export class MessageStatus {
  @Prop() state: MessageState = 'pending';

  render() {
      const body = {
          'none': false,
          'pending': <ion-icon name='time' />,
          'delivered': <chat-check-mark ticks="one" />,
          'read': <chat-check-mark ticks="two" />
      }[this.state];
      return body;
  }
}
