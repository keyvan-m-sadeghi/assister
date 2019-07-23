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
      <div class="checkmark-kick-half"></div>,
      <div class="checkmark-second-stem"></div>,
      <div class="checkmark-second-kick"></div>
    ];
    return (
      <div class="container">
        <div class="checkmark-stem"></div>
        { this.ticks === 'one' && <div class="checkmark-kick"></div> }
        { this.ticks === 'two' && secondTick }
      </div>
    );
  }
}
