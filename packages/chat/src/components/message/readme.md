# chat-message



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type                                           | Default      |
| ----------- | ----------- | ----------- | ---------------------------------------------- | ------------ |
| `direction` | `direction` |             | `"incoming" \| "outgoing"`                     | `'outgoing'` |
| `footer`    | `footer`    |             | `string`                                       | `undefined`  |
| `state`     | `state`     |             | `"delivered" \| "none" \| "pending" \| "read"` | `'none'`     |
| `triangle`  | `triangle`  |             | `"bottom" \| "none" \| "top"`                  | `'bottom'`   |


## Dependencies

### Used by

 - [chat-pane](../pane)

### Depends on

- ion-item
- [chat-message-status](../message-status)

### Graph
```mermaid
graph TD;
  chat-message --> ion-item
  chat-message --> chat-message-status
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  chat-message-status --> ion-icon
  chat-message-status --> chat-check-mark
  chat-pane --> chat-message
  style chat-message fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
