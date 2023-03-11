import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

import UnifiedCard from './CommonComponent/Card';

export default function OutletCard() {
    return (
        <div>
            <UnifiedCard>
                <img alt={title} src={img} className='vendor-card-img' />
                <CardBody>
                    <CardTitle tag="h5">
                        {title}
                    </CardTitle>
                    <CardSubtitle
                        className="mb-2 text-muted"
                        tag="h6"
                    >
                        Card subtitle
                    </CardSubtitle>
                    <CardText>
                        {description}
                        <p className="card-text">vendor Type:{vendorType}</p>
                        <p className="card-text">Rating: {ratingValue}</p>
                    </CardText>
                    <Button onClick={handleClick}>
                        View
                    </Button>
                </CardBody>
            </UnifiedCard>
        </div>
    )
}
