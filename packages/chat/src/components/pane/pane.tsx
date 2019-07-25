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

  @Event() message: EventEmitter<HTMLChatMessageElement>;

  @Element() pane?: HTMLChatPaneElement;
  private conversation?: HTMLChatConversationElement;

  addMessage(direction: MessageDirection, text) {
    const message = document.createElement('chat-message');
    message.setAttribute(
      'state', direction === 'outgoing' ? 'pending' : 'none');
    message.setAttribute('direction', direction);
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

  @Method()
  async receive(text: string) {
    console.log('heeee')
    return this.addMessage('incoming', text)
  }

  @Method()
  async send(text: string) {
    return this.addMessage('outgoing', text)
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
              event => this.send(event.detail.value)
                .then(message => this.message.emit(message))
            }
          />
        </ion-footer>
    ];
  }
}
