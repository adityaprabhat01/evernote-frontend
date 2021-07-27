import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { USER_DATA } from '../../queries/UserQueries'

const Homepage = () => {
  const { loading, data } = useQuery(USER_DATA, {
    variables: { _id: "60ffcbe580e53cfb68cc41bf" },
    fetchPolicy: "no-cache"
  })

  return (
    <div>
      Homepage
      {
        loading === false ?
        data.user.firstName + " " + data.user.lastName :
        null
      }
      <Link to="/notebooks">Notebooks</Link>
    </div>
  )
}

export default Homepage