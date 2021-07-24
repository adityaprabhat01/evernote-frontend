import { createContext, useReducer, Dispatch } from 'react'

import { NotebookInterface } from '../interfaces/notebookInterfaces'

interface UpdateNotebook {
  type: 'UPDATE',
  payload: NotebookInterface
}

interface FetchNotebooks {
  type: 'FETCH',
  payload: NotebookInterface[]
}

const initState: NotebookInterface[] = []

export const NotebookContext = createContext<{ 
  state: NotebookInterface[];
  dispatch: Dispatch <any>
}>({
  state: initState,
  dispatch: () => undefined
})


function notebookReducer(state: NotebookInterface[], action: UpdateNotebook | FetchNotebooks) {
  switch(action.type) {
    case 'UPDATE': 
      return [ ...state, {
          name: action.payload.name,
          _id: action.payload._id,
          notesCount: action.payload.notesCount,
          notes: action.payload.notes
        } 
      ]
    
    case 'FETCH': 
      return [
        ...(action.payload)
      ]
        
    default: 
      throw new Error(`Unhandled action type`)
    
  }
}

const NotebookContextProvider = ({children}: any) => {

  const [state, dispatch] = useReducer(notebookReducer, initState)
  const value = { state, dispatch }

  return (
    <NotebookContext.Provider value={value} >
      { children }
    </NotebookContext.Provider>
  )
}

export default NotebookContextProvider