# chat-input



<!-- Auto Generated Below -->


## Events

| Event  | Description | Type                                          |
| ------ | ----------- | --------------------------------------------- |
| `send` |             | `CustomEvent<AssisterInputChangeEventDetail>` |


## Dependencies

### Used by

 - [chat-pane](../pane)

### Depends on

- ion-icon
- ion-item
- ion-textarea

### Graph
```mermaid
graph TD;
  chat-input --> ion-icon
  chat-input --> ion-item
  chat-input --> ion-textarea
  ion-item --> ion-icon
  ion-item --> ion-ripple-effect
  chat-pane --> chat-input
  style chat-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
