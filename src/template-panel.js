import { template } from './template.js';

export function initTemplatePanel() {
  const container = document.querySelector('.template-panel');
  container.innerHTML = `
    <h3>Templates</h3>
    <ul id="template-list"></ul>
    <div class="buttons">
      <button id="add">+</button>
      <button id="remove">-</button>
    </div>
    <input id="edit" placeholder="Edit template" />
  `;

  let selectedId = null;

  const list = container.querySelector('#template-list');
  const input = container.querySelector('#edit');

  function render() {
    list.innerHTML = '';
    template.list.forEach((tpl) => {
      const li = document.createElement('li');
      li.textContent = tpl.text;
      li.className = tpl.id === selectedId ? 'selected' : '';
      li.addEventListener('click', () => {
        selectedId = tpl.id;
        input.value = tpl.text;
        render();
      });
      list.appendChild(li);
    });
  }

  input.addEventListener('input', () => {
    if (selectedId !== null) {
      template.edit(selectedId, input.value);
    }
  });

  input.addEventListener('blur', () => render());
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') input.blur();
  });

  container.querySelector('#add').addEventListener('click', () => {
    template.add('template');
    const last = template.list[template.list.length - 1];
    selectedId = last.id;
    input.value = last.text;
    render();
  });

  container.querySelector('#remove').addEventListener('click', () => {
    if (selectedId !== null) {
      template.remove(selectedId);
      selectedId = null;
      input.value = '';
      render();
    }
  });

  render();
}
