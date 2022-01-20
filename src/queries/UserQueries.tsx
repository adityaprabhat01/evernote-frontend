import { gql } from '@apollo/client'

const USER_DATA = gql`
  query UserData($_id: ID!) {
    user(_id: $_id) {
      _id
      firstName
      lastName
      email
    }
  }
`

export { USER_DATA }