import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewTodo from "./components/NewTodo";
import EditTodo from "./components/EditTodo";
import ListTodo from "./components/ListTodo";
import Home from "./components/Home";
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
window.process = {};

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<App />}/> */}
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<ListTodo />} />
      <Route path="/add" element={<NewTodo />} />
      <Route path="/edit/:id" 
        element={<EditTodo/>}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
