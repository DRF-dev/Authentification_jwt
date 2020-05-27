import React, { useState, useEffect, FunctionComponent } from "react"
import { Container, Form, Button } from "react-bootstrap"
import axios from "axios"

const hauteurEcran = window.innerHeight
const urlAxios = "http://localhost:4000"

const Connexion : FunctionComponent<{history:any}> = ({ history }) => {
    const [pseudo, setPseudo] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const envoi = async(e:Event) => {
        if(pseudo === '' && password === '') return alert('Un des champs est vide')

        const form = { pseudo, password }
        const res = await axios.post(`${urlAxios}/users/login`, form)
        localStorage.setItem("token", res.data.token)
    }

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            history.push('/lorem')
        }
    },[])

    return(
        <Container className="d-flex justify-content-center align-items-center" 
        style={{ height: hauteurEcran}}>
            <Form onSubmit={(e:any) => envoi(e)} style={{textAlign: 'center'}}>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control type="text" value={pseudo} onChange={e => setPseudo(e.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button type="submit" variant="outline-success">Se connecter</Button>
            </Form>
        </Container>
    )
}

export default Connexion