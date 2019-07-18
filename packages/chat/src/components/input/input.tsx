import { Component, h, State } from '@stencil/core';
import { TextareaChangeEventDetail } from '@ionic/core';

@Component({
  tag: 'assister-input',
  styleUrl: 'input.css',
  shadow: true
})
export class Input {
  @State() textEmpty = true;

  onTextChange(event: CustomEvent<TextareaChangeEventDetail>) {
    this.textEmpty = event.detail.value ==='';
  }

  render() {
    const button = this.textEmpty ?
      <ion-icon name="mic"/> : <ion-icon name="send"/>;
    return (
      <ion-footer>
        <ion-item>
          <ion-textarea onIonChange={event => this.onTextChange(event)} />
          { button }
        </ion-item>
      </ion-footer>
    );
  }
}
