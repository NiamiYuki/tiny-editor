import tinymce from 'tinymce/tinymce.js';
import 'tinymce/themes/silver/theme.js';
import 'tinymce/icons/default/icons.js';

export function initEditor() {
  tinymce.init({
    selector: '#editor',
    inline:true,
    valid_elements: '*[*]',
    custom_elements: 'dropdown-component',
    extended_valid_elements: 'dropdown-component[*]',
    content_style: 'dropdown-component { all: initial; display: inline-block; }',
    setup(editor) {
      editor.on('init', () => {
        const insertButton = document.getElementById('insert-button');
        if (insertButton) {
          insertButton.addEventListener('click', () => {
            editor.insertContent(`<dropdown-component ></dropdown-component>`);
          });       
        }
      });
    },
  });
}  