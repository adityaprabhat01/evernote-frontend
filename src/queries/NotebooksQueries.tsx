import { gql } from '@apollo/client'

const GET_NOTEBOOKS = gql`
  query GetNotebooks {
    notebooks {
      _id
      name
      notesCount
      notes {
        _id
      }
    }
  }
`

const GET_NOTEBOOK = gql`
  query GetNotebook($_id: ID!) {
    notebook(_id: $_id) {
      _id
      name
      notesCount
      notes {
        name
        _id
        content
      }
    }
  }
`

const ADD_NOTEBOOK = gql`
  mutation AddNotebook($name: String!) {
    addNotebook(name: $name) {
      _id
      name
      notesCount
      notes {
        _id
      }
    }
  }
`

export { GET_NOTEBOOKS, GET_NOTEBOOK, ADD_NOTEBOOK }