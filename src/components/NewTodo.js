import React, { Component } from "react";
import {ethers} from 'ethers';
import App from "../App";
import abi from '../../src/artifacts/contracts/Todo.sol/TodoDapp.json';
import {swNot,TodoUpdate} from '../../src/functions/functions';
import {Navigate } from "react-router-dom";
import {
    checkIfWalletisConnected,
  } from "../functions/functions";
const todoAddress = "0xcAA4853961E6EFef2e2035F53593d71A5745dB47";
const {ethereum} = window;
var updated_at = TodoUpdate()
class NewTodo extends Component {
    constructor(props) {
        super(props);
        this.state ={
            title:'',
            created_at:'', 
            updated_at:'',
            priority:'', 
            status:'',
            description:'',
            loading:true,
            msg:'',
            msgCode:'',
            notification:'',
            notificationButton:'',
            currentAccount:'',
            notificationBgClass:'',
            notificationCode:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
 handleChange(event) {
    this.setState({
        [event.target.name] : event.target.value
      });
 }
 async handleSubmit(event){
    const { title, created_at, priority, status, description } = this.state;
    event.preventDefault();
    
    if(title.length == 0)
    { 
        this.setState({msg:'Todo title is required!'});
        this.setState({msgCode:'error'});
        swNot('error');
        return false;
    }
    
    else if(created_at.length == 0)
    {
        this.setState({msg:'Todo date is required!'});
        this.setState({msgCode:'error'});
    }
    else if(priority.length ==0)
    {
        this.setState({msg:'Todo priority is required!'});
        this.setState({msgCode:'error'});
    }
    else if(status.length ==0)
    {
        this.setState({msg:'Todo status is required!'});
        this.setState({msgCode:'error'});
    }
    else if(description.length ==0)
    {
        this.setState({msg:'Todo description is required!'});
        this.setState({msgCode:'error'});
    }
    else{
        this.setState({msg:''});
        this.setState({msgCode:'null'});
    }
 
    const ETHAccounts = await ethereum.request({method:"eth_accounts"});
    if(ETHAccounts.length ==0)
    {
        this.setState({msg:'No accounts is connected yet!'});
        this.setState({msgCode:'error'});
        swNot('error');
    }
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(todoAddress,abi.abi,signer);
    this.setState({updated_at:updated_at});
    this.setState({msg:'Please approve this transaction....'});
    this.setState({msgCode:'info'});
    swNot('info');
    const transaction = await contract.createTodo(this.state.title,this.state.description,this.state.priority,this.state.created_at,this.state.updated_at,this.state.status);

    this.setState({msg:'We are adding your Todo Records to the Blockchain, please wait....'});
    this.setState({msgCode:'info'});
    swNot('info');

    await transaction.wait();

    this.setState({msg:'Todo Records successfully added to the Blockchain!'});
    this.setState({msgCode:'success'});
    swNot('success');

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
    componentWillUnmount() {
        this.setState = (state,callback)=>{
          return;
      };
      }
    render() {
        return(
            <App>
                {
                    this.state.notificationCode !=='200'
                    && this.state.notificationCode !=='' ?
                    <Navigate to='/'/>
                    :
                    ''
                }
                <form onSubmit={(e)=> this.handleSubmit(e)}>
                <p className="err text-danger text-center hidden">
                    <span className="msg"><i className="fa fa-warning"></i> {this.state.msg}</span>
                </p>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <input type="text" className="form-control" placeholder="✍️ Add title..." name="title" 
                        onChange={this.handleChange}/>
                     </div>
                </div>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <input type="date" className="form-control" placeholder="Add date..." name="created_at" 
                        onChange={this.handleChange}/>
                     </div>
                </div>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <select className="form-control" name="priority" onChange={this.handleChange}>
                            <option value="" defaultValue>--Choose priority--</option>
                            <option value="very high">Very high</option>
                            <option value="high">High</option>
                            <option value="low">low</option>
                            <option value="very low">Very low</option>
                        </select>
                     </div>
                </div>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <select className="form-control" name="status" onChange={this.handleChange}>
                            <option value="" defaultValue>--Choose status--</option>
                            <option value="pending">Pending</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                     </div>
                </div>
                <div className="add-control">
                    <div className="form-group has-feedback"></div>
                    <textarea className="form-control" placeholder="✍️ Add description..." 
                    onChange={this.handleChange} name="description"></textarea>
                </div>
               <button className="submit" type="submit">
                Save Todo <i className="fa fa-plus add-btn" title="Add item"></i>
               </button>
               </form>
            </App>
        )
    }
}

export default NewTodo;