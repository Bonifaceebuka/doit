import React, { Component } from "react";
import {ethers} from 'ethers';
import { Link } from "react-router-dom";
import App from "../App";
import abi from '../../src/artifacts/contracts/Todo.sol/TodoDapp.json';
import {swNot} from '../../src/functions/functions';
import {Navigate } from "react-router-dom";
import {
    checkIfWalletisConnected,
  } from "../functions/functions";
const todoAddress = "0xcAA4853961E6EFef2e2035F53593d71A5745dB47";
const {ethereum} = window;
var todoArray = [];

class ListTodo extends Component {
    constructor(props) {
        super(props);
        this.state ={
            todoList:[],
            msg:'',
            data:[],
            loading:true,
            notification:'',
            notificationButton:'',
            currentAccount:'',
            notificationBgClass:'',
            notificationCode:''
        }
        this.fetchTodoList = this.fetchTodoList.bind(this);
        this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    }
handleDeleteTodo = async(id) =>{
    if(id.length == 0)
    { 
        this.setState({msg:'Todo ID is required!'});
        this.setState({msgCode:'error'});
        swNot('error');
        return false;
    }
    else{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(todoAddress,abi.abi,signer);
        this.setState({msg:'Please approve this transaction....'});
        this.setState({msgCode:'info'});
        swNot('info');
        
        contract.destroyTodo(id)
        .then(tx => {
            this.setState({msg:'Todo Records successfully deleted from the Blockchain!'});
            this.setState({msgCode:'success'});
            swNot('success');
            window.location = '';
        })
        .catch(e => {
            if (e.code === 4001){
                this.setState({msg:'Transaction was not approved!'});
                this.setState({msgCode:'error'});
                swNot('error');
            } 
        });
    }
}
fetchTodoList = async() =>{
    if(ethereum !== 'undefined')
    {
        const provider = new ethers.providers.Web3Provider(ethereum);
        
        const contract = new ethers.Contract(todoAddress,abi.abi,provider);
        try{
        this.setState({ msg:'We are fetching your saved todo list, please wait....'})
        this.setState({msgCode:'info'});
        swNot('info');
        let totalTodo =  await contract.newTodoId();
        totalTodo = totalTodo.toNumber();
        if(totalTodo>0)
        {
            for (var i = 0; i < totalTodo; i++) {
                const data =  await contract.todos(i);
                todoArray.push(data);
            }
        }
        this.setState({data:todoArray}) 
        if(this.state.data.length>0){
            this.setState({msgCode:'null'});
            swNot('null');
        }
        this.setState({loading:false});
        this.setState({msgCode:'null'});
        swNot('null');
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        alert('')
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
              alert('no met')
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
        this.fetchTodoList();
    }
    render() {
        return(
            <App>
                {
                    this.state.loading == false ?
                        this.state.notificationCode !=='200'
                        ?
                        <Navigate to='/'/>
                        :
                        ''
                    :
                    ''
                }
                <p className="paragraph">
                    <u>
                        List of Todos
                    </u></p>
                <p className="err text-danger text-center hidden">
                    <span className="msg"><i className="fa fa-warning"></i> {this.state.msg}</span>
                </p>
                <p className="no-items text-muted text-center hidden"><i className="fa fa-ban"></i></p>
                <ul className="todo-list ui-sortable">
                    {
                        
                        this.state.loading == false ?
                        this.state.data.length>0 ?
                        this.state.data.map((todoItem, index) => (
                                <li data-id={index} className="" key={index}>
                                    <div className="checkbox">
                                        <Link 
                                        to={'/edit/'+todoItem.id}
                                        >
                                            <span className="close edit" title="Edit this">
                                                <i className="fa fa-pencil"></i>
                                            </span>
                                        </Link>
                                        <Link to="#" onClick={() =>this.handleDeleteTodo(todoItem.id)}>
                                            <span className="close" title="Delete this">
                                                <i className="fa fa-times"></i>
                                            </span>
                                        </Link>
                                    <label>
                                        <span className="checkbox-mask"></span>
                                    <input type="checkbox"/>
                                    <b>{todoItem.title}</b><br/>
                                    {todoItem.description}
                                    <br/>
                                    <br/>
                                    <b>priority</b> - {todoItem.priority}
                                    <br/>
                                    <b>status</b> - {todoItem.status}
                                    <br/>
                                    <b>created</b> - {todoItem.created_at}
                                    <br/>
                                    <b>updated</b> - {todoItem.updated_at}
                                    </label>
                                    </div>
                                </li>
                          ))
                          :
                          'No Todo found on the blockchain'
                          :
                          'We are fetching your saved todo list, please wait.........'
                    }
                    </ul>

            </App>
        )
    }
}

export default ListTodo;