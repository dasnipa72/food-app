import React, { useState, useContext } from 'react';
import { Container, Row, Alert } from 'reactstrap';
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
        setCartItems(prev => [...prev, item]);
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
                                    const { id, basePrice, cuisine, description, image, isVegetarian,
                                        itemName, neonUrl, sellingPrice, taxRate } = item;
                                    return (<UnifiedCard
                                        key={id}
                                        title={itemName}
                                        description={description}
                                        btnName={'Add to Cart'}
                                        img={image}
                                        altImage={neonUrl}
                                        imgRequire={true}
                                        handleClick={() => addToCart(item)}
                                    ><>
                                            <p>Item Price : {basePrice}</p>
                                            <p><strong>Selling Price </strong>: {sellingPrice}</p>
                                            <p>{isVegetarian ? <span className='veg'>Veg</span> : <span className='nonveg'>Non-Veg</span>}</p>
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
