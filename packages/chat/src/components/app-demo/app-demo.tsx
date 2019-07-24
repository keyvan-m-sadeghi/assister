import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-demo',
})
export class AppDemo {
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
        </ion-content>,

        <fab-app>
          <chat-pane>
            <chat-message state="read" footer="10:00 AM">
              <h1>Status</h1>
              <p><b>Bold</b> claims have been put forward about the future of <i>assistants</i>.</p>
              <p>Many people adopting them.</p>
              <h4>Legit?</h4>
              <p>To be seen!</p>
            </chat-message>
            <chat-message state="delivered">
              <p>sege</p>
              <p>soote</p>
            </chat-message>
            <ion-card>
              <ion-card-content>
                khare
              </ion-card-content>
            </ion-card>
            <chat-message state="pending">
              <p>gave</p>
            </chat-message>
            <chat-message state="none">
              <p>shaghale</p>
            </chat-message>
          </chat-pane>
        </fab-app>
      ];
  }
}
