import React from 'react'
import { Route, Routes } from 'react-router-dom';
import contants from '../constants/constants';
import Home from '../containers/home';
import Menu from '../containers/menu';
import Cart from '../containers/cart';
import Order from '../containers/order';
import Items from '../containers/Items';
export default function routes() {
    const { HOME, MENU, ORDER, CART, ITEM } = contants.screen
    return (
        <div>
            <Routes>
                <Route path={`/${HOME}`} element={<Home />} />
                <Route path={`/${MENU}`} element={<Menu />} />
                <Route path={`/${CART}`} element={<Cart />} />
                <Route path={`/${ORDER}`} element={<Order />} />
                <Route path={`/${ITEM}`} element={<Items />} />
            </Routes>
        </div>
    )
}
