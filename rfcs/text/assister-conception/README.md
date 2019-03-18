# Assister - Web Technologies for the Web of Functions

- Start Date: 2018-08-20
- Master Issue: [#2](https://github.com/assister-ai/assister/issues/2)
- RFC PR: [#4](https://github.com/assister-ai/assister/pull/4)

## Summary
[summary]: #summary

Assister is a collaborative, community driven open source platform for enabling command execution over the web. Assister consists of a new standard for the web, the **Web of Functions**, and the embodying software for creating context-aware conversational user interfaces, the **Assister Agent**.

![Assister Overview](overview.svg "Assister")

## Motivation
[motivation]: #motivation

User scenarios:

I don't want to memorize where "Format cell as Date" is in all spreadsheet applications.
Show me the potential customers that I marked as lead between January and February.

## Guide-level explanation
[guide-level-explanation]: #guide-level-explanation

### Web of Functions (WoF)

The "Web of Functions" (WoF) is an open source extension of the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web),
focusing on providing a means for "Function Interaction" over the web.

The web is well capable of communicating:
Structured content, in form of HTML
Structured data, by decentralized standards like JSON or centralized ones such as Schema.org, representing bits and pieces of the data that the contents are made of
Structured code via JavaScript

The next logical step might be "Structured Functions" covering both decentralized and centralized aspects.
The WoF is a proposal for executing on creating "universally understandable
representation of functions that the code is made of" and enabler
technologies for inter-application interaction between these functions.

### The Assister Platform (TAP/Assister)

"The Assister Platform" (TAP, or simply Assister) is a collection of softwares and bodies of
standardization for a WoF, developed by "The Assister Community" (TAC).

Assister Map: discovery
intent.land: the external ontology
Assister Agent: user interface

## Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

### WoF protocol

Function related bodies of standardization happen within the "wof" protocol.

### Version

A meta tag denoting the adopted WoF version determined the current version of Assister.

```html
<meta property="wof:version" version="0.0.1" />
```

### Scope

The execution context for the JavaScript references in "wof" HTML attributes.

```html
<meta property="wof:scope" scope="./scope-module.js" />
```

### Type

A "type" is either a JavaScript variable defined in the scope or a string denoting a schema protocol:

JavaScript global objects, e.g. Boolean, Number, String, Promise, etc.
Variables defined in the scope, e.g. AwesomeClass
Types defined in Schema.org, accessed by the "schema" protocol:

```js
"schema:Person"
// http://schema.org/Person
"schema:Email"
// http://schema.org/Email
```

### State

The meta tag representing the current state:

```html
<meta property="wof:state" state="<string representing the current state>" />
```

In case there are more than one state meta tags, the first one is assumed to represent the current state.

### Intent

An "intent" is a [stateful](https://en.wikipedia.org/wiki/State_(computer_science)) semantic unit representing a function embedded in a web application. An intent `IsA` function. The term for calling the function is "intent execution". 

#### URI

An intent URI can be used for referencing the function of an intent:

```
http://example.com:subscribeEmail
```

Or calling the function of an intent:

```
http://example.com:subscribeEmail('john.smith@example.com')
```

Or getting an array of functions matching a domain:

```
http://example.com:['schema:email']
```

#### Signature

```js
{
    name: 'subscribeEmail',
    domain: ['schema:Email'],
    range: Promise,
    state: 'Any'
}
```

"function": The reference to the corresponding JavaScript function
"state" (optional): The state in which the function can be executed, represented by a string, defaults to the reserved state of "Any"
"domain" (optional): A JavaScript array of "types", default: []
"range" (optional): "type", default: "Promise"
"undo" (optional): Reference to the reverse intent
"card" (optional): The reference to a JavaScript function that returns a card (an "html div", string) when called with the same parameters as the function. The "html div" defaults to `https://intent.land/cards:<intent>(...params)`, `https://intent.land/cards:<domain>[0](...params)` or `https://intent.land/cards:label(<intent>)` respectively on each failure.

#### App state vs Assistant state

changeState

Examples:

```html
<meta property="wof:intent" function="subscribeEmail" domain="['schema:email']" undo="unsubscribeEmail"/>
```

TODO: unsubscribeEmail, states: 'Any', 'subscribing', 'subscribed'


## Discovery

### Compose

### Command

A string in natural language representing a request for intent execution.

### Natural Language Intent (NLI)

An "intent" with the reserved "name" of "speak", the "function" of this intent is invoked with a "command" when:
1) "intent.context" == "wof:state"

https://intent.land/social/subscribe-email.html

```html
<meta property="wof:command" keywords="['subscribe', 'follow']" intent="subscribe">
    <meta property="wof:chain" triggers="['subscribe', 'follow']" card="./subscribe-email.html" effect="changeState('taking-email')" />
    <meta property="wof:then" card="./.html" effect="changeState('taking-email')" />
</meta>
```

"wof:command" follows the Promise design principles.
A neat way to have the effect applied is to export a "changeState" function in "./types.js", as demonstrated above.

## Ontology

### Standard intents

intent.land

### Inter-app integrations via intents

Share

overloading: share(['schema:URL']), share(['schema:image']), share(['schema:video'])

User personalization determines which share targets they have.

```html
<button type="button" intent="share('./image.png')" overloads="[['schema:URL'], ['schema:image']]">Share</button>
```

Depending on the overload implemented by a target application, the parameter will be received as either an image (e.g. a photo editing app) or a URL (e.g. a social media). User's preferences could be taken into account, e.g. whether someone most likely shares on Facebook or Twitter.

### Agent

browser extension

## Drawbacks
[drawbacks]: #drawbacks

## Rationale and alternatives
[rationale-and-alternatives]: #rationale-and-alternatives

Why not just use a `<script>` tag for inter-app integrations?

Standards. Write 'share' once, integrate with all.

## Prior art
[prior-art]: #prior-art

Wikipedia links
Semantic Web
Google Now
Siri, Alexa, Google Assistant

## Unresolved questions
[unresolved-questions]: #unresolved-questions

Should cards be Web Components? Not until HTML import is decided? Don't forget React!

WoF state and page state are the same thing? Author decides in the function?
