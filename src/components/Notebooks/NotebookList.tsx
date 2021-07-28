import { useContext, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'

import { DELETE_NOTEBOOK, GET_NOTEBOOKS } from '../../queries/NotebooksQueries'
import AddNotebook from './AddNotebook'
import { NotebookInterface } from '../../interfaces/notebookInterfaces'
import { NotebookContext } from '../../Context/NotebookContext'
import { UserContext } from '../../Context/UserContext'

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
  
  if(loading === true) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
        {
          state.map((notebook: NotebookInterface) => {
            return (
              <li key={ notebook._id }>
                <Link to={`/notebook/${notebook._id}`}>{ notebook.name }</Link>
                <button id={notebook._id} onClick={onDeleteNotebook}>Delete</button>
              </li>
            )
          })
        }
        <AddNotebook />
      </div>
    )
  }
  
}

export default Notebooks