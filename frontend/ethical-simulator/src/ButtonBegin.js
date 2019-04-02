import React from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

export default class Begin extends React.Component {
  state = {
    redirect: false
  }

  setRedirect = () => {
    this.setState(
      {
          redirect: true
      })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='Simulator' push />
    }
  }
  render() {
    return (

      <div>
          <a href='www.google.com'>Begin</a> <br/>
          <a href={'/Simulator.js'}> <Button color="primary" size="lg"  block>Begin The Simulator</Button> </a>
      </div>
    );
  }
}