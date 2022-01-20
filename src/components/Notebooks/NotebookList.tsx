import { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { DELETE_NOTEBOOK, GET_NOTEBOOKS } from '../../queries/NotebooksQueries'
import AddNotebook from './AddNotebook'
import { NotebookInterface } from '../../interfaces/notebookInterfaces'
import { NotebookContext } from '../../Context/NotebookContext'
import { UserContext } from '../../Context/UserContext'
import NotesDrop from './NotesDrop'

const NotebookContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const ListContainer = styled.div`
  max-width: 48rem;
  width: 90%;
  margin: 0 auto;
  font-family: 'Rubik', sans-serif;
`
const ListItemContainer = styled.div`
  /* margin: 0 auto; */
  width: 100%;
  font-family: 'Rubik', sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  :hover {
    background-color: #cccccc;
    border-radius: 20px;
  }
`

const ListItem = styled.div`
  padding: 0.6rem;
  text-decoration: none;
  overflow: hidden;
  :hover {
    background-color: #a19c9c;
    border-radius: 20px;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
  color: #404040;
`
const DeleteIcon = styled.i`
  margin: 0.5rem;
  :hover {
    background-color: #e8816f;
    cursor: pointer;
  }
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

  if (loading === true) {
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
                <ListItemContainer>
                  <NotesDrop notebook_id={notebook._id} />
                  <StyledLink to={`/notebook/${notebook._id}`}>
                    <ListItem key={notebook._id}>
                      {notebook.name}
                    </ListItem>
                  </StyledLink>
                  <DeleteIcon id={notebook._id} onClick={onDeleteNotebook} className="gg-remove" />
                </ListItemContainer>

              )
            })
          }
        </ListContainer>
      </NotebookContainer>
    )
  }

}

export default Notebooks