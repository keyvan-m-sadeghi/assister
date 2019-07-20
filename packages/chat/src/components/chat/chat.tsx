import { Component, h } from '@stencil/core';

@Component({
  tag: 'assister-chat',
  styleUrl: 'chat.css',
  shadow: true
})
export class Chat {

  private content?: HTMLIonContentElement;
  private conversation?: HTMLAssisterConversationElement;

  handleSend(event) {
    const text = event.detail.value;
    const message = (
      <assister-message alignment="right" triangle="bottom">
        { text }
      </assister-message>
    );
    this.conversation.insertToBottom(message)
      .then(() => this.content.scrollToBottom());
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Assister</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content
        ref={element => this.content = element}
      >
        {/* <ion-button href="/profile/ionic" expand="block">Profile page</ion-button> */}
        <assister-conversation
          ref={element => this.conversation = element}
        >
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
        </assister-conversation>
      </ion-content>,

      <ion-footer>
        <assister-input onSend={event => this.handleSend(event)} />
      </ion-footer>
    ];
  }
}
