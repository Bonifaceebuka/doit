import React, { Component } from "react";
import {Navigate } from "react-router-dom";
import {
    Middleware,
  } from "../functions/functions";
import {ethers} from 'ethers';
import App from "../App";
import abi from '../../src/artifacts/contracts/Todo.sol/TodoDapp.json';
import {swNot,withRouter, TodoUpdate} from '../../src/functions/functions';
const todoAddress = "0xcAA4853961E6EFef2e2035F53593d71A5745dB47";
const {ethereum} = window;
var todoArray = [];
var updated_at = TodoUpdate()

class EditTodo extends Component {
    constructor(props) {
        super(props);
        this.state ={
            todoId:'',
            loading:'',
            title:'',
            created_at:'', 
            updated_at:'',
            priority:'', 
            data:'',
            status:'',
            description:'',
            msg:'',
            msgCode:'',
            notification:'',
            notificationButton:'',
            currentAccount:'',
            notificationBgClass:'',
            notificationCode:''
        }
        this.handleshowTodo = this.handleshowTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
          });
     }
     async handleSubmit(event){
        const { todoId, title, created_at, priority, status, description } = this.state;
        event.preventDefault();
        
        if(todoId.length == 0)
        { 
            this.setState({msg:'Todo ID is required!'});
            this.setState({msgCode:'error'});
            swNot('error');
            return false;
        }
       else if(title.length == 0)
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
        
        contract.updateTodo(this.state.todoId,this.state.title,this.state.description,this.state.priority,this.state.created_at,this.state.updated_at,this.state.status)
        .then(tx => {
            this.setState({msg:'Todo Records successfully updated on the Blockchain!'});
            this.setState({msgCode:'success'});
            swNot('success');
        })
        .catch(e => {
            if (e.code === 4001){
                this.setState({msg:'Transaction was not approved!'});
                this.setState({msgCode:'error'});
                swNot('error');
            } 
        });
    
        }

handleshowTodo = async(id) =>{
    if(ethereum !== 'undefined')
    {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(todoAddress,abi.abi,provider);
        try{
        this.setState({msg:'We are fetching the Todo details, please wait....'})
        this.setState({msgCode:'info'});
        swNot('info');
        const data =  await contract.todos(id);
        this.setState({data:data});
        this.setState({title:this.state.data.title});
        this.setState({created_at:this.state.data.created_at});
        this.setState({description:this.state.data.description});
        this.setState({priority:this.state.data.priority});
        this.setState({status:this.state.data.status});
        this.setState({todoId:id});
        if(this.state.data.length>0){
            this.setState({msgCode:'null'});
            swNot('null');
            this.setState({loading:false});
        }
        }
        catch(err){
            console.log(err)
        }
    }
    }

    componentDidMount(){
        Middleware();
        const { match } = this.props;
        this.handleshowTodo(match.params.id);
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
                this.state.loading == false ?
                this.state.data.length>0 ?
                <div>
             <form onSubmit={(e)=> this.handleSubmit(e)}>
                <p className="err text-danger text-center hidden">
                    <span className="msg"><i className="fa fa-warning"></i> {this.state.msg}</span>
                </p>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <input type="text" className="form-control" value={this.state.title} placeholder="✍️ Add title..." name="title" 
                        onChange={this.handleChange}/>
                        <input type="hidden" 
                        value={this.state.todoId} name="todoId" 
                        onChange={this.handleChange}/>
                     </div>
                </div>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <input type="date" className="form-control" value={this.state.created_at} placeholder="Add date..." name="created_at" 
                        onChange={this.handleChange}/>
                     </div>
                </div>
                <div className="add-control">
                     <div className="form-group has-feedback">
                        <select className="form-control" 
                        value={this.state.priority}
                        name="priority" onChange={this.handleChange}>
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
                        <select className="form-control" 
                        value={this.state.status}
                        name="status" onChange={this.handleChange}>
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
                    onChange={this.handleChange} name="description" defaultValue={this.state.description}></textarea>
                </div>
               <button className="submit" type="submit">
                Save Changes <i className="fa fa-plus add-btn" title="Add item"></i>
               </button>
               </form>
            </div>
            :
            'No matching Todo found on the blockchain'
                :
                'We are fetching your saved todo list, please wait.........'            
            }
           </App>
        )
    }
}

export default withRouter(EditTodo);