import { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DELETE_NOTEBOOK, GET_NOTEBOOKS } from '../../queries/NotebooksQueries'
import AddNotebook from './AddNotebook'
import { NotebookInterface } from '../../interfaces/notebookInterfaces'
import { NotebookContext } from '../../Context/NotebookContext'
import { UserContext } from '../../Context/UserContext'

const NotebookContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const ListContainer = styled.div`
  margin: 0 auto;
  max-width: 48rem;
  width: 90%;
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

const Notebooks = () => {  
  const { userId } = useContext(UserContext)
  const res = useMutation(DELETE_NOTEBOOK, {
    fetchPolicy: "no-cache",
    onCompleted: () => {
      fetchLazy()
    }
  })
  const [fetchLazy, { loading, data }] = useLazyQuery(GET_NOTEBOOKS, {
    fetchPolicy: "no-cache",
    variables: { _id: userId.id },
    onCompleted: () => {      
      dispatch({ type: 'FETCH', payload: data.notebooks })
    }
  })
  const { state, dispatch } = useContext(NotebookContext)
  
  useEffect(() => {
    fetchLazy()
  }, [])

  async function onDeleteNotebook(event: any) {
    const [deleteNotebook, { loading, data }] = res
    deleteNotebook({ variables: { notebook_id: event.target.id, _id: userId.id } })
  }

  function showMore(event: any) {
    const id = event.target.id
    const notebook: NotebookInterface | undefined = state.find(state => state._id === id)
    if(notebook !== undefined) {
      const { notes } = notebook
      console.log(notes)
    }
  }
  
  if(loading === true) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <NotebookContainer>
        <AddNotebook />
        <ListContainer>
        {
          state.map((notebook: NotebookInterface) => {
            return (
                <ListItem key={ notebook._id }>
                  <StyledLink to={`/notebook/${notebook._id}`}>{ notebook.name }</StyledLink>
                  <button id={notebook._id} onClick={showMore}>Show more</button>
                  <button id={notebook._id} onClick={onDeleteNotebook}>Delete</button>
                </ListItem>
            )
          })
        }
        </ListContainer> 
      </NotebookContainer>
    )
  }
  
}

export default Notebooks