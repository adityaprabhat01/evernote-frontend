import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { USER_DATA } from '../../queries/UserQueries'
import { UserContext } from '../../Context/UserContext'

const Homepage = () => {
  const { userId, pushUserId } = useContext(UserContext)
  console.log(userId)
  const { loading, data } = useQuery(USER_DATA, {
    variables: { _id: userId.id },
    fetchPolicy: "no-cache"
  })
  
  useEffect(() => {
    if(data) {
      pushUserId(data.user._id)
    }
  }, [loading, data])

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