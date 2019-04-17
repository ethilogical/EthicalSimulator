import React from 'react';
import principle from './ACMEthicalPrinciples2018_WIPRevise.json'
import { Container, Row, Col,Card, Button, CardImg, CardTitle, CardText, CardGroup,
    CardSubtitle, CardBody  } from 'reactstrap';
import { listenerCount } from 'events';
import stringSimilarity from 'string-similarity'

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
        
       
        function code(params) {
            var category = principle.categories[0].principles
            

            var words = params.split(" ")
            var found = [];
            for(var i =0; i < category.length; i++){
                for(var j=0; j < category[i].guidance.length; j++){
            
                    for(var k=0; k < category[i].guidance[j].keywords.length; k++){
                        
                        if(typeof category[i].guidance[j].keywords[k] === 'object'){                              
                            for(var l=0; l < category[i].guidance[j].keywords[k].keyword.length; l++){
                                
                                if(words.includes(category[i].guidance[j].keywords[k].keyword)){
                                    
                                    found.push(category[i].guidance[j].keywords[k])
                                }
                                var result = stringSimilarity.findBestMatch(category[i].guidance[j].keywords[k].keyword, words)
                                if (result.bestMatch.rating > .4){
                                    found.push(result.bestMatch.target)
                                    
                                    //console.log(result.bestMatch.target)
                                }
                                
                            }
                        }else {
                            
                            var result = stringSimilarity.findBestMatch(category[i].guidance[j].keywords[k], words)
                            if (result.bestMatch.rating > 0.4){
                                found.push(result.bestMatch.target)
                                
                                //console.log(result.bestMatch)
                            }
                        }
                    }
                }
            }
            console.log("This is the keywords found")
            if(found.length < 1){
                return "NO KEY FOUND"
            }else {
                
                
                return found.filter(function(item, pos){
                    return found.indexOf(item) == pos;
                });
            }
            
            
        }
        if(this.props.passage.choices) {
            return (

                <div>
                    <CardSubtitle> {this.state.passage.page} </CardSubtitle>
                    <CardText> {this.state.passage.passage} </CardText>
                    {this.state.passage.choices.map((choice, index) => {
                        return <Button onClick={() => 0}> {choice.choice} </Button>
                    })}
                    <div style={{border: '2px solid black'}}>
                        <p>
                            <h4>THE KEYWORDS</h4>
                            {code(this.state.passage.passage).map(function(item) {
                                return item + " "
                            })}
                        </p>
                    </div>
                    
                </div>
            );
        }   else {
            return null
        } 
           
        }
}