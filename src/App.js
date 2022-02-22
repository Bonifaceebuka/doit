import React, { Component} from "react";
import { NavLink } from "react-router-dom";
class App extends Component{
  render(){
    const {children} = this.props;
  return (
    <div className="container">
      <div className="today"></div>
      <div className="row">
        <div className="col-md-5 col-md-offset-4 col-xs-6 col-xs-offset-3">
        <nav id="main-navbar">
          <ul>
            <li><NavLink className={({ isActive }) => isActive ? "active" : ""} 
                to="/">Home</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "active" : ""} 
                to="/add">New</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "active" : ""} 
                to="https://github.com/Bonifaceebuka/doit_prod" target="_blank">About DoiT</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? "active" : ""} 
                to="https://github.com/bonifaceebuka" target="_blank">GitHub</NavLink></li>
          </ul>
        </nav>
          {children}
        </div>
      </div>
    </div>
  );
}
}

export default App;
