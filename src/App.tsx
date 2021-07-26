import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Homepage from './components/Homepage/Homepage';
import Editor from './components/Editor/Editor';
import NotebookList from './components/Notebooks/NotebookList'
import Notebook from './components/Notebooks/Notebook'
import NotebookContextProvider from './Context/NotebookContext'
import NotesContextProvider from './Context/NotesContext'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <NotebookContextProvider>
            <NotesContextProvider>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/editor" component={Editor} />
              <Route exact path={["/notebook/:id", "/notebook/:notebook_id/note/:note_id"]} component={Notebook} />
              <Route exact path="/notebooks" component={NotebookList} />
            </NotesContextProvider>
          </NotebookContextProvider>
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;