import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.props.firebase.auth().onAuthStateChanged( user =>
      {this.props.setUser(user);
    });

  }


  render() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();

    return(
      <section>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              Tomato Timer
            </Navbar.Brand>
          </Navbar.Header>

          {
            this.props.currentUser === 'Guest' ?
              <Nav pullRight>
                <NavItem onClick={() => this.props.firebase.auth().signInWithPopup( provider )}>
                  Login to save tasks
                </NavItem>
              </Nav>
            :
            <Nav pullRight>
              <Navbar.Text className="nav-text">
                Logged in as {this.props.currentUser}
              </Navbar.Text>
              <NavItem onClick={() => this.props.firebase.auth().signOut()}>
                Sign Out
              </NavItem>
            </Nav>
          }
        </Navbar>
      </section>
    )
  }
}

export default User;
