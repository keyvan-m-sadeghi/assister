import { Component, h, Prop } from '@stencil/core';
import { MessageState } from '../../interfaces';

@Component({
  tag: 'assister-message-status',
  styleUrl: 'message-status.css',
  shadow: true
})
export class MessageStatus {
  @Prop() state: MessageState = 'pending';

  render() {
      const body = {
          'none': false,
          'pending': <ion-icon name='time' />,
          'delivered': <assister-checkmark ticks="one" />,
          'read': <assister-checkmark ticks="two" />
      }[this.state];
      return body;
  }
}
