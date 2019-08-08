import {parse} from './parser.js';

class TFXDefinition extends HTMLElement {
  constructor() {
    super();
    const jsonLDElement = document.createElement('script');
	jsonLDElement.setAttribute('type', 'application/ld+json');
	document.querySelector('head').append(jsonLDElement);
	// const tfxVersion = this.getAttribute('version');
	const update = () => parse(this).then(jsonLD => {
	  jsonLDElement.innerHTML = jsonLD;
	});
	update();
    const observer = new MutationObserver(update)
	observer.observe(this, {childList: true});
  }
}

customElements.define('tfx-definitions', TFXDefinition);
