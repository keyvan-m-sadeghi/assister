import { Component, h, State, Method, Prop } from '@stencil/core';

@Component({
  tag: 'fab-app',
  styleUrl: 'fab.css',
  shadow: true
})
export class Fab {
  @Prop() ionicon = "code-working";

  @State() showApp = true;

  @Method()
  async close() {
    this.showApp = false;
  }

  handleClick() {
      this.showApp = !this.showApp;
  }

  render() {
    return [
      <ion-fab-button class="fab" onClick={this.handleClick.bind(this)}>
        <ion-icon name={this.ionicon}/>
      </ion-fab-button>,
      <style>
        ::slotted(:first-child) { '{' }
          display: { this.showApp ? 'block' : 'none' };
        { '}' }
      </style>,
      <slot />
    ];
  }
}
