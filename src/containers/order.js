import React, { useContext, useEffect } from 'react'
import { Container, Row, Col} from 'reactstrap';
import constants from '../constants/constants';
import { UserContext, UserDispatchContext } from '../context/context'

export default function order() {

  const orderedItems = useContext(UserContext).orderedItems
  const setorderedItems = useContext(UserDispatchContext).setorderedItems;

  useEffect(()=>{
    if(!orderedItems?.length){
      setorderedItems(window.localStorage.getItem(constants.localStorageKey.ORDER_DETAILS))
    }
  },[orderedItems])

  return (
    <Container className='container'>
      <Row className='banner-caontainer'>
        <h3>ORDER DETAILS</h3>
        {orderedItems?.length && [orderedItems].map((order, idx) => (
          <Row key={idx}>
            <Col>{order}</Col>
          </Row>
        ))}
      </Row>
    </Container>
  )
}
