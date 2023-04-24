import React, { createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';

const Context = createContext();

function UserProvider({ children }) {
  const { register, login, logout, authenticated } = useAuth();

  const contextValue = useMemo(() => ({ register, login, logout, authenticated }), [register, logout, authenticated]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export { Context, UserProvider };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
