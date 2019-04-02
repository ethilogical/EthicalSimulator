import React from 'react';
import data from './oldEthicsExample2.json'

import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';

export default class Simulator extends React.Component {
    constructor(props) {
        super(props)
        this.callJson = this.callJson.bind(this);
        this.state = {
            select:1
        };
    }
    callJson(select){
        this.setState({
            select: this.state.select + 1
        });
    }

    render () {
        let buttonTitle;
        let passage;
        let narrativesTitle = data.narratives[0].narrative;
        let page;
        if(this.state.select < 7) {
            
            passage = data.narratives[0].passages[this.state.select].passage;
            page = data.narratives[0].passages[this.state.select].page;
            buttonTitle = data.narratives[0].passages[this.state.select].choices[0].choice

        } else {
            this.state.select = 0;
            buttonTitle = "Again"
        }
        return (

            <div>               
                <Container>
                    <br />
                    <Row>
                        <Col>
                             <Card>
                                 <CardBody>
                                     <CardTitle> {narrativesTitle} </CardTitle>
                                     <CardSubtitle> {page} </CardSubtitle>
                                     <CardText> {passage} </CardText>
                                     <Button onClick={() => this.callJson(0)}> {buttonTitle} </Button>
                                 </CardBody>
                             </Card>
                             
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}