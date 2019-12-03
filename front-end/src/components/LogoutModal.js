import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../module/auth/authAction';
import { clearErrors } from '../module/err/errorAction';

class LogoutModal extends Component {
  state = {
    modal: false,
    msg: null
  };

//   static propTypes = {
//     error: PropTypes.object.isRequired,
//     login: PropTypes.func.isRequired,
//   };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    // if (this.state.modal) {
    //   if (isAuthenticated) {
    //     this.toggle();
    //   }
    // }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onLogout = e => {
    e.preventDefault();
    this.toggle()
    // Attempt to login
    this.props.logout();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Logout
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Logout</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
               <div>Do you want to logout.If yes, please press on Logout button</div>
                <div style={{flexDirection : 'row'}}>
                <Button color='dark' style={{ marginTop: '2rem' }} block onClick={this.toggle}>
                  Cancel
                </Button>
                <Button color='dark' style={{ marginTop: '2rem' }} block onClick={this.onLogout}>
                  Logout
                </Button>
                </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { logout, clearErrors }
)(LogoutModal);