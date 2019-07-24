import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-demo',
})
export class AppDemo {
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

        <fab-app>
          <chat-pane>
            <ion-toolbar slot="header" color="primary">
              <ion-title>Assister Chat</ion-title>
            </ion-toolbar>
            <ion-card>
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
              <p>
                This is a <b>chat-message</b>! It has <i>"footer"</i> and
                <i>"state"</i> attributes.
              </p>
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
