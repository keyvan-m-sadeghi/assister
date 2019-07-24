import { Component, h, Prop, Method } from '@stencil/core';
import { MessageTriangle } from '../../interfaces';

@Component({
  tag: 'chat-pane',
  styleUrl: 'pane.css',
  shadow: true
})
export class Pane {
  @Prop() mapInputTextToHtml = (text: string) =>
    text.split('\n').map(line => line === '' ? <br /> : <p>{line}</p>);
  @Prop() triangle: MessageTriangle = 'bottom';

  private content?: HTMLIonContentElement;
  private conversation?: HTMLChatConversationElement;

  @Method()
  async send(text: string) {
    const message = (
      <chat-message
        direction="outgoing"
        triangle={this.triangle}
        footer={(new Date()).toLocaleString('en-US', {
          hour: 'numeric', minute: 'numeric', hour12: true
        })}
      >
        { this.mapInputTextToHtml(text) }
      </chat-message>
    );
    return this.conversation.insertToBottom(message)
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
          <chat-conversation
            ref={element => this.conversation = element}
          >
            <slot />
          </chat-conversation>
        </ion-content>,

        <ion-footer class="footer">
          <chat-input onSend={event => this.send(event.detail.value)} />
        </ion-footer>
    ];
  }
}
