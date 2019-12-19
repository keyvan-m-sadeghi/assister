import {parse} from './parser';

const promiseDOMContentLoaded = new Promise(
  resolve => window.addEventListener('DOMContentLoaded', resolve)
);

export async function watch(tfxDefinitionElement) {
  const update = async () => {
    await promiseDOMContentLoaded;
    const jsonLD = await parse(tfxDefinitionElement);
    const jsonLDElement = document.createElement('script');
    jsonLDElement.setAttribute('type', 'application/ld+json');
    jsonLDElement.textContent = JSON.stringify(jsonLD, null, 2);
    document.querySelector('head').append(jsonLDElement);
    return jsonLDElement;
  };
  const observer = new MutationObserver(update);
  observer.observe(tfxDefinitionElement, {
    subtree: true,
    attributes: true
  });
  return update();
}
