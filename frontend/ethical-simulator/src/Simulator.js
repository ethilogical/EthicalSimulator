import React from 'react';
import data from './oldEthicsExample_newOne.json'
import Narrative from './Narrative';

import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';

export default class Simulator extends React.Component {
    constructor(props) {
        super(props)
        this.callJson = this.callJson.bind(this);
        this.state = {
            select:1,
            narrative: data.narratives[0]
        };
    }
    callJson(select){
        this.setState({
            select: this.state.select + 1
        });
    }

    render () {
       
        return (

            <div>               
                <Container>
                    <br />
                    <Row>
                        <Col>
                            <Narrative narrative={data.narratives[0]}></Narrative>
                             
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}