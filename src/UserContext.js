// Import necessary hooks from React
import React, { createContext, useContext, useState } from 'react';

// Create a UserContext using createContext
const UserContext = createContext();

// UserProvider component to wrap the application and provide user state
export const UserProvider = ({ children }) => {
    // Define a state variable 'user' and a function 'setUser' to update it
    const [user, setUser] = useState(null); // Initially, there is no user (null)

    return (
        // Provide the user state and setUser function to all components within UserProvider
        <UserContext.Provider value={{ user, setUser }}>
            {children} {/* Render child components */}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext in other components
export const useUser = () => useContext(UserContext); // This allows components to access user state easily
