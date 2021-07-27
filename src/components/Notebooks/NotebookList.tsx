import { useContext, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

import { GET_NOTEBOOKS } from '../../queries/NotebooksQueries'
import AddNotebook from './AddNotebook'
import { NotebookInterface } from '../../interfaces/notebookInterfaces'
import { NotebookContext } from '../../Context/NotebookContext'

const Notebooks = () => {  
  const { data, loading } = useQuery(GET_NOTEBOOKS, {
    fetchPolicy: "no-cache"
  })
  const { state, dispatch } = useContext(NotebookContext)

  useEffect(() => {
    if(data) {
      dispatch({ type: 'FETCH', payload: data.notebooks })
    }
  }, [data])
  
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