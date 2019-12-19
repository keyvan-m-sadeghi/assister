import { Component, h, Prop } from '@stencil/core';
import { MessageTriangle, MessageDirection, MessageState } from '../../interfaces';

@Component({
  tag: 'chat-message',
  styleUrl: 'message.css',
  shadow: true
})
export class Message {
  @Prop() state: MessageState = 'none';
  @Prop() direction: MessageDirection = 'outgoing';
  @Prop() triangle: MessageTriangle = 'bottom';
  @Prop() footer: string;

  get footerExists() {
    return this.footer || this.state != 'none';
  }

  render() {
    const alignment = this.direction === 'outgoing' ? 'right' : 'left';
    return (
      <ion-item lines="none" class="item">
        <div slot={alignment === 'left' ? 'start' : 'end'} class={
            `bubble ${this.direction} ${
              this.footerExists ? 'bubble-footer-padding' : ''
            }`
          }
        >
          <slot />
          <div class="footer">
            {
              this.footer &&
              <span class="footer-text">
                {this.footer}
              </span>
            }
            <chat-message-status state={this.state} />
          </div>
          {
            this.triangle != "none" &&
            <div class={
              `triangle ${this.direction} ${this.triangle}-${alignment}`
            }>
            </div>
          }
        </div>
      </ion-item>
    );
  }
}
