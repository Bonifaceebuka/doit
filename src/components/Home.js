import React, { Component} from "react";
import App from "../App";
import {Navigate } from "react-router-dom";
import Button from "../components/Buttons";
import {
  downloadMetamask,
  checkIfWalletisConnected,
  connectWallet,
} from "../functions/functions";
import "../App.css";

class Home extends Component{
  constructor(props) {
    super(props);
    this.state ={
      message:'',
      loading:'',
      notification:'',
      notificationButton:'',
      currentAccount:'',
      notificationBgClass:'',
      notificationCode:''
  }
} 

componentDidMount(){
  checkIfWalletisConnected().then((response) => {
    switch (response.code) {
      case 404:
        this.setState({notification:"You do not have Metamask app or web browser extension installed. Please click the button below to download and install one"});
        this.setState({notificationButton: "Download Metamask!"});
        this.setState({notificationCode:"404"}); /// No metamask found
        this.setState({notificationBgClass:"bgDanger"});
        break;
      case 200:
        this.setState({notification:"You are connected with : " + response.account});
        this.setState({notificationButton:""});
        this.setState({notificationCode:"200"}); /// Successfully connected
        this.setState({notificationBgClass:"bgInfo"});
        break;
      case 405:
        this.setState({notification:"You need to connect your account to continue!"});
        this.setState({notificationButton: "Connect with your wallet!"});
        this.setState({notificationCode:"405"}); /// No metamask found
        this.setState({notificationBgClass:"bgWarning"});
        break;
      // default:
      //   return response;
    }
  });
}
  render(){
  return (
    <App>
      {this.state.notification && (
          <div className={"notificationBg "+this.state.notificationBgClass}>
            <p className="notification">{this.state.notification}</p>
          </div>
        )
        }
       
        {this.state.notificationCode ==404 && (
          <Button 
          notificationButton={this.state.notificationButton}
          clickFunc={downloadMetamask}
          classToAdd='btnWarning'
          />
        )
        }
        {this.state.notificationCode ==405 && (
          <Button 
          notificationButton={this.state.notificationButton}
          clickFunc={connectWallet}
          classToAdd='btnInfo'
          />
        )
        }
        {
        this.state.notificationCode ==200 && (
          <Navigate to='list'/>
        )
        }
    </App>
  );
}
}
export default Home;
