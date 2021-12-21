import './_toy-card.scss';

import BaseElement from '../../../components/BaseElement';
import { IToyCardData } from '../../../utils/alias';

class ToyCard extends BaseElement {
  title: HTMLElement;
  image: HTMLElement;
  cardDescription: HTMLElement;

  constructor(public data: IToyCardData) {
    super('div', ['toy-card']);
    this.title = new BaseElement('h2', ['toy-card__title'], data.name).render(
      this.element
    );
    this.image = new BaseElement('img', ['toy-card__img']).render(this.element);
    this.image.setAttribute('src', `public/toys/${data.num}.png`);
    this.image.setAttribute('alt', 'toy-image');

    this.cardDescription = new BaseElement('div', [
      'toy-card__description',
    ]).render(this.element);

    this.cardDescription.innerHTML = `
      <p class="toy-card__amount">Amount: <span>${data.amount}</span></p>
      <p class="toy-card__year">Year: <span>${data.year}</span></p>
      <p class="toy-card__shape">Shape: <span>${data.shape}</span></p>
      <p class="toy-card__color">Color: <span>${data.color}</span></p>
      <p class="toy-card__size">Size: <span>${data.size}</span></p>
      <p class="toy-card__favorite">Favorite: <span>${
        data.favorite ? 'Yes' : 'No'
      }</span></p>
    `;
  }
}

export default ToyCard;
