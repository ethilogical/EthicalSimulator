import React from 'react';
import Passage from './Passage.js'
import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';
import { createSecureContext } from 'tls';

export default class Narrative extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            select:1,
            status: this.props.narrative.startPage,
            narrative: this.props.narrative
        };
    }


    update = pageId => {
        console.log(pageId)
        this.setState({
            status: pageId
        })
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
        //     buttonT\itle = data.narratives[0].passages[this.state.select].choices[0].choice

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
                        
                        
                       
                        {
                            Object.keys(this.state.narrative.passages).map((pass)=>{
                                return pass == this.state.status 
                                    ? <Passage update={this.update}  passage={this.state.narrative.passages[pass]}></Passage> : null
                                
                            })
                        }
                    </CardBody>
                </Card>
                
            </div>
        );
    }
}