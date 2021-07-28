import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_NOTE } from '../../queries/NotesQueries'
import { NotesContext } from '../../Context/NotesContext'
import { UserContext } from '../../Context/UserContext'

const AddNote = () => {
  const { state, dispatch } = useContext(NotesContext)
  const { userId } = useContext(UserContext)
  const history = useHistory()
  const [toggleShowCreate, settoggleShowCreate] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [noteName, setNoteName] = useState('')
  const [addNote, { loading, data }] = useMutation(ADD_NOTE)
  const [notebookId, setNotebookId] = useState('')

  useEffect(() => {
    if(isParams(params) || isNoteParams(params)) {
      setNotebookId(params.notebook_id)
    }
  }, [notebookId])

  type Params = { notebook_id: string }
  type NoParams = {}
  type NoteParams = { note_id: string, notebook_id: string }
  const params = useParams()
  function isParams (params: Params | NoParams): params is Params {
    return ( params as Params ).notebook_id !== undefined
  }
  function isNoteParams (params: NoteParams | NoParams): params is NoteParams {
    return ( params as NoteParams ).note_id !== undefined
  }

  const handleCreateNote = () => {
    settoggleShowCreate(!toggleShowCreate)
    setHideCreate(!hideCreate)
  }

  const handleSubmitNotebook = (event: any) => {
    event.preventDefault()
    if(noteName.length === 0) {
      alert('Enter notebook name')
    } else {      
      console.log(noteName, "+",  notebookId,"+", userId.id)
      addNote({
        variables: { 
          name: noteName,
          content: "This a sample note in html form",
          notebookId: notebookId,
          _id: userId.id
        }
      }).then((res) => {
        dispatch({ type: 'UPDATE', payload: {
          name: res.data.addNote.name,
          _id: res.data.addNote._id,
          authorId: "1235",
          content: res.data.addNote.content
        } })
        history.push(`/notebook/${notebookId}/note/${res.data.addNote._id}`)
      }).catch((err) => {
        alert('Something went wrong')
      })
      handleCreateNote()
    }
  }

  return (
    <div>
      {
        hideCreate === false ?
        <button onClick={handleCreateNote}>Create Note</button> :
        null
      }
      {
        toggleShowCreate === true ? 
        <form onSubmit={handleSubmitNotebook}>
          <input onChange = {(e) => setNoteName(e.target.value)} placeholder="Enter note name" />
          <input type="submit" value="create" />
          <input onClick={handleCreateNote} type="submit" value="cancel" />
          {
            loading === true ?
            <span>Creating Notebook...</span> :
            null
          }
        </form> :
        null
      }
    </div>
  )

}

export default AddNote