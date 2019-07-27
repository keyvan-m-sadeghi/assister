import { Component, h, Element, Event, EventEmitter, Prop, Method } from '@stencil/core';
import { MessageTriangle, MessageDirection } from '../../interfaces';

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

  @Event() incoming: EventEmitter<HTMLChatMessageElement>;

  @Element() pane?: HTMLChatPaneElement;
  private conversation?: HTMLChatConversationElement;

  addMessage(direction: MessageDirection, text) {
    const message = document.createElement('chat-message');
    message.state = direction === 'outgoing' ? 'pending' : 'none';
    message.direction = direction;
    message.triangle = this.triangle;
    message.footer = new Date().toLocaleString('en-US', {
      hour: 'numeric', minute: 'numeric', hour12: true
    });
    this.mapInputTextToHtmlElements(text)
      .map(element => message.appendChild(element));
    this.pane.appendChild(message);
    this.conversation.scrollToBottom();
    return message;
  }

  @Method()
  async addOutgoingMessage(text: string) {
    return this.addMessage('outgoing', text)
  }

  @Method()
  async addIncomingMessage(text: string) {
    return this.addMessage('incoming', text)
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
          <chat-input
            onSend={
              event => this.addOutgoingMessage(event.detail.value)
                .then(message => this.incoming.emit(message))
            }
          />
        </ion-footer>
    ];
  }
}
