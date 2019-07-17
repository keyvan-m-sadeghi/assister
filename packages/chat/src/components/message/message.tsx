import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'assister-message',
  styleUrl: 'message.css',
  shadow: true
})
export class Message {
  @Prop() status: 'none' | 'pending' | 'sent' | 'delivered' = 'none';

  @Prop() triangle: 'none' | 'top' | 'bottom' = 'none';
  @Prop() alignment: 'left' | 'right' = 'right';

  getClassForBubble() {
    return `bubble
    triangle-${this.triangle}-${this.alignment}
    align-${this.alignment}`;
  }

  render() {
    return (
      <div class="container">
        <div class={this.getClassForBubble()}>
          <p>
            <slot />
          </p>
        </div>
      </div>
    );
  }
}
