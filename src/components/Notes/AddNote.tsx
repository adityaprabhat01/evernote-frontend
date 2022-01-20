import { useState, useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

import { ADD_NOTE } from '../../queries/NotesQueries'
import { NotesContext } from '../../Context/NotesContext'
import { UserContext } from '../../Context/UserContext'

const Button = styled.button<{ fontWeight: string, padValue: string }>`
  background-color: #38b638;
  color: #f5ecec;
  font-size: 1em;
  font-weight: ${ props => props.fontWeight || 600 };
  margin: 1em;
  padding: ${ props => props.padValue };
  border: none;
  border-radius: 2rem;
  :hover {
    cursor: pointer;
    background-color: #2fa52f;
    transition: 80ms;
  }
`;

const Input = styled.input`
  border-radius: 20px;
  padding: 0.5rem;
  margin: 1em 1em 0 1em;
  font-size: 1rem;
  border: 1px solid #dddbdb;
  max-width: 160px;
`

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
        <Button fontWeight="600" padValue="1em" onClick={handleCreateNote}>Create Note</Button> :
        null
      }
      {
        toggleShowCreate === true ? 
        <form>
          <Input onChange = {(e) => setNoteName(e.target.value)} placeholder="Enter note name" /> <br />
          <Button fontWeight='200' padValue="0.5em" onClick={handleSubmitNotebook}>Create</Button>
          <Button fontWeight='200' padValue="0.5em" onClick={handleCreateNote}>Cancel</Button>
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