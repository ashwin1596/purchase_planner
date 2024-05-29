import React, { useContext} from 'react';
import './TopNav.css';
import {Link} from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
} from 'reactstrap';
import { UserContext } from '../user-context';

function TopNav() {
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        setIsLoggedIn(false);
    }

    return isLoggedIn ? (
        <div>
        <Navbar color="dark" dark>
            <NavbarBrand href="/">Purchase Planner</NavbarBrand>
            <Nav>
                <NavItem>
                    <Link className={"link-style"} to="/">Dashboard</Link>
                </NavItem>
                <NavItem>
                    <Link className={"link-style"} to="/items">Add Items</Link>
                </NavItem>
            </Nav>
            <Link className={"link-style"} to="/login" onClick={handleLogout}>Log out</Link>
        </Navbar>
        </div>
    ) : "";
}

export default TopNav;