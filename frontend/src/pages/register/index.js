import React, {useState} from "react";
import api from '../../services/api';
import {Form, Button, FormGroup, Input, Label, Container, Alert} from 'reactstrap';
import { useNavigate } from "react-router-dom";

export default function Register(){
    
    const history = useNavigate();
    const [ firstName, setFirstname ] = useState('')
    const [ lastName, setLastname ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault();
        
        const response = await api.post('/user/register', {firstName, lastName, email, password})

        const user_id = response.data._id || false;

        try{

            if(user_id){
                history('/login');
            }
            else{
                const { message } = response.data
                setError(true)
                setErrorMessage(message)
                setTimeout(()=>{
                    setError(false)
                }, 2000)
            }
        }
        catch(error){

        }

    }   
    
    return(
        <Container>
            <h2>REGISTER</h2>
            <p>Please <strong>create</strong> a new account.</p>
            <Form onSubmit={ handleSubmit }>
                <FormGroup floating>
                <Input
                    id="firstname"
                    name="firstname"
                    placeholder="firstname"
                    type="text"
                    onChange={ evt => setFirstname(evt.target.value) }
                />
                <Label for="firstname">
                    Firstname
                </Label>
                </FormGroup>

                <FormGroup floating>
                <Input
                    id="lastname"
                    name="lastname"
                    placeholder="lastname"
                    type="text"
                    onChange={ evt => setLastname(evt.target.value) }
                />
                <Label for="lastname">
                    Lastname
                </Label>
                </FormGroup>

                <FormGroup floating>
                <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={ evt => setEmail(evt.target.value) }
                />
                <Label for="email">
                    Email
                </Label>
                </FormGroup>

                <FormGroup floating>
                <Input
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={ evt => setPassword(evt.target.value) }
                />
                <Label for="password">
                    Password
                </Label>
                </FormGroup>

                <FormGroup>                
                    <Button className="submit-btn">
                        Submit
                    </Button>
                </FormGroup>
                <FormGroup>                
                    <Button className="secondary-btn" onClick={() => history('/login')}>
                        Sign In
                    </Button>
                </FormGroup>
            </Form>
            {
                error ? (
                    <Alert style={{marginTop:"12px"}} color="danger">
                         {errorMessage}
                    </Alert>
                ) : ""
            }
        </Container>
    )
}