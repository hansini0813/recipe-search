// ProfileIcon.js
import React, { useState } from 'react';
import { useUser } from './UserContext'; // Adjust the path as needed

const ProfileIcon = () => {
    const { user } = useUser(); // Get user data
    const [isOpen, setIsOpen] = useState(false); // State to track if the menu is open

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the menu open/close
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Circular Profile Icon */}
            <div 
                onClick={toggleMenu} 
                style={{
                    width: '50px', 
                    height: '50px', 
                    borderRadius: '50%', 
                    backgroundColor: '#007BFF', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    color: 'white', 
                    cursor: 'pointer',
                    margin: '10px' // Add margin for spacing
                }}>
                {user ? user.name[0] : '?'} {/* Display first letter of user's name */}
            </div>

            {/* Profile Menu */}
            {isOpen && (
                <div style={{ 
                    position: 'absolute', 
                    top: '60px', 
                    right: '10px', 
                    backgroundColor: 'white', 
                    border: '1px solid #ccc', 
                    padding: '10px', 
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                    zIndex: 1000
                }}>
                    <h4>{user ? user.name : 'Guest'}</h4>
                    <h5>Favorites</h5>
                    {/* You can list favorite items here */}
                </div>
            )}
        </div>
    );
};

export default ProfileIcon;
