import { gql } from '@apollo/client'

const GET_NOTES = gql`
  query GetNotes {
    notes {
      _id
      name
      content
      authorId
    }
  }
`

const ADD_NOTE = gql`
  mutation AddNote($name: String!, $content: String!, $authorId: String, $notebookId: String!) {
    addNote(name: $name, content: $content, authorId: $authorId, notebookId: $notebookId) {
      _id
      name
      content
    }
  }
`

const GET_NOTE = gql`
  query GetNote($_id: ID!) {
    note(_id: $_id) {
      _id
      name
      content
    }
  }
`

export { GET_NOTES, ADD_NOTE, GET_NOTE }