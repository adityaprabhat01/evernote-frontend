import { Link } from 'react-router-dom'
import styled from 'styled-components'

import AddNote from '../Notes/AddNote'

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
  color: #404040;
`

const Button = styled.button`
  background-color: #38b638;
  color: #f5ecec;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 1em 1em;
  border: none;
  border-radius: 2rem;
  :hover {
    cursor: pointer;
    background-color: #2fa52f;
    transition: 80ms;
  }
`;

const Sidebar = () => {
  return (
    <div style={{ width: '200px' }}>
      <StyledLink to={"/notebooks"}>
        <Button>
          Go to Notebooks
        </Button>
      </StyledLink>
      <AddNote />
    </div>
  )
}

export default Sidebar