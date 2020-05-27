import React, { useEffect, useState } from "react"
import { Navbar, Nav, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"
import { decode } from "jwt-simple"

const BarreDeNavigation = () => {
    const [store, setStore] = useState<string|null>(null)
    const token:string|null = localStorage.getItem("token")
    const [pseudo, setPseudo] = useState<string>('')

    useEffect(()=>{
        setStore(token)

        if(token === null) return
        const infoToken = decode(token, "SECRET_AU_HASARD_123")
        setPseudo(infoToken.sub) 
    },[])

    //Partie Connecté
    const seDeconnecter = ()=>{
        localStorage.removeItem("token")
    }
    const Connecter = () => {
        return(
            <Navbar bg="dark" variant="dark" id="navbar">
                <Navbar.Brand>Bienvenue {pseudo}</Navbar.Brand>
                <Nav>
                    <Form onSubmit={() => seDeconnecter()}>
                        <Button type="submit" variant="dark">Déconnexion</Button>
                    </Form>
                </Nav>
            </Navbar>
        )
    }

    //Partie Déconnecté
    const NonConnecter = () => {
        return(
            <Navbar bg="dark" variant="dark" id="navbar">
                <Navbar.Brand>Authentification</Navbar.Brand>
                <Nav>
                    <Link to="/" className="nav-item nav-link">Inscription</Link>
                    <Link to="/connexion" className="nav-item nav-link">Connexion</Link>
                </Nav>
            </Navbar>
        )
    }

    //En renvoi selon l'état
    if(store === null) return <NonConnecter />
    return <Connecter />
}

export default BarreDeNavigation