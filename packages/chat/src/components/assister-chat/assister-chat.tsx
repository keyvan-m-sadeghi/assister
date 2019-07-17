import { Component, h } from '@stencil/core';

@Component({
  tag: 'assister-chat',
  styleUrl: 'assister-chat.css'
})
export class AssisterChat {

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">

      <ion-button href="/profile/ionic" expand="block">Profile page</ion-button>

      <ion-list>
        <assister-message>
            sege <b>bold</b>
        </assister-message>
        <assister-message>
          soote        
        </assister-message>
        <ion-card>
          <ion-card-content>
            khare
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            gave
          </ion-card-content>
        </ion-card>
        <ion-card>
          <ion-card-content>
            shaghale
          </ion-card-content>
        </ion-card>
      </ion-list>

      <ion-infinite-scroll threshold="100px" id="infinite-scroll">
        <ion-infinite-scroll-content loading-spinner="bubbles" loading-text="Loading more data...">
        </ion-infinite-scroll-content>
      </ion-infinite-scroll>
      
      </ion-content>

      
    ];
  }
}
