import React, { useContext, useReducer } from 'react';
import reducer from './reducer';

const GlobalContext = React.createContext()

const initialState = {
  profileEditView: true,
};

// This context provider is passed to any component requiring the context
// children is key word
const GlobalContextProvider = ({ children }) => {
  // use reducer for dispatch
  const [state, dispatch] = useReducer(reducer, initialState)


  const toggleProfileEdit = () => {
    // console.log('editgtx');
    dispatch({ type: 'PROFILE_EDIT' })
  }
  const toggleProfileView = () => {
    // console.log('viewgtx');
    dispatch({ type: 'PROFILE_VIEW' })
  }

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        
        toggleProfileEdit,
        toggleProfileView,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(GlobalContext)
}

export { GlobalContext, GlobalContextProvider }