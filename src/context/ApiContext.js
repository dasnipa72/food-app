import React, { createContext } from 'react'
import api from '../httpConstants/httpCommon';
import { URL } from '../constants/URLConstants';
const ApiDispatchContext = createContext(undefined)

function APIProvider({ children }) {

    const getResturants = () => {
        return api.get(URL.OUTLET)
    }

    const getMenus = () =>{
        return api.get(URL.MENU)
    }

    const placeOrder = () => {
        return api.post(URL.ORDER)
    }
    const allApi = {
        getResturants,
        getMenus,
        placeOrder
    }
    return (
        <ApiDispatchContext.Provider value={allApi}>
            {children}
        </ApiDispatchContext.Provider>
    )
}

export { APIProvider, ApiDispatchContext }
