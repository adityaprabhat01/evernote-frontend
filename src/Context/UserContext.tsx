import { useState, createContext } from "react";

interface initStateInterface {
  id: string
}
const initState: initStateInterface = {
  id: '60ffcbe580e53cfb68cc41bf'
}
export const UserContext = createContext({
  userId: initState,
  pushUserId: (id: string) => {}
})

const UserContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState(initState);
  function pushUserId(id: string) {
    setUserId({ id: id })
  }
  const value = { userId, pushUserId }
  return (
    <UserContext.Provider value={value}>
      { children }
    </UserContext.Provider>
  )
}

export default UserContextProvider