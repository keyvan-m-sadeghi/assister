import { Component, h } from '@stencil/core';

@Component({
  tag: 'assister-chat',
  styleUrl: 'chat.css'
})
export class Chat {
  handleSend(event) {
    console.log(event.detail.value);
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content>
        <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>
        <assister-conversation>
          <assister-message>
              <h1>Status</h1>
              <p><b>Bold</b> claims have been put forward about the future of <i>assistants</i>.</p>
              <h4>Legit?</h4>
              <p>To be seen!</p>
          </assister-message>
          <assister-message>
            soote
          </assister-message>
          <ion-card>
            <ion-card-content>
              khare
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              gave
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-content>
              shaghale
            </ion-card-content>
          </ion-card>
        </assister-conversation>
      </ion-content>,

      <ion-footer>
        <assister-input onSend={event => this.handleSend(event)} />
      </ion-footer>
    ];
  }
}
