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
  @Element() pane?: HTMLChatPaneElement;
  @Prop() mapInputTextToHtmlElements = createElementsFromText;
  @Prop() triangle: MessageTriangle = 'bottom';

  private content?: HTMLIonContentElement;

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
    let height = 0;
    for (let i = 0; i < this.pane.children.length; i++) {
      height += this.pane.children[i].clientHeight;
    }
    this.content.scrollToPoint(0, height, 800);
    return message;
  }

  render() {
    return [
        <ion-header class="header">
          <slot name="header" />
        </ion-header>,

        <ion-content class="content"
          ref={element => this.content = element}
        >
          <ion-list class="list">
            <slot />
          </ion-list>
        </ion-content>,

        <ion-footer class="footer">
          <chat-input onSend={event => this.send(event.detail.value)} />
        </ion-footer>
    ];
  }
}
