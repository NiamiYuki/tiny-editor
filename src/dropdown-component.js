import {template} from './template.js'
export class DropdownComponent extends HTMLElement {

  wrapper;
  select;

  inited = false;

  constructor() {
    super();
    console.log('rfrfrfrf')

    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-block';
    wrapper.style.padding = '2px';

    const select = document.createElement('select');
    select.className = 'custom-dropdown';



    select.style.padding = '5px 8px';
    select.style.borderRadius = '6px';
    select.style.border = '1px solid #888';
    select.style.fontSize = '14px';
    select.style.backgroundColor = '#f8f8f8';

    this.select = select;
    this.wrapper = wrapper;

    console.log('here we are inited')
    template.subscribe(() => this.updateOptions())
    this.updateOptions

  }

  updateOptions() {
    // template.list.forEach
    ////
  }

  connectedCallback() { 
    if (!this.inited) {
      const values = (this.getAttribute('value') || 'template 1,template 2,template 3')
      .split(',')
      .map(s => s.trim());

      values.forEach(val => {
        const option = document.createElement('option');
        option.textContent = val;
        option.value = val;
        this.select.appendChild(option);
      });

      this.wrapper.appendChild(this.select);
      this.appendChild(this.wrapper);
      this.inited = true;
    }
  }
}

customElements.define('dropdown-component', DropdownComponent);
