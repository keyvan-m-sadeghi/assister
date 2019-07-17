import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'assister-message',
  styleUrl: 'message.css',
  shadow: true
})
export class Message {
  @Prop() status: 'none' | 'pending' | 'sent' | 'delivered' = 'none';

  @Prop() triangle: 'none' | 'top' | 'bottom' = 'bottom';
  @Prop() alignment: 'left' | 'right' = 'right';

  render() {
    return (      
      <ion-item lines="none" class={`container`}>
        <div slot={this.alignment === 'left' ? 'start' : 'end'}
          class={`bubble triangle-${this.triangle}-${this.alignment}`}>
          <p>
            <slot />
          </p>
        </div>
      </ion-item>
    );
  }
}
