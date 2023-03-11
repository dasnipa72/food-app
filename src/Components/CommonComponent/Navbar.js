import React,{ useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarText, Nav, NavItem, NavLink } from 'reactstrap'
import { UserContext } from '../../context/context'
import contants from '../../constants/constants'
export default function NavbarComponent(args) {
  const { HOME, MENU, ORDER, CART } = contants.screen;
  const cartItems = useContext(UserContext).cartItems;
  const navigate = useNavigate()

  useEffect(()=>{

  },[cartItems])

  return (
    <Navbar {...args} dark color='dark' fixed='top'>
      <NavbarBrand onClick={()=>navigate(`/${HOME}`)}> Food App</NavbarBrand>

      <Nav className="navbar navbar-expand navbar-dark bg-dark">
        <NavItem className="navbar-nav mr-auto">
          <NavLink active onClick={()=>navigate(`/${HOME}`)} >
            Home
          </NavLink>
        </NavItem>
        <NavItem className="navbar-nav mr-auto">
          <NavLink active onClick={()=>navigate(`/${MENU}`)}>
            Menu
          </NavLink>
        </NavItem>
        <NavItem className="navbar-nav mr-auto">
          <NavLink active onClick={()=>navigate(`/${ORDER}`)}>
            Order
          </NavLink>
        </NavItem>
        <NavItem className="navbar-nav mr-auto">
          <NavLink active onClick={()=>navigate(`/${CART}`)} >
            Cart {`(${cartItems.length})`}
          </NavLink>
        </NavItem>
      </Nav>
      <NavbarText>Simple Text</NavbarText>
    </Navbar>
  )
}
