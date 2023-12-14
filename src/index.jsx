import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { Store } from './redux/store'


import './App.css';

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Provider store={Store}>
//         <Routes>
//           <Route path="/*" element={ <App /> } />
//         </Routes>
//       </Provider>
//     </BrowserRouter>
//   </React.StrictMode>,
// );


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);