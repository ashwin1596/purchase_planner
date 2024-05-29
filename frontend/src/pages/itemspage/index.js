import React, { useEffect, useState} from "react";
import {Container, Form, Button, FormGroup, Input, Label, Alert} from 'reactstrap';
import api from '../../services/api';
import './items.css';
import { useNavigate } from "react-router-dom";

export default function ItemsPage(){
    const history = useNavigate();
    const [ name, setName ] = useState('')
    const [ category, setCategory ] = useState('')
    const [ price, setPrice ] = useState(0)

    const [ error, setError ] = useState(false)
    const [ responseMessage, setResponseMessage ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ success, setSuccess ] = useState(false)

    const user = localStorage.getItem('user');

    useEffect(() =>{
        if(!user){
            history('/login')
        }
    })

    const submitHandler = async (evt) => {
        evt.preventDefault()

        const itemData = new FormData();
        itemData.append("name", name)
        itemData.append("category", category)
        itemData.append("price", price)

        const urlEncoded = new URLSearchParams(itemData).toString();


            try{
                if(name !== "" && category !== "" && price !== null && price > 0){
                    const response = await api.post('/item/add', 
                    urlEncoded,
                        {
                            headers : {'user': user, 'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                    
                    setSuccess(true)
                    setResponseMessage(response.data.message)
                    setTimeout(() => {
                        setSuccess(false)
                    }, 2000)
                }
                else{
                    setError(true)
                    setErrorMessage('Missing required information!')
                    setTimeout(() => {
                        setError(false)
                    }, 2000)
                }
            }
            catch(error){
                console.log(error)
            }
        

        return ""
    }

    return(
        <Container>
            <h1>Add item</h1>

            <Form onSubmit={submitHandler}>
                <FormGroup floating>
                <Input
                    id="name"
                    name="name"
                    placeholder="Name"
                    type="text"
                    value = {name}
                    onChange={ evt => setName(evt.target.value) }
                />
                <Label for="name">
                    Name
                </Label>
                </FormGroup>

                <FormGroup floating>
                <Input
                    id="category"
                    name="category"
                    placeholder="Category"
                    type="text"
                    value = {category}
                    onChange={ evt => setCategory(evt.target.value) }
                />
                <Label for="category">
                    Category
                </Label>
                </FormGroup>

                <FormGroup floating>
                <Input
                    id="price"
                    name="price"
                    placeholder="Price"
                    type="number"
                    value = {price}
                    onChange={ evt => setPrice(evt.target.value) }
                />
                <Label for="price"> 
                    Price $0.00
                </Label>
                </FormGroup>

                <FormGroup>                
                    <Button className="submit-btn">
                        Submit
                    </Button>
                </FormGroup>
            </Form>
            {
                error ? (
                    <Alert className="item-validation" color="danger">
                         {errorMessage}
                    </Alert>
                ) : ""
            }
            {
                success ? (
                    <Alert className="item-validation" color="success">
                         {responseMessage}
                    </Alert>
                ) : ""
            }
            
        </Container>
    )
}