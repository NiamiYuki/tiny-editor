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

  let selectedIndex = null;

  const list = container.querySelector('#template-list');
  const input = container.querySelector('#edit');

  function getTemplates() {
    return JSON.parse(localStorage.getItem('templates') || '["template 1", "template 2", "template 3"]');
  }

  function saveTemplates(templates) {
    localStorage.setItem('templates', JSON.stringify(templates));
    window.dispatchEvent(new Event('templates-changed'));
  }

  function render() {
    const templates = getTemplates();
    list.innerHTML = '';
    templates.forEach((tpl, idx) => {
      const li = document.createElement('li');
      li.textContent = tpl;
      li.className = idx === selectedIndex ? 'selected' : '';
      li.addEventListener('click', () => {
        selectedIndex = idx;
        input.value = tpl;
        render();
      });
      list.appendChild(li);
    });
  }

  input.addEventListener('input', () => {
    const templates = getTemplates();
    if (selectedIndex !== null) {
      templates[selectedIndex] = input.value;
      saveTemplates(templates);
      render();
    }
  });

  input.addEventListener('blur', () => render());
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') input.blur();
  });

  container.querySelector('#add').addEventListener('click', () => {
    const templates = getTemplates();
    templates.push('template');
    saveTemplates(templates);
    selectedIndex = templates.length - 1;
    input.value = templates[selectedIndex];
    render();
  });

  container.querySelector('#remove').addEventListener('click', () => {
    let templates = getTemplates();
    if (selectedIndex !== null) {
      templates.splice(selectedIndex, 1);
      saveTemplates(templates);
      selectedIndex = null;
      input.value = '';
      render();
    }
  });

  render();
}