import { BrowserRouter, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

import Homepage from './components/Homepage/Homepage';
import Editor from './components/Editor/Editor';
import NotebookList from './components/Notebooks/NotebookList'
import Notebook from './components/Notebooks/Notebook'
import NotebookContextProvider from './Context/NotebookContext'
import NotesContextProvider from './Context/NotesContext'
import UserContextProvider from './Context/UserContext';

const client = new ApolloClient({
  uri: "https://note-app-backend-21.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <UserContextProvider>
            <NotebookContextProvider>
              <NotesContextProvider>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/editor" component={Editor} />
                <Route exact path={["/notebook/:notebook_id", "/notebook/:notebook_id/note/:note_id"]} component={Notebook} />
                <Route exact path="/notebooks" component={NotebookList} />
              </NotesContextProvider>
            </NotebookContextProvider>
          </UserContextProvider>  
        </BrowserRouter>
      </ApolloProvider>
    </>
  );
}

export default App;