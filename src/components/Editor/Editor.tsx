import { useState, useEffect } from "react";
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";

import './editor.css'

var Font = Quill.import('formats/font');
Font.whitelist = ['mirza', 'roboto'];
Quill.register(Font, true);

const Editor = (props: any) => {
  const { content } = props
  const [text, setText] = useState("");  
  useEffect(() => {
      setText(content)
  }, [content])
  

  function handleChange(value: any) {
    setText(value);
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["link", "image"],
      ["clean"]
    ]
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color"
  ];
  
  return (
    <div>
      <ReactQuill
        value={text || ""}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default Editor;
