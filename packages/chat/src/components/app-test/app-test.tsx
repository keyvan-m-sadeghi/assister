import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-test',
})
export class AppTest {
  render() {
      return [
        <ion-header>
          <ion-toolbar color="primary">
            <ion-title>Home</ion-title>
          </ion-toolbar>
        </ion-header>,
        <ion-content>
          <ion-list>
            { Array.from({length: 100}, () => <p>I'm here for scroll!</p>) }
          </ion-list>
          <assister-fab />
        </ion-content>
      ];
  }
}
