import { Component, h, Prop, Host } from '@stencil/core';
import { MessageState } from '../../interfaces';

@Component({
  tag: 'chat-message-status',
  styleUrl: 'message-status.css',
  shadow: true
})
export class MessageStatus {
  @Prop() state: MessageState = 'pending';

  render() {
      const status = {
          'none': false,
          'pending': <ion-icon name='time' class="pending" />,
          'delivered': <chat-check-mark ticks="one" />,
          'read': <chat-check-mark ticks="two" />
      }[this.state];
      return (
        <Host class={this.state}>
          { status }
        </Host>
      );
  }
}
