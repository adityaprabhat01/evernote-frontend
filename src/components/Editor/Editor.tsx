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
  let note = props.data
  if(note === null) {
    note = ""
  }
  
  const { name, content, _id } = note
  const [text, setText] = useState("");

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
    <div>
      <p>{ name }</p>
      {
        loading === true ?
        <p>Updating</p> :
        <p>Up to date</p>
      } 
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
