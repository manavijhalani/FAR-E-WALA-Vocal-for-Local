import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import 'firebase/compat/database';
import './sidebar.css'; // Import the CSS file for styling

const firebaseConfig = {
  apiKey: "AIzaSyDM-SSjSjDzaYDBn1x1PJR0oi4Q5e_Dcnc",
  authDomain: "farewala-569aa.firebaseapp.com",
  projectId: "farewala-569aa",
  storageBucket: "farewala-569aa.appspot.com",
  messagingSenderId: "499790925683",
  appId: "1:499790925683:web:12da0e00ad9b9c8b87bf06",
  measurementId: "G-YRKVP16HML"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);
const usersRef = ref(db, 'users'); // Assuming 'users' is a valid database path

const Sidebar = ({ children }) => {
  const [userArray, setUserArray] = useState([]);

  useEffect(() => {
    // Listen for changes at the 'users' reference
    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === 'object') {
        // Convert data object to array of users
        const users = Object.entries(data).map(([userId, userData]) => ({
          id: userId,
          ...userData
        }));

        // Filter users where value is "true"
        const filteredUsers = users.filter(user => user.value === "true");
        
        // Update state with filtered user array
        setUserArray(filteredUsers);
      }
    });

    // Clean up by unsubscribing when the component unmounts
    return () => {
      unsubscribe(); // Detach the listener
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        {children}
        <h2>Vendors near you:</h2>
        {userArray.map((user, index) => (
          <div key={user.id} className="vendor-card">
            <h3>{user.name} {user.surname}</h3>
            <p>Phone: {user.phone}</p>
            <h4>Products:</h4>
            {user.products ? (
              <ul>
                {Object.keys(user.products).map((productId) => (
                  <li key={productId}>
                    <strong>Details:</strong> {user.products[productId].details}<br />
                    <strong>Product Type:</strong> {user.products[productId].productType}<br />
                    <strong>Quantity:</strong> {user.products[productId].quantity}<br />
                  </li>
                ))}
              </ul>
            ) : (
              <span>No products listed</span>
            )}
            <button>Add to favourites</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
