import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

const FloatingInput = (prop) => {
    return (
        <FloatingLabel
            controlId="floatingInput"
            label={prop.label}
            className={prop.className}
        >
        <Form.Control type={prop.type} placeholder={prop.placeholder} name={prop.name} value={password} />
        </FloatingLabel>  
    )
}

export default FloatingInput;