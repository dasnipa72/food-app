import React, { useEffect, useState, useContext } from 'react'

import { Container, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap';

import { useNavigate } from 'react-router-dom';
import { UserContext, UserDispatchContext } from '../context/context'
import { ApiDispatchContext } from '../context/ApiContext';
import constants from '../constants/constants';
import UnifiedCard from '../Components/CommonComponent/Card'
import Loader from '../Components/CommonComponent/Loader';
import { dummyResturant } from '../images';

const VendorBanner = (props) => {
  const { title, description, img, altImage, ratingValue } = props;
  return (
    <Card style={{ width: '25rem' }}>
      <CardBody>
        <CardTitle tag="h5">
          {title}
        </CardTitle>
        <CardText>
          {description}
          Rating : {ratingValue}
        </CardText>
      </CardBody>
    </Card>
  )
}

export default function menu() {
  const [outlets, setOutlets] = useState([])
  const [isLoader, setLoader] = useState(false)

  const setItems = useContext(UserDispatchContext).setMenuItems
  const setOutletItems = useContext(UserDispatchContext).setOutletItems
  const outletItems = useContext(UserContext).outletItems
  const selectedVendor = useContext(UserContext).selectedVendor
  const apiCall = useContext(ApiDispatchContext);
  const navigate = useNavigate()

  useEffect(() => {
    getOutlets();
  }, [])

  const getOutlets = async () => {
    if (!outletItems.length) {
      setLoader(true)
      await apiCall.getMenus()
        .then(res => {
          setOutletItems(res?.data?.result?.categories)
          setLoader(false);
        })
        .catch(e => {
          console.log(e);
        })
    }
  }

  const handleViewClick = (itmes) => {
    setItems(itmes);
    navigate(`/${constants.screen.ITEM}`)
  }
  return (
    <Container className='container'>
      {
        isLoader ? <Loader isLoading={isLoader} />
          :
          <>
            <Row className='banner-caontainer'>
              <h1> MENU / categories </h1>
              <VendorBanner
                img={selectedVendor.logo}
                title={selectedVendor.name}
                ratingValue={selectedVendor.ratingValue}
              />
            </Row>
            <Row className='vendor-container'>
              {
                outletItems.length && outletItems.map((menu, index) => {
                  const { name, foodType, viewType, showExpanded, items } = menu;
                  return (<UnifiedCard
                    key={index}
                    title={name}
                    description={foodType}
                    btnName={'Items'}
                    handleClick={() => handleViewClick(items)}
                  />)

                })
              }
            </Row>
          </>

      }

    </Container>
  )
}
