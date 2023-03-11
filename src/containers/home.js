import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Container, Row} from 'reactstrap';
import { UserContext, UserDispatchContext } from '../context/context';
import { ApiDispatchContext } from '../context/ApiContext';
import constants from '../constants/constants';
import UnifiedCard from '../Components/CommonComponent/Card';
// import OutletCard from '../Components/OutletCard';
import Loader from '../Components/CommonComponent/Loader';
import Cuisines from '../Components/cuisines';
export default function Home() {
  const [vendors, setVendors] = useState([])
  const [stationName, setStationName] = useState('')
  const [totalOutlets, setTotalOutlets] = useState(null)
  const [isLoader, setLoader] = useState(false)
  const resturants = useContext(UserContext).resturants;
  const setResturants = useContext(UserDispatchContext).setResturants;
  const setSelectedVendor = useContext(UserDispatchContext).setSelectedVendor; 
  const apiCall = useContext(ApiDispatchContext);
  const navigate = useNavigate()
  useEffect(() => {
    !resturants.length && getAllVendors()
  }, [])


  const getAllVendors = async () => {
    setLoader(true)
    await apiCall.getResturants()
      .then(res => {
        const resData = res?.data?.result;
        setResturants(resData?.vendors);
        setStationName(resData?.stationName)
        setTotalOutlets(resData?.totalOutlets)
        setLoader(false)
      })
      .catch(e => {
        console.log(e);
      })
  }

  const handleViewClick = (vendor) => {
    const {id, name, logo, ratingValue} = vendor
        setSelectedVendor((prev)=> ({
          ...prev,
          id,
          name,
          logo,
          ratingValue,
        }))
        navigate(`/${constants.screen.MENU}`)
  }

  return (
    <Container className='container'>
     { isLoader ? <Loader isLoading={isLoader} />
     :<>
     <Row className='banner-caontainer'>
      <h1> RESTAURANTS </h1>
      Station: {stationName}<br/>
      <>Total Outlets: {totalOutlets}</>
     </Row>
     <Row className='vendor-container'>
        {
          resturants.length && resturants.map((vendor, index) => {
            const { id, name, logo, minOrderValue, ratingCount, ratingValue, showAsGroup, vendorType, cuisines, outlets } = vendor;
            return (<UnifiedCard
              key={index}
              title={name}
              description={name}
              img={logo}
              handleClick={() => handleViewClick(vendor)}
              imgRequire={true}
            >
              <>
              <p>Minimum Order Value : {minOrderValue}</p>
              <p>Rating : {ratingValue}</p>
              <p>Rating Count : {ratingCount}</p>
              <p>Vendor Type : {vendorType}</p>
              <Cuisines cuisine={cuisines}/>
              </>
              </UnifiedCard>)

          })
        }
      </Row>
      </>}

    </Container>
  )
}
