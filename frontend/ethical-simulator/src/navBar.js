import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  export default class Example extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      return (
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">Ethical Simulator</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="">Simulator</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="">About</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                   Advisors
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      Dr.Michael S. Kirkpatrick
                    </DropdownItem>
                    <DropdownItem>
                      Dr.Michael Stewart
                    </DropdownItem>
                  </DropdownMenu>
                  
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }