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
const ADD_NOTE_CONTENT = gql`
  mutation AddNoteContent($note_id: ID!, $name: String!, $content: String!){
    addNoteContent(note_id: $note_id, name: $name, content: $content) {
      _id,      
      name,
      content 
    }
  }
`

export { GET_NOTES, ADD_NOTE, GET_NOTE, ADD_NOTE_CONTENT }