# Assister - Web Technologies for the Web of Functions

- Start Date: 2018-08-20
- Master Issue: [#2](https://github.com/assister-ai/assister/issues/2)
- RFC PR: [#4](https://github.com/assister-ai/assister/pull/4)

## Summary
[summary]: #summary

![Assister Overview](overview.svg "Assister")

## Motivation
[motivation]: #motivation

## Guide-level explanation
[guide-level-explanation]: #guide-level-explanation

### Web of Functions (WoF)

The "Web of Functions" (WoF) is an open source extension of the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web)
focusing on providing a means for "Function Interaction" over the web.

The web is well capable of communicating:
Structured content, in form of HTML
Structured data, by standards such as Schema.org which represent bits and pieces of data that the contents are made of
Structured code via JavaScript

The next logical step might be "Structured Functions".
The WoF is a proposal for executing on creating "universally understandable
representation of functions that the code is made of" and enabler
technologies for interaction between these functions.

### The Assister Platform (TAP/Assister)

"The Assister Platform" (TAP, or simply Assister) is a collection of softwares and bodies of
standardization for a WoF developed by "The Assister Community" (TAC).

intent.land
Assister Agent
Assister Map

## Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

### WoF protocol

Function related bodies of standardization happen within the "wof" protocol.

### State

A singular meta tag representing the current state:

```html
<meta property="wof:state" content="<string representing the current state>" />
```

In case there are more than one state meta tags, the first one is assumed to represent the current state.

### Intent

An "intent" is a semantic unit representing a function embedded in a web application.
"function": The reference to the corresponding JavaScript function
"state" (optional): The state in which the function can be executed, represented by a string, defaults to the reserved state of "any"
"domain" (optional): A JavaScript array of "types", default: []
"range" (optional): A "type", default: "Promise"
"intent" (optional): Identifier for this intent, string, also used for the default card
"card" (optional): The reference to a JavaScript function that returns a card (an html div, string) when invoked with the arguments of the function. The card defaults to `https://intent.land/cards:<intent>`, `https://intent.land/cards:<domain>` or `https://intent.land/cards:empty(<intent>)` respectively if each fail.

#### Responsibilities of a Function

changeState
render UI
return card

Examples:

```html
<meta property="wof:intent" intent="Subscribe" domain="['schema:email']" function="onEmailSubscribe"/>
```

### Type

Type annotations that can be adopted in domain and range of an intent.

JavaScript global objects, e.g. Number, String, etc.
Identifiers to be imported from the "wof:types" meta tag:

```html
<meta property="wof:types" content="./my-types.js" />
```

Public domain data types schema.org, accessed by the "schema" protocol:
```js
"schema:Person"
// http://schema.org/Person
"schema:Email
// http://schema.org/Email
```

### Command

A string in natural language representing a request for intent execution.

### Natural Language Intent (NLI)

An "intent" with the reserved "name" of "speak", the "function" of this intent is invoked with a "command" when:
1) "intent.context" == "wof:state"

https://intent.land/social/subscribe-email.html

```html
<meta property="wof:command" triggers="['subscribe', 'follow']" intent="Subscribe">
    <meta property="wof:chain" triggers="['subscribe', 'follow']" card="./subscribe-email.html" effect="changeState('taking-email')">
    <meta property="wof:then" card="./.html" effect="changeState('taking-email')" />
</meta>
```

"wof:command" follows the Promise design principles.
A neat way to have the effect applied is to export a "changeState" function in "./types.js", as demonstrated above.

## Drawbacks
[drawbacks]: #drawbacks

## Rationale and alternatives
[rationale-and-alternatives]: #rationale-and-alternatives

## Prior art
[prior-art]: #prior-art

## Unresolved questions
[unresolved-questions]: #unresolved-questions
