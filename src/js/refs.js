export default function getRefs() {
  return {
    searchQuery: document.querySelector('input'),
    output: document.querySelector('.output__text'),
    cardContainer: document.querySelector('.js-card-container'),
  };
}