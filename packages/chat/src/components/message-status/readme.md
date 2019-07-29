# chat-message-status



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type                                           | Default     |
| -------- | --------- | ----------- | ---------------------------------------------- | ----------- |
| `state`  | `state`   |             | `"delivered" \| "none" \| "pending" \| "read"` | `'pending'` |


## Dependencies

### Used by

 - [chat-message](../message)

### Depends on

- ion-icon
- [chat-check-mark](../check-mark)

### Graph
```mermaid
graph TD;
  chat-message-status --> ion-icon
  chat-message-status --> chat-check-mark
  chat-message --> chat-message-status
  style chat-message-status fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
