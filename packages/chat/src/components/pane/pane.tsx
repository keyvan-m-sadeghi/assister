import { Component, h, Element, Prop, Method } from '@stencil/core';
import { MessageTriangle } from '../../interfaces';

function createElementsFromText(text: string): HTMLElement[] {
  return text.split('\n').map(line => {
    if (line === '') {
      return document.createElement('br');
    }
    const pElement = document.createElement('p');
    pElement.appendChild(document.createTextNode(line));
    return pElement;
  });
}

@Component({
  tag: 'chat-pane',
  styleUrl: 'pane.css',
  shadow: true
})
export class Pane {
  @Prop() mapInputTextToHtmlElements = createElementsFromText;
  @Prop() triangle: MessageTriangle = 'bottom';

  @Element() pane?: HTMLChatPaneElement;
  private conversation?: HTMLChatConversationElement;

  @Method()
  async send(text: string) {
    const message = document.createElement('chat-message');
    message.setAttribute('state', 'pending');
    message.setAttribute('direction', 'outgoing');
    message.setAttribute('triangle', this.triangle);
    message.setAttribute('footer', new Date().toLocaleString('en-US', {
      hour: 'numeric', minute: 'numeric', hour12: true
    }));
    this.mapInputTextToHtmlElements(text)
      .map(element => message.appendChild(element));
    this.pane.appendChild(message);
    this.conversation.scrollToBottom();
    return message;
  }

  render() {
    return [
        <ion-header class="header">
          <slot name="header" />
        </ion-header>,

        <chat-conversation
         ref={element => this.conversation = element}
        >
          <slot />
        </chat-conversation>,

        <ion-footer class="footer">
          <chat-input onSend={event => this.send(event.detail.value)} />
        </ion-footer>
    ];
  }
}
