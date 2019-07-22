import { Component, h, Prop } from '@stencil/core';
import { MessageTriangle } from '../../interfaces';

@Component({
  tag: 'assister-chat',
  styleUrl: 'chat.css',
  shadow: true
})
export class Chat {
  @Prop() mapInputTextToHtml = (text: string) =>
    text.split('\n').map(line => <p style={{margin: '0'}}>{line}</p>);
    @Prop() triangle: MessageTriangle = 'bottom';

  private content?: HTMLIonContentElement;
  private conversation?: HTMLAssisterConversationElement;

  handleSend(event) {
    const text = event.detail.value;
    const message = (
      <assister-message direction="outgoing" triangle={this.triangle}>
        { this.mapInputTextToHtml(text) }
      </assister-message>
    );
    this.conversation.insertToBottom(message)
      .then(() => this.content.scrollToBottom());
  }

  render() {
    return [
        <ion-header class="header">
          <ion-toolbar color="primary">
            <ion-title>Assister</ion-title>
          </ion-toolbar>
        </ion-header>,

        <ion-content class="content"
          ref={element => this.content = element}
        >
          <assister-conversation
            ref={element => this.conversation = element}
          >
            <slot />
          </assister-conversation>
        </ion-content>,

        <ion-footer class="footer">
          <assister-input onSend={event => this.handleSend(event)} />
        </ion-footer>
    ];
  }
}
