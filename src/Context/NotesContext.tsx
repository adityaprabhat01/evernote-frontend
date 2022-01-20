import { createContext, useReducer, Dispatch } from "react";

import { NoteInterface } from '../interfaces/notesInterface'

interface UpdateNotes {
  type: 'UPDATE',
  payload: NoteInterface
}

interface FetchNotes {
  type: 'FETCH',
  payload: NoteInterface[]
}

const initState: NoteInterface[] = []

export const NotesContext = createContext<{
  state: NoteInterface[],
  dispatch: Dispatch <any>
}>({
  state: initState,
  dispatch: () => undefined
})

function notesReducer(state: NoteInterface[], action: UpdateNotes | FetchNotes) {
  switch (action.type) {
    case 'UPDATE':
      return [ ...state, {
          name: action.payload.name,
          _id: action.payload._id,
          authorId: action.payload.authorId,
          content: action.payload.content,
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

const NotesContextProvider = ({children}: any) => {

  const [state, dispatch] = useReducer(notesReducer, initState)
  const value = { state, dispatch }
  
  return (
    <NotesContext.Provider value={value} >
      { children }
    </NotesContext.Provider>
  )
}

export default NotesContextProvider