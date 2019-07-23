import { Component, h, Prop } from '@stencil/core';
import { MessageTriangle, MessageDirection, MessageState } from '../../interfaces';

@Component({
  tag: 'assister-message',
  styleUrl: 'message.css',
  shadow: true
})
export class Message {
  @Prop() state: MessageState = 'pending';
  @Prop() direction: MessageDirection = 'outgoing';
  @Prop() triangle: MessageTriangle = 'bottom';
  @Prop() footer: string;

  render() {
    const alignment = this.direction === 'outgoing' ? 'right' : 'left';
    return (
      <ion-item lines="none" class={`container`}>
        <div slot={alignment === 'left' ? 'start' : 'end'}
          class={`bubble triangle-${this.triangle}-${alignment}`}
        >
          <slot />
          <div class="footer">
            <span class="footer-text">
              {this.footer}
            </span>
            <assister-message-status state={this.state} />
          </div>
        </div>
      </ion-item>
    );
  }
}
