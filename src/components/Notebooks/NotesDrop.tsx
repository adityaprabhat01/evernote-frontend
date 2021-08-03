import { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { NotebookContext } from '../../Context/NotebookContext'

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
  color: #404040;
`

const ListItem = styled.div`
  padding: 0.5rem;
  text-decoration: none;
  :hover {
    background-color: #bbbbbb;
  }
`

const NotesDrop = (props: any) => {
  const [show, setShow] = useState(false)
  const { state, dispatch } = useContext(NotebookContext)
  const { notebook_id } = props
  let notes: Array<any> = [];
  
  for(let i=0;i<state.length;i++) {
    if(state[i]._id === notebook_id) {
      notes = state[i].notes
    }
  }
  console.log(state)
  function showMore(event: any) {        
    setShow(!show)
  }
  return (
    <div>
      <button onClick={showMore}>Show more</button>
      <div>
        {
          show === true ?
          notes.map(note => {
            return (
              <ListItem>
                <StyledLink to={`/notebook/${notebook_id}/note/${note._id}`}>{ note.name }</StyledLink>
              </ListItem> 
            )
            }):
          null
        }
      </div>
      
    </div>
  )
}

export default NotesDrop