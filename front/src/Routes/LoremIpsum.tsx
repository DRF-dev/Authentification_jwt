import React,{ useEffect, FunctionComponent } from "react"
import { decode } from "jwt-simple"

const Lorem: FunctionComponent<{ history:any }> = ({ history }) => {

    useEffect(()=>{
        if (!localStorage.getItem("token")) {
            return history.push('/')
        }
    },[])

    const name = ()=>{
        const token = localStorage.getItem("token")
        if(token === null) return
        const infoToken = decode(token, "SECRET_AU_HASARD_123")
        return infoToken.sub
    }

    return(
        <h1>{name()}</h1>
    )
}

export default Lorem