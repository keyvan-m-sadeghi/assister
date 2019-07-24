import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'chat-check-mark',
  styleUrl: 'check-mark.css',
  shadow: true
})
export class CheckMark {
  @Prop() ticks: 'one' | 'two' = 'one';

  render() {
    const secondTick = [
      <div class="check-mark-second-stem"></div>,
      <div class="check-mark-second-kick"></div>,
      <div class="check-mark-kick-half"></div>
    ];
    return (
      <div class="container">
        <div class="check-mark-stem"></div>
        { this.ticks === 'one' && <div class="check-mark-kick"></div> }
        { this.ticks === 'two' && secondTick }
      </div>
    );
  }
}
