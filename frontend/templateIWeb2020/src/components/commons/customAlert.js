import React, { useEffect } from 'react';
import {Alert} from "react-bootstrap";

const CustomAlert = ({alertContent,closeAlert,variant}) => {
    useEffect(()=>{
        setTimeout(()=>{
            closeAlert();
        },3000);
    });
    return (
        <>
            <Alert variant={variant}>
                {alertContent}
            </Alert>
        </>
    );
};
export default CustomAlert;
