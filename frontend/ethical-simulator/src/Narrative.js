import React from 'react';
import Passage from './Passage.js'
import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';

export default class Narrative extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            select:1,
            narrative: this.props.narrative
        };
    }
    
    render () {
        // let buttonTitle;
        // let passage;
        // let narrativesTitle = data.narratives[0].narrative;
        // let page;
        // let choices;
        // if(this.state.select < 7) {
            
        //     passage = data.narratives[0].passages[this.state.select].passage;
        //     page = data.narratives[0].passages[this.state.select].page;
        //     choices = data.narratives[0].passages[this.state.select].choices;
        //     buttonTitle = data.narratives[0].passages[this.state.select].choices[0].choice

        // } else {
        //     this.state.select = 0;
        //     buttonTitle = "Again"
        // }
        // <Passage passage={this.state.narrative.passages[0]}></Passage>

        ////////////////////////////////// add a map for the passages. pass in each passage to the Passage component. /////////////////////////////////////////
        return (

            <div>
                <Card>
                    <CardBody>
                        <CardTitle> {this.state.narrative.narrative} </CardTitle>
                        
                        
                       
                        {this.state.narrative.passages.map((pass)=>{
                           return <Passage passage={pass}></Passage>
                        })};
                    </CardBody>
                </Card>
            </div>
        );
    }
}