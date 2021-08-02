import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLazyQuery, useMutation } from '@apollo/client'
import styled from 'styled-components'

import { GET_NOTEBOOK } from '../../queries/NotebooksQueries'
import { DELETE_NOTE } from '../../queries/NotesQueries'
import { NotesContext } from '../../Context/NotesContext'
import AddNote from './AddNote'
import Note from './Note'
import { UserContext } from '../../Context/UserContext'

const NoteContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ListContainer = styled.div`
  margin: 2rem;
  max-width: 48rem;
  width: 20%;
  font-family: 'Rubik', sans-serif;
`

const ListItem = styled.div`
  padding: 0.5rem;
  text-decoration: none;
  :hover {
    background-color: #cccccc;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
  color: #404040;
`

const NotesList = () => {
  // contain notes of a specific user
  const [id, setId] = useState('')
  const { state, dispatch } = useContext(NotesContext)
  const { userId } = useContext(UserContext)

  const [getNotebook, { loading, data }] = useLazyQuery(GET_NOTEBOOK, {
    fetchPolicy: "no-cache",
  })
  const res = useMutation(DELETE_NOTE, {
    fetchPolicy: "no-cache"
  })
  useEffect(() => {
    if(data) {
      dispatch({ type: 'FETCH', payload: data.notebook.notes })
    }
  }, [data])


  const params = useParams()
  function checkParamsAndFetch() {
    type Params = { id: string }
    type NoParams = {}
    type ParamsWithNotebook = { notebook_id: string, note_id: string }
    function isParams (params: Params | NoParams): params is Params {
      return ( params as Params ).id !== undefined
    }
    function isNotebookParams(params: ParamsWithNotebook | NoParams): params is ParamsWithNotebook {
      return ( params as ParamsWithNotebook ).notebook_id !== undefined
    }

    if(isParams(params) && id === "") {
      setId(params.id)
      getNotebook({ variables: { _id: params.id } })
    }
    
    if(isNotebookParams(params) && id === "") {
      setId(params.notebook_id)
      getNotebook({ variables: { _id: params.notebook_id } })
    }
  }

  function fetchOnDelete() {
    type NoParams = {}
    type Params = { id: string }
    type ParamsWithNotebook = { notebook_id: string, note_id: string }
    function isNotebookParams(params: ParamsWithNotebook | NoParams): params is ParamsWithNotebook {
      return ( params as ParamsWithNotebook ).notebook_id !== undefined
    }
    function isParams (params: Params | NoParams): params is Params {
      return ( params as Params ).id !== undefined
    }
    if(isParams(params)) {
      setId(params.id)
      getNotebook({ variables: { _id: params.id } })
    }
    if(isNotebookParams(params)) {
      setId(params.notebook_id)
      getNotebook({ variables: { _id: params.notebook_id } })
    }
  }

  checkParamsAndFetch()
  
  function onDeleteNote(event: any) {
    const [deleteNote, { loading, data }] = res
    deleteNote({ variables: { note_id: event.target.id, notebook_id: id, _id: userId.id } })
    fetchOnDelete()
  }
  
  if(loading === true) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
        <button>
          <Link to={"/notebooks"}> Go to Notebooks </Link>
        </button>
        <NoteContainer>
          <AddNote />
          <ListContainer>
            {
              state.map((note: any) => {            
                return (
                  <div>
                    <ListItem>
                      <StyledLink to={`/notebook/${id}/note/${note._id}`}>{ note.name }</StyledLink>
                      <button id={note._id} onClick={onDeleteNote}>Delete</button>
                    </ListItem>
                  </div>
                )
              })
            }
          </ListContainer>          
          <Note />
        </NoteContainer>
        
      </div>
      )
    }
}

export default NotesList