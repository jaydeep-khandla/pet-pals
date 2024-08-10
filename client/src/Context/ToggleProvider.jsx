import { createContext, useState } from "react";

const ToggleContext = createContext({});

const initialState = {
    'profile': false,
};

export const ToggleProvider = ({ children }) => {

  const [toggleClicked, setToggleClicked] = useState(initialState);

  const handleToggleClick = (clicked) => setToggleClicked((prevState) => ({ ...prevState, [clicked]: !prevState[clicked] }));

  return (
    <ToggleContext.Provider value={{ toggleClicked, setToggleClicked, handleToggleClick }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
