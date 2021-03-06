import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

import { ADD_NOTEBOOK } from '../../queries/NotebooksQueries'
import { NotebookContext } from '../../Context/NotebookContext'
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

const AddNotebook = () => {
  const { state, dispatch } = useContext(NotebookContext)
  const { userId } = useContext(UserContext)
  const [toggleShowCreate, settoggleShowCreate] = useState(false)
  const [hideCreate, setHideCreate] = useState(false)
  const [noteBookName, setNotebookName] = useState('')
  const [creating, setCreating] = useState(false)
  const [addNotebook, { data }] = useMutation(ADD_NOTEBOOK)

  const handleCreateNotebook = () => {
    settoggleShowCreate(!toggleShowCreate)
    setHideCreate(!hideCreate)
  }

  const handleSubmitNotebook = (event: any) => {
    event.preventDefault()
    if(noteBookName.length === 0) {
      alert('Enter notebook name')
    } else {
      setCreating(true)
      addNotebook({
        variables: { 
          name: noteBookName,
          _id: userId.id
        }
      }).then((res) => {
        setCreating(false)
        dispatch({ type: 'UPDATE', payload: {
          name: res.data.addNotebook.name,
          _id: res.data.addNotebook._id,
          notesCount: res.data.addNotebook.notesCount,
          notes: res.data.addNotebook.notes
        } })
      }).catch((err) => {
        alert('Something went wrong')
      })
      handleCreateNotebook()
    }
  }

  return (
    <div>
      {
        hideCreate === false ?
        <Button fontWeight="600" padValue="1em" onClick={handleCreateNotebook}>Create Notebook</Button> :
        null
      }
      {
        toggleShowCreate === true ? 
        <form onSubmit={handleSubmitNotebook}>
          <Input onChange = {(e) => setNotebookName(e.target.value)} placeholder="Enter notebook name" /> <br />
          <Button fontWeight='200' padValue="0.5em" onClick={handleSubmitNotebook}>Create</Button>
          <Button fontWeight='200' padValue="0.5em" onClick={handleCreateNotebook}>Cancel</Button>
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

export default AddNotebook