import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { useParams, useLocation } from 'react-router-dom'

import Editor from '../Editor/Editor'
import { GET_NOTE } from '../../queries/NotesQueries'

// display content of a note
const Note = () => {  
  let content = "";
  const location= useLocation()
  const [noteId, setNoteId] = useState('')
  const [getNote, { loading, data }] = useLazyQuery(GET_NOTE, {
    fetchPolicy: "no-cache",
  });
  if(loading === false && data !== undefined && noteId !== "") {
    content = data.note.content
  }
  useEffect(() => {
    setNoteId("")
  }, [location.pathname])
  
  type Params = { note_id: string, notebook_id: string }
  type NoParams = {}
  type NotebookParams = { id: string }
  const params = useParams()
  function isParams (params: Params | NoParams): params is Params {
    return ( params as Params ).note_id !== undefined
  }
  function isNotebookOnly(params: NotebookParams | NoParams): params is NotebookParams {
    return ( params as NotebookParams ).id !== undefined
  }
  if(isParams(params) && noteId === "") {
    setNoteId(params.note_id)
    getNote({ variables: { _id: params.note_id } })
  }
  if(isNotebookOnly(params) && noteId !== "") {
    setNoteId("")
    content = ""
  }
  return (
    <div>
      {
        <Editor content={content} />
      }
    </div>
  )
}

export default Note