import React from 'react';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
export default class Begin extends React.Component {
    constructor () {
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
        let path = 'Simulator.js';
        this.props.history.push(path);
    }
  render() {
    return (
      <div>
          <Button onclick={this.routeChange}color="primary" size="lg"  block>Begin The Simulator</Button>
      </div>
    );
  }
}