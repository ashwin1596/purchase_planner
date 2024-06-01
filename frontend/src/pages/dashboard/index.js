import React, {useEffect, useState} from "react";
import {Button, Alert, ButtonGroup, Input, Table, Popover, PopoverHeader, PopoverBody} from 'reactstrap';
import api from '../../services/api';
import moment from 'moment';
import './dashboard.css';
import { useNavigate } from "react-router-dom";

import { 
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
  } from 'reactstrap';

// Dashboard will show all the items
export default function Dashboard(){

    const history = useNavigate();
    const [ items, setItems] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ dropdownOpen, setDropdownOpen] = useState(false);
    const [ popoverOpen, setPopoverOpen] = useState(false);
    const [ catSelected, setCatSelected ] = useState(null);
    const [ error, setError ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const [ success, setSuccess ] = useState(false)
    const [ successMessage, setSuccessMessage ] = useState('')

    const [ upVoteItem, setUpVoteItem ] = useState('')
    const [ comment, setComment ] = useState('')

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const togglePopover = (id) => {
        setPopoverOpen(popoverOpen === id ? null : id)
    }

    const user = localStorage.getItem('user');

    useEffect(() => {
        getItems()
    }, [])

    const filterHandler = (query) => {
        setCatSelected(query)
        getItems(query)
    }

    const getItems = async(filter) => {
        try{
        const url = filter ? `/dashboard/${filter}` : '/dashboard'; 
        const response = await api.get(url, {headers : {user: user}})

        setItems(response.data.items)
        
        if(!filter){
            var categories = []
            response.data.items.forEach(item => {
                categories.push(item.category);
            });
            
            setCategories(categories);
        }
        }
        catch(error){
            history('/login')
        }
    };

    const handleDelete = async (itemId) => {
        try{
            await api.delete(`/item/${itemId}`, {headers : {user: user}});
            filterHandler(catSelected)
            setSuccess(true)
            setSuccessMessage('Item deleted successfully!')
            setTimeout(() => {
                setSuccess(false)
                setSuccessMessage('')
            }, 2000)
        }
        catch(error){
            setError(true)
            setErrorMessage(error)
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 2000)
        }
    }

    const handleDownvote = async (itemId) => {
        try{
                await api.post(`/item/downvote/${itemId}`, 
                {},
                        {
                            headers : {'user': user}
                        })

                filterHandler(catSelected)
                setSuccess(true)
                setSuccessMessage('Votes updated!')
                setTimeout(() => {
                    setSuccess(false)
                    setSuccessMessage('')
                }, 2000)

        }
        catch(error){
            setError(true)
            setErrorMessage(error)
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 2000)
        }
    }

    const handleUpvote = async () => {
        try{
            const itemData = new FormData();
            itemData.append("itemId", upVoteItem)
            itemData.append("comment", comment)

            const urlEncoded = new URLSearchParams(itemData).toString();

            try{
                if(comment !== ""){
                    await api.post('/item/upvote', 
                    urlEncoded,
                        {
                            headers : {'user': user, 'Content-Type': 'application/x-www-form-urlencoded'}
                        })
                    setUpVoteItem('')
                    setComment('')
                    filterHandler(catSelected)
                    setSuccess(true)
                    setSuccessMessage('Votes Updated!')
                    setTimeout(() => {
                        setSuccess(false)
                    }, 2000)
                }
                else{
                    setError(true)
                    setErrorMessage('Update Failed!')
                    setTimeout(() => {
                        setError(false)
                    }, 2000)
                }
            }
            catch(error){
                console.log(error)
            }


        }
        catch(error){
            setError(true)
            setErrorMessage(error)
            setTimeout(() => {
                setError(false)
                setErrorMessage('')
            }, 2000)
        }
    }

    return(
        <>
            <div>
                <Dropdown className='filter-panel' isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle color="dark" caret>{catSelected ? catSelected : "All"}</DropdownToggle>
                <DropdownMenu>
                <DropdownItem onClick={() => filterHandler(null)}>All</DropdownItem>
                {categories.map((category,index) => (<DropdownItem key = {index} onClick={() => filterHandler(category)}>{category}</DropdownItem>))}
                </DropdownMenu>
                </Dropdown>
            </div>

            <Table>
            <thead>
                <tr>
                <th>
                    Name
                </th>
                <th>
                    Category
                </th>
                <th>
                    Price
                </th>
                <th>
                    Votes
                </th>
                <th>
                    Comments
                </th>
                <th>
                    Last Updated
                </th>
                </tr>
            </thead>

            <tbody>

            {items.map((item,index) => {
                const buttonId = `button-${index}`;
                // const popoverId = `popover-${index}`;

                return(
                <>
                    <tr key={buttonId}>
                        <th scope="row">
                            {item.name}
                        </th>
                        <td>
                            {item.category}
                        </td>
                        <td>
                            ${parseFloat(item.price).toFixed(2)}
                        </td>
                        <td>
                            {item.totalVotes}
                        </td>
                        <td>
                        <Button
                            id= {buttonId}
                            type="button"
                            onClick={() => togglePopover(buttonId)}
                        >
                            View
                        </Button>
                        <Popover
                            flip
                            target={buttonId}
                            isOpen={popoverOpen === buttonId}
                            toggle={() => togglePopover(buttonId)}
                        >
                            <PopoverHeader>
                            {item.name}
                            </PopoverHeader>
                            <PopoverBody>
                            <ol>
                            {
                                item.comments.map(cat => (
                                    <li key={cat}>
                                        <span>{cat}</span>
                                    </li>
                                ))
                            }
                            </ol>
                            </PopoverBody>
                        </Popover>
                        </td>
                        <td>
                            {moment(item.updatedAt).format('LLL')}
                        </td>
                        <td>
                        <ButtonGroup>
                        <Button size="sm" onClick={() => handleDownvote(item._id)}>∨</Button>
                        <Button size="sm" color="primary" onClick={() => setUpVoteItem(item._id)}>^</Button>
                        <Button size="sm" color="danger" onClick={() => handleDelete(item._id)}>X</Button>
                        </ButtonGroup>
                        </td>
                     </tr>
                </>
                )
            })}
            </tbody>

            </Table>

            {
                upVoteItem !== '' ? (
                    <Alert>
                         <Input type="text" onChange={ evt => setComment(evt.target.value) }/>
                         <Button size="sm" onClick={handleUpvote}>Submit</Button>
                    </Alert>
                ) : ""
            }
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
                         {successMessage}
                    </Alert>
                ) : ""
            }
        </>
    )
}