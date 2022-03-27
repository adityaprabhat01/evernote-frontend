import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client'
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";

import './editor.css'
import { ADD_NOTE_CONTENT } from '../../queries/NotesQueries'
import { debounce } from "../../utils";

var Font = Quill.import('formats/font');
Font.whitelist = ['mirza', 'roboto'];
Quill.register(Font, true);

const Editor = (props: any) => {
  let note = props.data, timerId
  if(note === null) {
    note = ""
  }

  
  const { name, content, _id } = note
  const [text, setText] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    setText(content)
  }, [content])

  
  
  const [updateNote, { loading, data }] = useMutation(ADD_NOTE_CONTENT, {
    fetchPolicy: "no-cache",
  })

  function handleChange(value: any) {    
    setText(value);
  }
  const addText = () => {
    updateNote({
      variables: {
        note_id: _id,
        name: name,
        content: text
      }
    })
    setShowSpinner(true)
  }

  useEffect(() => {
    if(note !== ""){
      debounce<typeof addText>(addText, 400)()
    }
  }, [text])

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
    <div style={{ marginTop: "5px" }}>
      <div>
        <span style={{ fontWeight: 800, fontSize: "2rem", fontFamily: "rubik" }}>{ name }</span>
        {
          loading === true ?
          <div className="spinner-border" style={{ marginLeft: "80px" }}></div>:
          <span style={{ marginLeft: "80px" }}>Up to date</span>
        } 
      </div>
      <div style={{ marginTop: "10px", marginRight: "20px" }}>
        <ReactQuill
          value={text || ""}
          onChange={handleChange}
          modules={modules}
          formats={formats}
        />
      </div>
    </div>
  );
};

export default Editor;
