import { useState, useContext } from 'react'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'

import { ADD_NOTEBOOK } from '../../queries/NotebooksQueries'
import { NotebookContext } from '../../Context/NotebookContext'
import { UserContext } from '../../Context/UserContext'

const Button = styled.button`
  background-color: #38b638;
  color: #f5ecec;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 1em 1em;
  border: none;
  border-radius: 2rem;
  :hover {
    cursor: pointer;
    background-color: #2fa52f;
    transition: 80ms;
  }
`;

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
        <Button onClick={handleCreateNotebook}>Create Notebook</Button> :
        null
      }
      {
        toggleShowCreate === true ? 
        <form onSubmit={handleSubmitNotebook}>
          <input onChange = {(e) => setNotebookName(e.target.value)} placeholder="Enter notebook name" /><br />
          <input type="submit" value="create" />
          <input onClick={handleCreateNotebook} type="submit" value="cancel" />
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