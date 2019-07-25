import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { TextareaChangeEventDetail } from '@ionic/core';
import { AssisterInputChangeEventDetail } from '../../interfaces';

@Component({
  tag: 'chat-input',
  styleUrl: 'input.css',
  shadow: true
})
export class Input {
  @State() textEmpty = true;
  private textarea?: HTMLIonTextareaElement;

  @Event() send: EventEmitter<AssisterInputChangeEventDetail>;

  handleTextChange(event: CustomEvent<TextareaChangeEventDetail>) {
    this.textEmpty = event.detail.value ==='';
  }

  handleEnter(event: KeyboardEvent) {
    if (event.key != 'Enter') {
      return;
    }
    event.preventDefault();
    if (event.ctrlKey) {
      this.textarea.value += '\n';
      return;
    }
    this.handleSend();
  }

  handleSend(event?: MouseEvent) {
    if (event) {
      event.preventDefault();
    }
    this.send.emit({value: this.textarea.value});
    this.textarea.value = '';
    this.textarea.focus();
  }

  render() {
    const button = this.textEmpty ?
      <ion-icon name="mic"/>
      :
      <ion-icon name="send" onMouseDown={event => this.handleSend(event)}/>;
    return (
      <ion-item>
        <ion-textarea
          placeholder="Type a message"
          ref={element => this.textarea = element as HTMLIonTextareaElement}
          onIonChange={event => this.handleTextChange(event)}
          onKeyDown={event => this.handleEnter(event)}
        />
        { button }
      </ion-item>
    );
  }
}
