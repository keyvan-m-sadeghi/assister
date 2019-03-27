# Assister - Terms and Functions Language and the Functional Knowledge Graph

- Start Date: 2018-08-20
- Master Issue: [#2](https://github.com/assister-ai/assister/issues/2)
- RFC PR: [#4](https://github.com/assister-ai/assister/pull/4)

## Summary
[summary]: #summary

[Assister](#the-assister-platform-tapassister) is an
[open source](https://en.wikipedia.org/wiki/Open_source),
[open platform](https://en.wikipedia.org/wiki/Open_platform) for integrating
[context-sensitive](https://en.wikipedia.org/wiki/Context-sensitive_user_interface)
[conversational user interfaces](https://en.wikipedia.org/wiki/Conversational_user_interfaces)
and [command line user interfaces](https://en.wikipedia.org/wiki/Command-line_interface)
in [application softwares](https://en.wikipedia.org/wiki/Application_software).
Assister introduces the concept of the [**Functional Knowledge Graph (FKG)**](#functional-knowledge-graph-fkg)
and standardizes a new [metalanguage](https://en.wikipedia.org/wiki/Metalanguage),
the [**Terms and Functions (TFX)** language](#terms-and-functions-language-tfx)
for creating FKGs. In addition, Assister ships with the [reference implementation](https://en.wikipedia.org/wiki/Reference_implementation)
of TFX, the [**Assister Agent**](#assister-agent),
for [web applications](https://en.wikipedia.org/wiki/Web_application).


![Assister Architecture](architecture.svg)

*Assister Architecture, references: [Request](#guide-level-explanation),
[Discovery](#discovery),
[Command](#guide-level-explanation),
[Terminology](#terminology),
[Intent](#intent),
[Execution](#execution),
[Response](#guide-level-explanation)*

## Motivation
[motivation]: #motivation

[Conversational user interfaces](https://en.wikipedia.org/wiki/Conversational_user_interfaces)
(CUIs) are a relatively new concept. Conversing with an ideal CUI would be
indistinguishable from a conversation with a real human.
[Google Duplex](https://ai.googleblog.com/2018/05/duplex-ai-system-for-natural-conversation.html)
is an example of a state-of-the-art CUI; human subjects did not grasp they
were talking to an [Artificial Intelligence](https://en.wikipedia.org/wiki/Artificial_intelligence)
in some tests.

CUIs are probably our best try yet at a [Natural User Interface](https://en.wikipedia.org/wiki/Natural_user_interface).

![KnowsMore](https://m.media-amazon.com/images/M/MV5BMjM2NjYzMzY2NV5BMl5BanBnXkFtZTgwMzI3OTYwNzM@._V1_SX1777_CR0,0,1777,744_AL_.jpg)

*[KnowsMore](https://www.imdb.com/title/tt5848272/characters/nm0876138),
an animated character in [Ralph Breaks the Internet](https://www.imdb.com/title/tt5848272/),
manifestation of an ideal CUI!
Image by [IMDB](https://www.imdb.com/title/tt5848272/mediaviewer/rm559510784)*

Despite showing promise in [lifestyle](https://en.wikipedia.org/wiki/Lifestyle_(sociology))
use cases, [virtual assistants](https://en.wikipedia.org/wiki/Virtual_assistant)
have been mostly unsuccessful in breaking new ground for [professionals](https://en.wikipedia.org/wiki/Professional).
This is partly due to the complex variables at play in a professional setting,
which are hard to comprehend without [context](https://en.wikipedia.org/wiki/Context_(language_use))
(case study: [IBM Watson in Health](https://www.computerworld.com/article/3321138/did-ibm-put-too-much-stock-in-watson-health-too-soon.html)).

Assister is an effort aimed at solving this problem over [the web](https://en.wikipedia.org/wiki/World_Wide_Web),
by provision of [a standard](#functional-knowledge-graph-fkg)
for contextual [text annotations](https://en.wikipedia.org/wiki/Text_annotation),
and [an accompanying](#assister-agent)
[browser extension](https://en.wikipedia.org/wiki/Browser_extension)
for creating CUIs that operate on these annotations.

Examples scenarios in professional applications:

* I don't want to memorize the position of `format as date` in all
spreadsheet applications.
* Show me the `potential customers` that `I` flagged as `lead` between
`January` and `February`.

## Guide-level explanation
[guide-level-explanation]: #guide-level-explanation

A [Conversational User Interface (CUI)](](https://en.wikipedia.org/wiki/Conversational_user_interfaces))
receives a `request` from the [user](https://en.wikipedia.org/wiki/User_(computing))
in form of [natural language](https://en.wikipedia.org/wiki/Natural_language)
and emits a human-understandable `response`, either as [visuals](https://en.wikipedia.org/wiki/Visual_communication)
or [simulated human voice](https://en.wikipedia.org/wiki/Speech_synthesis),
in return. All within an [operating system](https://en.wikipedia.org/wiki/Operating_system).

![Siri CUI](https://upload.wikimedia.org/wikipedia/en/5/50/Siri_on_iOS.png)

*Siri. Image by [Wikimedia](https://en.wikipedia.org/wiki/File:Siri_on_iOS.png)*

A [Command Line user Interface (CLI)](https://en.wikipedia.org/wiki/Command-line_interface)
provides an interface for receiving [`commands`](https://en.wikipedia.org/wiki/Command_(computing))
from the user and outputs the corresponding `result` after execution.

![DOS CLI](https://upload.wikimedia.org/wikipedia/commons/8/8a/COMMAND_LINE.svg)

*An MS DOS command line. Image by [Wikimedia](https://commons.wikimedia.org/wiki/File:COMMAND_LINE.svg)*

A CUI can be thought of an *extension* of a CLI if one comes to comparing the
two. CUI takes a `request`, runs a series of `commands` and outputs a
`response` based on the `results`.

Assister strives to create [a CLI](#assister-agent) for the web, and automate
the creation of CUIs over this CLI.

### Discovery
[discovery]: #discovery

A `discovery` is a any software that maps `requests` to `commands`. Following a
[batteries included philosophy](https://www.python.org/dev/peps/pep-0206/#batteries-included-philosophy),
[Assister](#the-assister-platform-tapassister) comes pre-equipped with an open
source discovery, the [Assister Map](#assister-map).
Being an [open architecture](https://en.wikipedia.org/wiki/Open_architecture)
design however, Assister accommodates swapping for another discovery, for
example with proprietary solutions like [Apple Siri](https://www.apple.com/siri/),
[Google Assistant](https://assistant.google.com/) or
[Amazon Alexa](https://developer.amazon.com/alexa).

### Assister Map
[assister-map]: #assister-map

Assister Map is discussed in detail in [its own](#todo)
[RFC](https://github.com/assister-ai/assister/blob/master/rfcs/README.md).

### Assister Agent
[assister-agent]: #assister-agent

Assister [Agent](#agent) is a browser extension for interpreting the [WoF](#web-of-functions-wof).

### Functional Knowledge Graph (FKG)
[functional-knowledge-graph-fkg]: #functional-knowledge-graph-fkg

In short, a `Functional Knowledge Graph` is an [executable](https://en.wikipedia.org/wiki/Executable)
[Ontology](https://en.wikipedia.org/wiki/Ontology_(information_science)).

### Terms and Functions Language (TFX)
[terms-and-functions-language-tfx]: #terms-and-functions-language-tfx

**Terms and Functions (TFX)** is a language for describing the terms used by
the users of an application and the relation of these terms with the code that
the application is made of. In another words, encoding the [domain-specific](https://en.wikipedia.org/wiki/Domain-specific_language)
[`terminology`](https://en.wikipedia.org/wiki/Terminology)
and its correspondence with [`execution`](https://en.wikipedia.org/wiki/Execution_(computing)).
The intersection of a terminology and its software [implementation](https://en.wikipedia.org/wiki/Implementation) 
constitutes a FKG.

More technically, TFX is a [dynamic](https://en.wikipedia.org/wiki/Dynamic_programming_language)
[metaprogramming](https://en.wikipedia.org/wiki/Metaprogramming)
[language](https://en.wikipedia.org/wiki/Programming_language).
TFX's [metasyntax](https://en.wikipedia.org/wiki/Metasyntax)
can describes the connection between the domain-specific and the programming
[object](https://en.wikipedia.org/wiki/Object_language)
languages. The FKG metasyntax is standardized by [TAC](#the-assister-platform-tapassister).

**sheet.js**

```js
import { useState } from 'react';

const types = {
    date: Date,
    number: Number,
    // etc.
};

const [currentSelection, setCurrentSelection] = useState('A1');

function format(selection, type) {
    // formats selection as type
    // e.g. selection = 'J9:K14,L9,M9,N9:O14,K17:N25'
    // e.g. type = types.date
}

export {currentSelection, setCurrentSelection, format, types};
```

[useState](https://reactjs.org/docs/hooks-state.html) is an example of state
management in [React](https://reactjs.org/).

The following TFX code exposes a `command`, `format`, for this code, addressing
the `format as date` user scenario mentioned in the [motivation section](#motivation).

```xml
<terminology uri="spreadsheet:terms/sheet">
    <term name="type">
        <case pattern="number">
        <case pattern="date">
    </term>

    <term name="cell" pattern="${'A':'Z' 0:N}"/>
    <term name="range"
        description="A ${range} is an (interval)[https://en.wikipedia.org/wiki/Interval_(mathematics)] of ${cell}s with a ${start} and an ${end}"
        more="https://www.computerhope.com/jargon/r/range.htm"
    />
        <term name="start" isa="cell"/>
        <term name="end" isa="cell"/>
        <case pattern="${start ':' end}"/>
        <case pattern="${(cell ',') ... cell}"/>
    </term>
    <term name="selection"
        pattern="${((cell ',') | (range ',')) ..* cell | range}"
    />
</terminology>

<execution uri="spreadsheet:sheet" module="./sheet.js">
    <function name="format"/>
    <function name="setCurrentSelection"/>

    <variable name="types"/>
    <variable name="currentSelection"/>
</execution>

<command name="format" pattern="format ${'' | selection} as ${type}">
    <variable name="selection" term="selection">
    <variable name="type" term="type" map="type => types[type]">
    <intent given="[selection, type]" value="format(selection, type)">
        <effect then="() => setCurrentSelection(selection)"/>
        <example command="format J9:K14,L9,M9,N9:O14,K17:N25 as date"
            given="[selection, type]"
            equals="['J9:K14,L9,M9,N9:O14,K17:N25', types['date']]"
        />
    </intent>
    <intent given="[type]" value="format(currentSelection, type)">
        <example command="format as date" given="[type]" equals="[types['date']]">
    </intent>
</command>
```

### The Assister Platform (TAP/Assister)
[the-assister-platform-tapassister]: #the-assister-platform-tapassister

**The Assister Platform (TAP)**, or simply **Assister** is a collection of softwares and
standards for FKGs, developed by [**The Assister Community (TAC)**](https://github.com/assister-ai/assister/graphs/contributors).

## Reference-level explanation
[reference-level-explanation]: #reference-level-explanation

FKG declarations are located at the `<head>` of an [HTML file](https://www.w3schools.com/html/html_intro.asp)
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

* The FKG could be modified in a web page by [DOM manipulation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents)

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

The **Web of Functions (WoF)** is an extension of the [Semantic Web](https://en.wikipedia.org/wiki/Semantic_Web),
focusing on provision of a mechanism for **Function Interaction** over the web.

The web is adequately equipped for communicating:

* Structured content

  [HTML](https://en.wikipedia.org/wiki/HTML)

* Structured data, fragments that make up the content

  Decentralized standards like [JSON](https://www.json.org/) or centralized
  ones in the Semantic Web such as [schema.org](https://schema.org)

* Structured code

  [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

The next logical step could be **Structured Functions**, fragments that make up
the code.

WoF is a proposal on how to create *"universally understandable annotations of
**functions**"*, covering both decentralized and centralized aspects, enabling
inter-application interactions between these functions.

From the old terminology, WoF to a web app is [SDK](https://en.wikipedia.org/wiki/Software_development_kit)
to a desktop app.

Previous efforts don't realize that intent === function()

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

### TODO
[todo]: #todo

* Assister Map RFC
