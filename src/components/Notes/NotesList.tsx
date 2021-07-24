import { useState, useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'

import { GET_NOTEBOOK } from '../../queries/NotebooksQueries'
import { NotesContext } from '../../Context/NotesContext'
import AddNote from './AddNote'
import Note from './Note'

const NotesList = () => {
  // contain notes of a specific user

  const [id, setId] = useState('')
  const { state, dispatch } = useContext(NotesContext)

  const [getNotebook, { loading, data }] = useLazyQuery(GET_NOTEBOOK, {
    fetchPolicy: "no-cache",
  })
  
  useEffect(() => {
    if(data) {
      dispatch({ type: 'FETCH', payload: data.notebook.notes })
    }
  }, [data])
  
  type Params = { id: string }
  type NoParams = {}
  const params = useParams()
  function isParams (params: Params | NoParams): params is Params {
    return ( params as Params ).id !== undefined
  }

  if(isParams(params) && id === "") {
    setId(params.id)
    getNotebook({ variables: { _id: params.id } })
  }
  

  if(loading === true) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <div>
        {
          state.map((note: any) => {            
            return (
              <div>
                <li>
                  <Link to={`/notebook/${id}/note/${note._id}`}>{ note.name }</Link>
                </li>
              </div>
            )
          })
        }
        <AddNote />
        <Note />
      </div>
      )
    }
}

export default NotesList