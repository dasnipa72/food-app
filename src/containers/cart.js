import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { UserContext, UserDispatchContext } from '../context/context'
import { ApiDispatchContext } from '../context/ApiContext'
import Modal from '../Components/CommonComponent/Modal'
import Loader from '../Components/CommonComponent/Loader';
import constants from '../constants/constants';

const CartCard = (props) => {
  const { key, title, description, img, altImage, ratingValue, vendorType, handleClick, btnName, imgRequire, children } = props;
  return (
    <Card className="mb-3" style={{ maxWidth: "70%" }}>
      <Row className="g-0">
        <Col className="col-md-2 center-element">
          <img src={img || altImage} className="img-fluid rounded-start" alt="..." />
        </Col>
        <Col className="col-md-8">
          <CardBody>
            <CardTitle>{title}</CardTitle>
            {children}
            <CardText><small className="text-muted">{description}</small></CardText>
          </CardBody>
        </Col>
        <Col className="col-md-2 center-element">
          <Button onClick={handleClick}> Remove </Button>
        </Col>
      </Row>
    </Card>
  )
}

export default function cart() {
  const [totalAmount, setTotalAmount] = useState(null)
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMsg, setModalMsg] = useState('');
  const [isLoader, setLoader] = useState(false)

  const cartItems = useContext(UserContext).cartItems;
  const setCartItems = useContext(UserDispatchContext).setcartItems;
  const setorderedItems = useContext(UserDispatchContext).setorderedItems;
  const apiCall = useContext(ApiDispatchContext);

  useEffect(() => {
    calculateAmount()
  }, [cartItems])

  const calculateAmount = () => {
    setTotalAmount(cartItems.reduce((acc, curr) => acc + curr.sellingPrice, 0))
  }

  const removeCartItem = (id) => {
    const cartData = cartItems.filter(item => item.id !== id)
    setCartItems(cartData)
  }
  const placeOrder = async () => {
    setLoader(true)
    await apiCall.placeOrder()
      .then(res => {
        if (res.data) {  // res.data value is neither proper string nor in object format 
          setLoader(false)
          setModal(true);
          setModalTitle('Confirmation!')
          setModalMsg('Ordered Placed Successfully')
          setCartItems([])
          setorderedItems(res.data)
          window.localStorage.setItem(constants.localStorageKey.ORDER_DETAILS, res.data)

        }
      })
      .catch(e => console.log(e))
  }
  return (
    <Container className='container'>
      {
        // isLoader ? <Loader isLoading={isLoader} />
        //   :
        <>
          <Row className='banner-caontainer'>
            <h1> CART ITEMs  </h1>
          </Row>
          <Row className='vendor-container'>
            {
              cartItems.length ? cartItems.map((item, index) => {
                const { id, basePrice, cuisine, customisations, description, image, isVegetarian,
                  itemName, neonUrl, schedules, sellingPrice, taxRate } = item;
                return (<CartCard
                  key={id}
                  title={itemName}
                  description={description}
                  btnName={'Add to Cart'} // show more
                  img={image}
                  altImage={neonUrl}
                  imgRequire={true}
                  handleClick={() => removeCartItem(id)}
                ><>
                    <p>Selling Price : {sellingPrice}</p>
                    <p>{isVegetarian ? "Veg" : "Non-Veg"}</p>
                  </>
                </CartCard>)

              })
                : <h4>No Items in CART</h4>
            }
          </Row>
          <Row>
            <h3>Total Amount: {totalAmount}</h3>
          </Row>
          <Row>
            <Button className='btn btn-warning' onClick={placeOrder}>ORDER</Button>
          </Row>
        </>

      }
      <Modal
        modal={modal}
        toggle={() => setModal(false)}
        title={modalTitle}
        msg={modalMsg} />

    </Container>
  )
}
