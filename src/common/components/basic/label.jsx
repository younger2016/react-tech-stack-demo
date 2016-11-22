import React from 'react';
import { Row,Col } from 'antd';
export default  function(control,title){
  return (
        <Row>
            <Col xs={8}>{title}</Col>
            <Col xs={16}>{control}</Col>
        </Row>
    )
}
