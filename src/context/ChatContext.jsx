import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../firebase";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();

export const ChatContextProvider = ({children}) =>{
    const{currentUser} = useContext(AuthContext);
    const INISIAL_STATE = {
        chatId:"null",
        user:{}
    };
    const chatReduser = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user:action.payload,
                    chatId :  currentUser.uid > action.payload.uid 
                    ? currentUser.uid + action.payload.uid 
                    : action.payload.uid + currentUser.uid,
                };
            default:
                return state;

        }
    };
    const [state, dispatch] = useReducer(chatReduser, INISIAL_STATE);
    return(

        <ChatContext.Provider value={{data:state, dispatch}}>
            {children}
        </ChatContext.Provider>
    );
    
};