
import React from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import {ethers} from 'ethers';
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import {Navigate } from "react-router-dom";

const {ethereum} = window;
let data = {};

  export function downloadMetamask()
  {
    window.open("https://metamask.io/download/");
  }

  //// checkIfWalletisConnected() function checks if metamask is injected in the web browser
   export const checkIfWalletisConnected = async() =>
  {
    
    try{
    if(!ethereum)
    {
      data = { 
          "code"  :  404, 
          "account"   : null
          }
        return data;
    }
    else{
      ////Checking of an ETH account exists
      return checkForAuthAccount();
    }
    
  }
    catch(error)
    {
      console.log(error);
    }
  }

  export const Middleware = async() =>
  {
    
    try{
    if(!ethereum)
    {
      <Navigate to='/'/>
    }
    else{
      ////Checking of an ETH account exists
      var isAuth = checkForAuthAccount().then((response) => {
        console.log(response.code)
              if(response.code !==200){
                window.location ='/'
              }
          })
    }
    
  }
    catch(error)
    {
      console.log(error);
    }
  }
  
export const checkForAuthAccount = async() => {
  ///Checking if an account is connected
  const ETHAccounts = await ethereum.request({method:"eth_accounts"});
      // console.log(ETHAccounts.length)
      if(ETHAccounts.length !==0)
      {
        const AuthAccount = ETHAccounts[0];
        if(ETHAccounts[0].length>0)
        {
          data = { 
            "code"  :  200, 
            "account"   :  AuthAccount
            }
        }
         else{
          data = { 
            "code"  :  405, 
            "account"   :  null
            }
         }
        return data;
      }
      else{
        data = { 
          "code"  :  405, 
          "account"   :  null
          }
        return data;
      }
}
export async function connectWallet(){
    try {
      if(!ethereum)
      {
        alert("You must install Metamask first");
        window.location = '';
        return;
      }
      const web3Modal = await getWeb3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const accounts = await provider.listAccounts();
      window.location = '';
      data = { 
          "code"  :  405, 
          "account"   :  accounts[0]
          }

    } catch (err) {
      console.log('error:', err)
    }
  }

  export async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      // network: 'mainnet',
      cacheProvider: true,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: { 
            infuraId: '00bfb7097e724cb496639fbd00f4e3d9'
          }
        },
          binancechainwallet: {
            package: true
          }
      },
    });

    return web3Modal;
  }

  export function swNot(type){
    $(".err").addClass("hidden");
    if (type === "error") {
      $(".err")
      .removeClass("hidden")
      .removeClass("success")
      .removeClass("info")
      .addClass("animated bounceIn error");
    }
    else if (type === "info") {
      $(".err")
      .removeClass("hidden")
      .removeClass("success")
      .removeClass("error")
      .removeClass("hidden").addClass("animated bounceIn info");
    }
    else if (type === "success") {
      $(".err").removeClass("hidden")
      .removeClass("hidden")
      .removeClass("error")
      .removeClass("info")
      .addClass("animated bounceIn success");
    } else {
      $(".err").addClass("hidden");
      // $(".todo-list").append(item);
    }
  }

  export function withRouter(Children){
    return(props)=>{
       const match  = {params: useParams()};
       return <Children {...props}  match = {match}/>
   }
 }

 export function TodoUpdate(){
  var currentdate = new Date(); 
  var updated_at = currentdate.getDate() + "-"
          + (currentdate.getMonth()+1)  + "-" 
          + currentdate.getFullYear() + " "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds();
  return updated_at;
 }