# Assister - Web Technologies for the Web of Functions

- Start Date: 2018-08-20
- Master Issue: [#2](https://github.com/assister-ai/assister/issues/2)
- RFC PR: [#4](https://github.com/assister-ai/assister/pull/4)

## Summary
[summary]: #summary

Assister is a collaborative, community driven open source platform, enabling command execution over the web. Assister consists of a new standard for the web, the **Web of Functions**, and the reference implementation of the embodying software for integrating context-aware conversational user interfaces, the **Assister Agent**.

![Assister Overview](overview.svg "Assister")

## Motivation
[motivation]: #motivation

User scenarios:

* I don't want to memorize where "Format cell as Date" is in all spreadsheet applications.
* Show me the potential customers that I marked as lead between January and February.

## Guide-level explanation
[guide-level-explanation]: #guide-level-explanation

### Web of Functions (WoF)

The **Web of Functions (WoF)** is an open source extension of the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web),
focusing on providing a means of "Function Interaction" over the web.

The web is well capable of communicating:
* Structured content, as HTML
* Structured data, representing bits and pieces of the data that the contents are made of, by decentralized standards like [JSON](https://www.json.org/) or centralized ones such as [schema.org](schema.org)
* Structured code via [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The next logical step might be **Structured Functions**.

WoF is a proposal on how to create *"universally understandable
representation of **functions**, the unit that the code is made of"*, covering both decentralized and centralized aspects and how to enable inter-application interactions between these functions.

From the old terminology, WoF to a web app is [SDK](https://en.wikipedia.org/wiki/Software_development_kit)
to a desktop app.

### The Assister Platform (TAP/Assister)

"The Assister Platform" (TAP, or simply Assister) is a collection of softwares and bodies of
standardization for a WoF, developed by "The Assister Community" (TAC).

Softwares:

* Assister Map: discovery
* intent.land: the external ontology
* Assister Agent: user interface

## Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

WoF declarations are located at the `<head>` of an [HTML file](https://www.w3schools.com/html/html_intro.asp)
within [`<meta>`](https://www.w3schools.com/tags/tag_meta.asp) tags.

### WoF URI scheme

Function related bodies of standardization can be identified by the `wof` URI scheme:

```
wof:<standard>
```

### Version

A meta tag denoting the adopted WoF version.

```html
<meta property="wof:version" version="0.0.1" />
```

### Scope

The [execution context](https://developer.mozilla.org/en-US/docs/Glossary/Scope) for the JavaScript variables in `wof` HTML attributes.

```html
<meta property="wof:scope" scope="./my-module.js" />
```

Any JavaScript that intends to use an application's WoF variables can then do:

```js
import { aFunction, aType, dispatchFunction } from './my-module.js';
```

### Type

A `type` is either a JavaScript variable defined in the scope or a string denoting a schema:

* JavaScript global objects, e.g. `Boolean`, `Number`, `String`, `Promise`, etc.
* Variables defined in the scope, e.g. `AwesomeClass`
* Types defined in [schema.org](schema.org), accessed by the "schema" URI scheme:

```js
'schema:Person'
// http://schema.org/Person

'schema:email'
// http://schema.org/email
```

#### Overload

[TODO](https://en.wikibooks.org/wiki/Computer_Programming/Function_overloading)

### State

Applications are responsible for managing their state in whatever way they see fit.
However, `undo` and `redo` are very reasonable end user expectations that WoF adheres to.

```html
<meta property="wof:apply" apply="dispatchFunction" undo="dispatchFunction('UNDO')" redo="dispatchFunction('REDO')" />
```

Where `dispatchFunction` is a variable defined in the scope.

Reference implementation for applying an action:

```js
const dispatch = dispatchFunction; // Given
const action = anAction; // Given

function apply(action) {
    if (action) {
        dispatch(action);
    }
}
```

### Intent

An `intent` is a [stateful](https://en.wikipedia.org/wiki/State_(computer_science)) semantic unit representing a function embedded in a web application. An intent `IsA` JavaScript function, accompanied by its annotations. `Intent execution` is a semantically equivalent term for a `function call`.

Examples:

```html
<meta property="wof:intent" intent="subscribe" domain="[['email', 'schema:email']]"/>
```

`subscribe` is a function defined in the scope, the intent inherits this name.

#### URI

An intent URI can be used for referencing an intent:

```
http://example.com:subscribe
```

Or calling the function of an intent:

```
http://example.com:subscribe('john.smith@example.com')
```

Or getting an Array of functions matching an overload:

```
http://example.com:['schema:email']
```

Intent attributes:
* `intent`

  The reference to the corresponding JavaScript function

* `domain` (optional)

  A JavaScript array of `parameter, type` pairs, default: []

* `range` (optional)

  Return value's "type", default: `undefined`

* `action` (optional)

  The `action` to be `applied` after execution, default: `undefined`

* `render` (optional)

  A JavaScript function that returns a card (an "html div", string) when called with the same parameters as the function. The card defaults to `https://intent.land/cards:<intent>(...params)`, `https://intent.land/cards:<domain>[0](...params)` or `https://intent.land/cards:label(<intent>)` respectively on each failure.


Reference implementation for executing an intent:

```js
const intent = aFunction; // Given
const action = anAction; // Given
const parameters = receivedParameters;  // Given

function execute(intent) {
    const result = Promise.try(() => intent(...parameters));
    result.then(() => apply(action));
    return result;
}
```

Note that `wof:apply` is called after a successful intent execution.
Promisifying the intent is a design choice adopted to unify synchronous and
asynchronous flows, also facilitates catching possible errors.
It is analogous to a common practice all the way back from [`0 and 1 exit status`](https://en.wikipedia.org/wiki/Exit_status)
to [`std::result`](https://doc.rust-lang.org/std/result/) in modern day Rust.
Resolved value from the Promise would be of the "type" denoted by "range".

#### App state vs Assistant state

TODO: unsubscribe, states: 'Any', 'subscribing', 'subscribed'


### Discovery

#### Compose

#### Command

A string in natural language representing a request for intent execution.

```html
<meta property="wof:command" keywords="['subscribe', 'follow']" intent="subscribe">
    <meta property="wof:chain" triggers="['subscribe', 'follow']" card="./subscribe-email.html" effect="changeState('taking-email')" />
    <meta property="wof:then" card="./.html" effect="changeState('taking-email')" />
</meta>
```

"wof:command" follows the Promise design principles.
A neat way to have the effect applied is to export a "changeState" function in "./types.js", as demonstrated above.

### Ontology

#### Standard intents

intent.land

#### Inter-app integrations via intents

Share

Follow

overloading: share(['schema:URL']), share(['schema:image']), share(['schema:video'])

User personalization may determines which share targets they have.

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

Previous efforts don't realize that intent === function

[Web Intents](https://www.w3.org/TR/web-intents/)

[`schema:EntryPoint`](https://schema.org/EntryPoint)

Semantic Web

Google Now

Siri, Alexa, Google Assistant

## Unresolved questions
[unresolved-questions]: #unresolved-questions

Does/would `schema.org` offer a type analogous to `undefined`? Do we need one?

Should cards be Web Components? Not until HTML import is decided? Don't forget React!

WoF state and page state are the same thing? Author decides in the function?
