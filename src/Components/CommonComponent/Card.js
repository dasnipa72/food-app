import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { dummyResturant } from '../../images';

export default function UnifiedCard(props) {
    const { key, title, subtitle, description, img, altImage, handleClick, btnName, imgRequire, children } = props;
    return (
        <Card
            style={{ width: '25rem' }}
            key={key}
        >
            {imgRequire && <img alt={title} src={img || altImage || dummyResturant} className='vendor-card-img' />}
            <CardBody>
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {subtitle}
                </CardSubtitle>
                <CardText>
                    {description}
                    {children}
                </CardText>
                <Button onClick={handleClick}>
                    {btnName ? btnName : "View"}
                </Button>
            </CardBody>
        </Card>
    )
}
