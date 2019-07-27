import { Component, h } from '@stencil/core';

const responses = [
  'Interesting!',
  'Yeah, I thought so too.',
  `That'd be really cool, though I'm not sure what my schedule is...

  I'll let you know.`,
  'You think so?',
  'Great!',
  'Ah sh**!',
  "Well, that's new!",
  'Alright',
  'OK'
]

function randomResponse() {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}

const wait = () => new Promise(resolve => setTimeout(resolve, 500));

@Component({
  tag: 'app-demo',
})
export class AppDemo {
  private pane?: HTMLChatPaneElement;
  private fab?: HTMLFabAppElement;

  handleMessage(event: CustomEvent<HTMLChatMessageElement>) {
    console.log(event)
    const message = event.detail;
    wait()
      .then(() => message.state = 'delivered')
      .then(wait)
      .then(() => message.state = 'read')
      .then(wait)
      .then(() => this.pane.addIncomingMessage(randomResponse()));
  }

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

        <fab-app
          ref={element => this.fab = element}
        >
          <chat-pane
            ref={element => this.pane = element}
            onIncoming={event => this.handleMessage(event)}
          >
            <ion-toolbar slot="header" color="primary">
              <ion-title>Assister Chat</ion-title>
              <ion-buttons slot="primary">
                <ion-button onClick={() => this.fab.close()}>
                  <ion-icon slot="icon-only" name="close" />
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
            <ion-card style={{background: 'white'}}>
              <ion-card-content>
              <p>Chat with this <i>Simple-Bot</i>!</p>
              <p>It knows only a few responses...</p>
              </ion-card-content>
            </ion-card>
            <chat-message state="read" footer="10:00 AM">
              <p>yess!!</p>
            </chat-message>
            <chat-message direction="incoming">
              <h2>Welcome to Assister Chat!</h2>
              <p>This is a demo for <b>chat-pane</b> web component.</p>
              <br />
              <p>
                <b>chat-pane</b> is an <i>"all-in-one"</i> element that
                encapsulates other chat elements, designed for simple
                use cases.
              </p>
              <h2>Use with other libraries?</h2>
              <p>That's exactly the purpose of our design!</p>
              <br />
              <p>
                However, you might want to use our <i>"view components"</i> so
                that you have fine-grained control over things that render
                inside <b>DOM</b>.
              </p>
            </chat-message>
            <chat-message state="pending"  footer="Hello! I'm little-footer!">
              <p>This is a <b>chat-message</b>!</p>
              <p>It has <i>"footer"</i> and <i>"state"</i> attributes.</p>              
            </chat-message>
            <chat-message state="delivered" footer="10:01 AM">
              <p>This one is <i>"delivered"</i>!</p>
            </chat-message>
            <chat-message state="read" footer="10:01 AM">
              <p><i>"read"</i>!</p>
            </chat-message>
            <chat-message direction="incoming" footer="10:02 AM">
              <p>Your turn!</p>
            </chat-message>
          </chat-pane>
        </fab-app>
      ];
  }
}
