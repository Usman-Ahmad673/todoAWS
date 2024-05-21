import React, { useRef, useState } from 'react';
import './App.css'
import TodoForm from './Components/TodoForm';
import { Route, Routes } from 'react-router-dom';
import SignupPage from './Components/SignupPage';
import LoginPage from './Components/LoginPage';

function App() {
  const myRef = useRef(null);

  return (
    <React.Fragment>
        <div className="app">
          <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/todo-list" element={<TodoForm />} />
            </Routes>
        </div>
      
    </React.Fragment>
  );
}

export default App;

// import React, { useState, useRef } from 'react';
// import './App.css'
// import TodoForm from './Components/TodoForm';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// function App() {

//   return (
//     <Router>
//       <div className="app">
//       <h1>Todo App</h1>
//         <Routes>
//           <Route path="/" exact element={<TodoForm />} />
//           {/* <Route path="/about" component={About} />
//           <Route path="/contact" component={Contact} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
