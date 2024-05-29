import React, {useState, useContext} from "react";
import api from '../../services/api';
import {Form, Button, FormGroup, Input, Label, Container, Alert} from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../user-context";

export default function Login(){
    
    const {setIsLoggedIn} = useContext(UserContext);

    const history = useNavigate();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async evt => {
        evt.preventDefault();
        
        const response = await api.post('/login', {email, password})
        const user_id = response.data.user_id || false
        const user = response.data.user || false;

        try{
            if(user && user_id){
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)
                setIsLoggedIn(true);
                history('/')
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
            <h2>LOGIN</h2>
            <p>Please <strong>Log in</strong> to tour account.</p>
            <Form onSubmit={ handleSubmit }>
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
                    <Button className="secondary-btn" onClick={() => history('/register')}>
                        Sign Up
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