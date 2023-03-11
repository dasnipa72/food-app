import React, { createContext, useState } from 'react'

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

function UserProvider({ children }) {
    const [data, setData] = useState('Hi Nipa');
    const [resturants, setResturants] = useState([]);
    const [outletItems, setOutletItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [cartItems, setcartItems] = useState([]);
    const [orderedItems, setorderedItems] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState({
        id:'',
        name: '',
        logo:'',
        ratingValue:''
    });

    const allObj = {
        data,
        outletItems,
        menuItems,
        cartItems,
        orderedItems,
        resturants,
        selectedVendor
    }

    const allSetFunction = {
        setData,
        setOutletItems,
        setMenuItems,
        setcartItems,
        setorderedItems,
        setResturants,
        setSelectedVendor
    }
    return (
        <UserContext.Provider value={allObj}>
            <UserDispatchContext.Provider value={allSetFunction}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export { UserProvider, UserContext, UserDispatchContext };
