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
  width: 100%;
  text-decoration: none;
  :hover {
    background-color: #a19c9c;
    border-radius: 20px;
  }
`
const ArrowIcon = styled.i`
  margin: 0.5rem;
  :hover {
    background-color: #b6b5b5;
    cursor: pointer;
  }
`

const NotesDrop = (props: any) => {
  const [show, setShow] = useState(false)
  const { state, dispatch } = useContext(NotebookContext)
  const { notebook_id } = props
  let notes: Array<any> = [];

  for (let i = 0; i < state.length; i++) {
    if (state[i]._id === notebook_id) {
      notes = state[i].notes
    }
  }
  function showMore(event: any) {
    setShow(!show)
  }
  return (
    <div>
      {
        show === false ?
          <ArrowIcon onClick={showMore} className="gg-arrow-down-o" /> :
          <ArrowIcon onClick={showMore} className="gg-arrow-up-o" />
      }

      <div>
        {
          show === true ?
            notes.map(note => {
              return (
                <StyledLink to={`/notebook/${notebook_id}/note/${note._id}`}>
                  <ListItem>{note.name}
                  </ListItem>
                </StyledLink>
              )
            }) :
            null
        }
      </div>

    </div>
  )
}

export default NotesDrop