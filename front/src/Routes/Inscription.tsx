import React, { useState, useEffect, FunctionComponent } from "react"
import { Container, Form, Button } from "react-bootstrap"
import axios from "axios"
import { Notyf } from "notyf"

const hauteurEcran = window.innerHeight
const urlAxios = "http://localhost:4000"

const Inscription: FunctionComponent<{history:any}> = ({ history }) => {
    const [pseudo, setPseudo] = useState<string>('')
    const [mail, setMail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            history.push('/lorem')
        }
    },[])

    const envoi = async (e:Event) => {
        e.preventDefault()
        if(password !== confirm || pseudo === '' || mail === '' || password === ''){
            return alert('Mot de passe différents ou paramètre vide !')
        }
        const form = {pseudo, mail, password}
        axios.post(`${urlAxios}/users/create`, form)
        .then(res => {
            const notyf = new Notyf({
                duration: 3000,
                position: {
                    x: 'right',
                    y: 'bottom',
                }
            });
            notyf.success(res.data.message);
            setPseudo('')
            setMail('')
            setPassword('')
            setConfirm('')
        })
        .catch(err => {
            if(err) console.log(err)
            const notyf = new Notyf({
                duration: 3000,
                position: {
                    x: 'right',
                    y: 'bottom',
                }
            });
            notyf.error('Echec de la sauvegarde');
        })
    }
    
    return(
        <Container className="d-flex justify-content-center align-items-center" 
        style={{ height: hauteurEcran}}
        id="inscription">
            <Form onSubmit={(e:any) => envoi(e)} style={{textAlign: 'center'}}>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Pseudo</Form.Label>
                    <Form.Control type="text" value={pseudo} onChange={e => setPseudo(e.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control type="text" value={mail} onChange={e => setMail(e.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group className="d-flex flex-column align-items-center mb-4">
                    <Form.Label>Confirmer mot de passe</Form.Label>
                    <Form.Control type="password" value={confirm} onChange={e => setConfirm(e.target.value)}/>
                </Form.Group>
                <Button type="submit" variant="outline-success">S'inscrire</Button>
            </Form>
        </Container>
    )
}

export default Inscription