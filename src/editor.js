import tinymce from 'tinymce/tinymce.js';
import 'tinymce/themes/silver/theme.js';
import 'tinymce/icons/default/icons.js';

export function initEditor() {
  tinymce.init({
    selector: '#editor',
    inline:true,
    height: 400,
    valid_elements: '*[*]',
    custom_elements: 'dropdown-component',
    extended_valid_elements: 'dropdown-component[*]',
    content_style: 'dropdown-component { all: initial; display: inline-block; }',
    noneditable_class: 'mceNonEditable',
    setup(editor) {
      editor.on('init', () => {
        const insertButton = document.getElementById('insert-button');
        if (insertButton) {
          insertButton.addEventListener('click', () => {
            const templates = JSON.parse(localStorage.getItem('templates') || '[]');
            const value = templates.join(',');
            editor.insertContent(`<dropdown-component value="${value}"></dropdown-component>`);

          });       
        }
      });
    },
  });
}  