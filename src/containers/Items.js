import React, { useState, useContext } from 'react';
import { Container, Row, Col, Alert } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { UserContext, UserDispatchContext } from '../context/context'
import UnifiedCard from '../Components/CommonComponent/Card'
import Loader from '../Components/CommonComponent/Loader';
import constants from '../constants/constants';

export default function Items() {
    const [isLoader, setLoader] = useState(false)
    const [alertVisible, setAlertVisible] = useState(false)

    const Items = useContext(UserContext).menuItems;
    const cartItems = useContext(UserContext).cartItems;
    const setCartItems = useContext(UserDispatchContext).setcartItems;
    const navigate = useNavigate()

    const addToCart = (item) => {
        const cartData = cartItems;
        cartData.push(item)
        setCartItems(cartData)
        setAlertVisible(true)
    }
    return (
        <Container className='container'>
            {
                isLoader ? <Loader isLoading={isLoader} />
                    :
                    <>
                        <Row className='banner-caontainer'>
                            <h1> ITEMs  </h1>
                        </Row>
                        <Alert color='success' isOpen={alertVisible} toggle={() => setAlertVisible(false)}> 
                        Item Added to Cart!.  
                        <a style={{ color: "blue"}} onClick={() => navigate(`/${constants.screen.CART}`)}> Check in Cart</a>
                        </Alert>

                        <Row className='vendor-container'>
                            {
                                Items.length && Items.map((item, index) => {
                                    const { id, basePrice, cuisine, customisations, description, image, isVegetarian,
                                        itemName, neonUrl, schedules, sellingPrice, taxRate } = item;
                                    return (<UnifiedCard
                                        key={id}
                                        title={itemName}
                                        description={description}
                                        btnName={'Add to Cart'} // show more
                                        img={image}
                                        altImage={neonUrl}
                                        imgRequire={true}
                                        handleClick={() => addToCart(item)}
                                    ><>
                                            <p>Item Price : {basePrice}</p>
                                            <p>Selling Price : {sellingPrice}</p>
                                            <p>{isVegetarian ? "Veg" : "Non-Veg"}</p>
                                        </>
                                    </UnifiedCard>)

                                })
                            }
                        </Row>
                    </>

            }

        </Container>
    )
}
