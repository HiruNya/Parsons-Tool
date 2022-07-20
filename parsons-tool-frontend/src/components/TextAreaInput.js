import React, { useEffect, useState } from 'react';

const TextAreaInput = ({ spaces = 4, setCode }) => {
  const [text, setText] = useState({ value: '', caret: -1, target: null });

  useEffect(() => {
    if (text.caret >= 0) {
      text.target.setSelectionRange(text.caret + spaces, text.caret + spaces);
    }
    setCode(text.value);
  }, [setCode, spaces, text]);

  const handleTab = (e) => {
    let content = e.target.value;
    let caret = e.target.selectionStart;

    if (e.key === 'Tab') {
      e.preventDefault();

      let newText = content.substring(0, caret) + ' '.repeat(spaces) + content.substring(caret);

      setText({ value: newText, caret: caret, target: e.target });
    }
  };

  const handleText = (e) => {
    setText({ value: e.target.value, caret: -1, target: e.target });
  };

  return (
    <textarea
      className="border-2 border-solid rounded-lg p-3 w-full"
      onChange={handleText}
      onKeyDown={handleTab}
      value={text.value}
      name=""
      id=""
      cols="70"
      rows="20"
      placeholder="#Enter solution code here"
    ></textarea>
  );
};

export default TextAreaInput;
