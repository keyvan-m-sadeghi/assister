(async () => {
  function observe(htmlTFxDefinitionElement) {
    const jsonLDElement = document.createElement('script');
    jsonLDElement.setAttribute('type', 'application/ld+json');
    document.querySelector('head').append(jsonLDElement);
    let tfxModule = './index.js';
    if (htmlTFxDefinitionElement.hasAttribute('version')) {
      const tfxVersion = htmlTFxDefinitionElement.getAttribute('version');
      tfxModule = `https://unpkg.com/@assister/tfx@${tfxVersion}/index.js`
    }
    const update = () => import(tfxModule)
      .then(({parse, watch}) => {
        watch(jsonLDElement);
        return parse(htmlTFxDefinitionElement)
      })
      .then(jsonLD => {
        jsonLDElement.textContent = JSON.stringify(jsonLD, null, 2);
        jsonLDElement.dispatchEvent(
          new CustomEvent('TFxJsonLDAdded',
            {
              detail: {
                jsonLD,
                jsonLDElement
              }
            }
          )
        )
      });
    update();
    const observer = new MutationObserver(update);
    observer.observe(htmlTFxDefinitionElement, {
      subtree: true,
      attributes: true
    });
  }

  function onDOMContentLoaded(callback) {
    window.addEventListener('DOMContentLoaded', callback);
  }

  function polyfillWebComponent() {
    onDOMContentLoaded(() => {
      for (
        const [_, tfxDefinitionElement]
        of document.querySelectorAll('tfx-definition').entries()
      ) {
        observe(tfxDefinitionElement);
      }
    });
  }

  if (!window.customElements) {
    polyfillWebComponent();
  } else {
    window.HTMLTFxDefinitionElement = class extends HTMLElement {
      constructor() {
        super();
        onDOMContentLoaded(() => observe(this));
      }
    }
    customElements.define('tfx-definition', HTMLTFxDefinitionElement);
  }
})();
