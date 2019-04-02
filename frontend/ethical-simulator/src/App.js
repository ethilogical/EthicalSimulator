import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
               <Row>
                 <Col>
                     <Jumbotron>
                       <h1 className="acmTitle"> ACM Code of Ethics and Professional Conduct</h1>
                       <hr />
                       <h2>Preamble</h2>
                       <p>
                            Computing professionals' actions change the world. To act responsibly, 
                            they should reflect upon the wider impacts of their work, consistently 
                            supporting the public good. The ACM Code of Ethics and Professional Conduct 
                            ("the Code") expresses the conscience of the profession. <br/>
                            The Code is designed to inspire and guide the ethical conduct of all computing
                            professionals, including current and aspiring practitioners, instructors, students,
                            influencers, and anyone who uses computing technology in an impactful way. Additionally,
                            the Code serves as a basis for remediation when violations occur. The Code includes principles
                            formulated as statements of responsibility, based on the understanding that the public good is
                            always the primary consideration. Each principle is supplemented by guidelines, which provide 
                            explanations to assist computing professionals in understanding and applying the principle.<br/>
                            Section 1 outlines fundamental ethical principles that form the basis for the remainder of the
                            Code. Section 2 addresses additional, more specific considerations of professional responsibility.
                            Section 3 guides individuals who have a leadership role, whether in the workplace or in a volunteer 
                            professional capacity. Commitment to ethical conduct is required of every ACM member, and principles 
                            involving compliance with the Code are given in Section 4. <br/>
                            The Code as a whole is concerned with how fundamental ethical principles apply to a computing professional's
                            conduct. The Code is not an algorithm for solving ethical problems; rather it serves as a basis for ethical 
                            decision-making. When thinking through a particular issue, a computing professional may find that multiple 
                            principles should be taken into account, and that different principles will have different relevance to the
                            issue. Questions related to these kinds of issues can best be answered by thoughtful consideration of the 
                            fundamental ethical principles, understanding that the public good is the paramount consideration. The 
                            entire computing profession benefits when the ethical decision-making process is accountable to and 
                            transparent to all stakeholders. Open discussions about ethical issues promote this accountability
                             and transparency. <br/>
                       </p>
                      <Link className="btn btn-primary btn-lg" to="/simulator">Begin</Link>
                     </Jumbotron>
                 </Col>
               </Row>
        </Container>
        
      </div>
    );
  }
}

export default App;
