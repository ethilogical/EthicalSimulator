import React from 'react';

import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';
import { listenerCount } from 'events';

export default class Passage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            select:1,
            passage: this.props.passage
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
            //    {console.log(this.state.passage.choices)}
            //     {this.state.passage.choices.map((choice, index) => {
            //         return <Button onClick={() => 0}> {choice.choice} </Button>
            //     })}
            if (this.state.passage.choices){
                console.log(this.state.passage.choices)
            }
        
        if(this.props.passage.choices) {
            return (

                <div>
                    <CardSubtitle> {this.state.passage.page} </CardSubtitle>
                    <CardText> {this.state.passage.passage} </CardText>
                    {this.state.passage.choices.map((choice, index) => {
                        return <Button onClick={() => 0}> {choice.choice} </Button>
                    })}
                </div>
            );
        }   else {
            return <p>NOTHING</p>
        } 
           
        }
}