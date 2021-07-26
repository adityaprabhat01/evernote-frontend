import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { ADD_NOTE } from '../../queries/NotesQueries'
import { NotesContext } from '../../Context/NotesContext'

const AddNote = () => {
  const { state, dispatch } = useContext(NotesContext)
  const history = useHistory()
  const [toggleShowCreate, settoggleShowCreate] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [noteName, setNoteName] = useState('')
  const [creating, setCreating] = useState(false)
  const [addNote, { data }] = useMutation(ADD_NOTE)
  const [notebookId, setNotebookId] = useState('')

  useEffect(() => {
    if(isParams(params)) {
      setNotebookId(params.id)
    }
  }, [notebookId])

  type Params = { id: string }
  type NoParams = {}
  const params = useParams()
  function isParams (params: Params | NoParams): params is Params {
    return ( params as Params ).id !== undefined
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
      setCreating(true)
      addNote({
        variables: { 
          name: noteName,
          content: "This a sample note in html form",
          notebookId: notebookId
        }
      }).then((res) => {
        setCreating(false)
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
            creating === true ?
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