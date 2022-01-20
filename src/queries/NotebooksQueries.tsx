import { gql } from '@apollo/client'

const GET_NOTEBOOKS = gql`
  query GetNotebooks($_id: ID!) {
    notebooks(_id: $_id) {
      _id
      name
      notes {
        _id
        name
      }
    }
  }
`

const GET_NOTEBOOK = gql`
  query GetNotebook($_id: ID!) {
    notebook(_id: $_id) {
      _id
      name
      notes {
        name
        _id
        content
      }
    }
  }
`

const ADD_NOTEBOOK = gql`
  mutation AddNotebook($name: String!, $_id: ID!) {
    addNotebook(name: $name, _id: $_id) {
      _id
      name
      notes {
        _id
      }
    }
  }
`

const DELETE_NOTEBOOK = gql`
  mutation DeleteNotebook($notebook_id: ID!, $_id: ID!) {
    deleteNotebook(notebook_id: $notebook_id, _id: $_id) {
      name
    }
  }
`

export { GET_NOTEBOOKS, GET_NOTEBOOK, ADD_NOTEBOOK, DELETE_NOTEBOOK }