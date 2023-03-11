import React from 'react'
import { Button } from 'reactstrap'

export default function cuisines({ cuisine }) {
    return (
        <div>
            {
                cuisine.map((item, index) => (
                    <Button
                        key={index}
                        className="btn btn-warning btn-sm"
                        style={{ margin: 3}}
                    >
                        {item}
                    </Button>
                ))
            }
        </div>
    )
}
