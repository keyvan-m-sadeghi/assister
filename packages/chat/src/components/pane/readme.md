# chat-pane



<!-- Auto Generated Below -->


## Properties

| Property                     | Attribute  | Description | Type                              | Default                  |
| ---------------------------- | ---------- | ----------- | --------------------------------- | ------------------------ |
| `mapInputTextToHtmlElements` | --         |             | `(text: string) => HTMLElement[]` | `createElementsFromText` |
| `triangle`                   | `triangle` |             | `"bottom" \| "none" \| "top"`     | `'bottom'`               |


## Events

| Event      | Description | Type               |
| ---------- | ----------- | ------------------ |
| `incoming` |             | `CustomEvent<any>` |


## Methods

### `addIncomingMessage(text: string) => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`



### `addOutgoingMessage(text: string) => Promise<HTMLElement>`



#### Returns

Type: `Promise<HTMLElement>`




## Dependencies

### Depends on

- [chat-message](../message)
- ion-header
- [chat-conversation](../conversation)
- ion-footer
- [chat-input](../input)

### Graph
```mermaid
graph TD;
  chat-pane --> chat-message
  chat-pane --> ion-header
  chat-pane --> chat-conversation
  chat-pane --> ion-footer
  chat-pane --> chat-input
  chat-message --> ion-item
  chat-message --> chat-message-status
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  chat-message-status --> ion-icon
  chat-message-status --> chat-check-mark
  chat-conversation --> ion-content
  chat-conversation --> ion-list
  chat-input --> ion-icon
  chat-input --> ion-item
  chat-input --> ion-textarea
  style chat-pane fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
