import {template} from './template.js'
export class DropdownComponent extends HTMLElement {

  wrapper;
  select;

  inited = false;

  constructor() {
    super();

    const wrapper = document.createElement('div');
    wrapper.className = 'wrapper';

    const select = document.createElement('select');
    select.className = 'custom-dropdown';

    this.select = select;
    this.wrapper = wrapper;

    template.subscribe(() => this.updateOptions());
    this.updateOptions();
  }

  updateOptions() {
    const selectedValue = +this.select.value;
    this.select.innerHTML = '';

    const list = template.list;
    list.forEach((tpl) => {
      const option = document.createElement('option');
      option.value = tpl.id;
      option.textContent = tpl.text;
      this.select.appendChild(option);
    });

    const errorOption = document.createElement('option');
    errorOption.value = 'error';
    errorOption.textContent = 'ERROR';
    errorOption.hidden = true;
    this.select.appendChild(errorOption);

    const values = list.map(tpl => tpl.id);
    if (selectedValue && values.includes(selectedValue)) {
      this.select.value = selectedValue;
    } else if (selectedValue && !values.includes(selectedValue)) {
      this.select.value = 'error';
    } else if (!selectedValue && list.length > 0) {
      this.select.value = list[0].id;
    } else {
      this.select.value = 'error';
    }
  }

  connectedCallback() {
    if (!this.inited) {
      this.wrapper.appendChild(this.select);
      this.appendChild(this.wrapper);
      this.inited = true;
    }
  }
}

customElements.define('dropdown-component', DropdownComponent);