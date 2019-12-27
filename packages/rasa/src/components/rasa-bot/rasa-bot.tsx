import { Component, Prop, h } from '@stencil/core';
import { uuidv4, wait } from '../../utils/utils.js';
import '@assister/chat/';
import { IncomingEventDetail } from '@assister/chat/dist/types/interfaces';

function mapDuration(gap) {
  return {
    'none': 0,
    'short': 500,
    'long': 1000
  }[gap]
}

let previousMessageSent = Promise.resolve();

@Component({
  tag: 'rasa-bot',
  styleUrl: 'rasa-bot.css',
  shadow: true
})
export class RasaBot {
  /**
   * Rasa server address
   */
  @Prop({reflectToAttr: true}) server: string;
  @Prop({reflectToAttr: true}) token?: string;
  @Prop({reflectToAttr: true}) theme: 'WhatsApp' | 'Simple' = 'WhatsApp';
  @Prop({reflectToAttr: true}) conversation: string = uuidv4();
  @Prop({reflectToAttr: true}) header: string = 'Assistant';
  @Prop({reflectToAttr: true}) gap: 'none' | 'short' | 'long' = 'long';
  private pane?: HTMLChatPaneElement;
  private fab?: HTMLFabAppElement;

  handleIncomingMessage(event: CustomEvent<IncomingEventDetail>) {
    const chatMessageElement = event.detail.element;
    if (this.theme === 'Simple') {
      chatMessageElement.state = 'none';
      chatMessageElement.footer = '';
    }
    this.sendMessage(event.detail.text);
  }

  sendMessage(text) {
    fetch(`${this.server}/conversations/${this.conversation}/messages?token=${
      this.token}`, {
      method: 'POST',
      body: JSON.stringify({text, sender: 'user'}),
      headers:{
        'Content-Type': 'application/json'
      }
    })
      .then(() => this.predictUntilListen())
      .then(wait(mapDuration(this.gap)));
  }

  predictUntilListen(execution?) {
    if (execution && execution.messages && execution.messages.length == 0) {
      return;
    } else if (execution) {
      execution.messages.map(message => {
        previousMessageSent = previousMessageSent
          .then(wait(mapDuration(this.gap)))
          .then(() => {
            if (message.text) {
              this.pane.addIncomingMessage(message.text);
            }
            if (message.image) {
              this.pane.addCard({image: message.image});
            }
            if (message.buttons) {
              message.buttons.map(button => this.pane.addButton({
                text: button.title,
                action: () => this.sendMessage(button.payload)
              }));
            }
          });
      });
    }
    fetch(`${this.server}/conversations/${this.conversation}/predict?token=${
      this.token}`, {method: 'POST'})
    .then(result => result.json())
    .then(response => response.scores[0].action)
    .then(action => fetch(`${this.server}/conversations/${
      this.conversation}/execute?token=${this.token}`, {
      method: 'POST',
      body: JSON.stringify({name: action}),
      headers:{
        'Content-Type': 'application/json'
      }
    }))
    .then(result => result.json())
    .then(execution => this.predictUntilListen(execution))
  }

  componentDidLoad() {
    this.sendMessage('hi');
  }

  render() {
    return (
      <fab-app
        ref={element => this.fab = element}
      >
        <chat-pane
          ref={element => this.pane = element}
          onIncoming={event => this.handleIncomingMessage(event)}
        >
            <ion-toolbar slot="header" class="toolbar">
              <ion-title>{this.header}</ion-title>
              <ion-buttons slot="primary">
                <ion-button
                  onClick={() => this.fab.close()}
                >
                  <ion-icon slot="icon-only" name="close" />
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
        </chat-pane>
      </fab-app>
    );
  }
}
