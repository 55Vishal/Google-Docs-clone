import './App.css'

import React from 'react';

export default function App() {
  const [html, setHtml] = React.useState(
    'xt ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wit'
  );

  const divRef = React.useRef();

  const createElement = (tagname, text) => {
    const node = document.createElement(tagname);
    node.innerText = text;
    return node;
  };

  const format = ({ tagname, action }: any, event) => {
    const selection = window.getSelection().toString();
    const range = window.getSelection().getRangeAt(0);

    const insertNode = (node) => {
      range.deleteContents();
      range.insertNode(node);
    };

    if (tagname) {
      insertNode(createElement(tagname, selection));
      return;
    }

    if (action === 'clear') {
      divRef.current.innerHTML = divRef.current.innerText;
    } else if (action === 'color') {
      const node = createElement('span', selection);
      node.style.color = event.target.value;
      insertNode(node);
    }
  };

  return (
    <div className='MainContainer'>
      <div className='btn-container'>
        <div className='btn'>
          <button onClick={() => format({ tagname: 'b' })}>
            <b>B</b>
          </button>
          <button onClick={() => format({ tagname: 'i' })}>
            <i>I</i>
          </button>
          <button onClick={() => format({ tagname: 'u' })}>
            <u>U</u>
          </button>
          <button onClick={() => format({ tagname: 'h1' })}>H1</button>
          <button onClick={() => format({ tagname: 'h2' })}>H2</button>
          <button onClick={() => format({ action: 'clear' })}>clear</button>
          <input
            type="color"
            onChange={(event) =>
              format(
                {
                  action: 'color',
                },
                event
              )
            }
          />
        </div>
      </div>
      <div
        className="editor"
        ref={divRef}
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        contentEditable
      ></div>
    </div>
  );
}
