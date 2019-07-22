import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'assister-checkmark',
  styleUrl: 'checkmark.css',
  shadow: true
})
export class Checkmark {
  @Prop() ticks: 'one' | 'two' = 'one';

  render() {
    const secondTick = [
      <div class="checkmark_kick_half"></div>,
      <div class="checkmark_second_stem"></div>,
      <div class="checkmark_second_kick"></div>
    ];
    return (
      <span class="checkmark">
        <div class="checkmark_stem"></div>
        { this.ticks === 'one' && <div class="checkmark_kick"></div> }
        { this.ticks === 'two' && secondTick }
      </span>
    );
  }
}
