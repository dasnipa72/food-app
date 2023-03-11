import React from 'react'
import { Spinner } from 'reactstrap'

export default function Loader({isLoading}) {
    return (
        isLoading ? <div className='spinner-container'>
            <Spinner color="success">
                Loading...
            </Spinner>
        </div>
        : null
    )
}
