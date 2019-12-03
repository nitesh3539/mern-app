import React, {PureComponent} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap'

import RegisterModal from './RegisterModal'
import LoginModal from './LoginModal'
import { connect } from 'react-redux';
import LogoutModal from './LogoutModal'
import PropTypes from 'prop-types';
import { register } from '../module/register/registerAction';
class AppNavBar extends PureComponent{


  constructor(props){
      super(props)
      this.state = {
          isOpen : false
      }

      this.toggle = this.toggle.bind(this)
  }

  onChangeTitle(e){
    console.log("e",e.target)
    e.preventDefault();

    this.setState({titleName : e.target.value})
  }

  async componentDidMount(){
    let data = await fetch('http://localhost:8000/getProduct')
    let json = await data.json()
    this.setState({list : json.productList})
  }

  onChangePrice(e){
    console.log("e",e.target)
    e.preventDefault();

    this.setState({priceValue : e.target.value})
  }

  toggle(){
      this.setState((prevState, nextProps) => {
          return {isOpen : !prevState.isOpen}
        })
  }

  onHandleClick = async () => {
    const newProduct = {
      title : this.state.titleName,
      price : this.state.priceValue
    }
    console.log("newProduct",newProduct)
    let data = await fetch('http://localhost:8000/addProduct', 
    {
      method : 'POST',
      body : JSON.stringify(newProduct),
      headers : {
        'Content-Type' : 'application/json'
      }
    }
    )
    let json = await data.json()
    console.log("jsondayta",json)
    this.setState({list : json.productList})
  }

  renderLogin(){
    return(
      <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                          {this.props.user.username}
                        </NavItem>
                        <NavItem>
                          <LogoutModal/>
                        </NavItem>
                    </Nav>
                </Collapse>
    )
  }

  renderLogout(){
    return(
      <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                          <RegisterModal/>
                        </NavItem>
                        <NavItem>
                          <LoginModal/>
                        </NavItem>
                    </Nav>
                </Collapse>
    )
  }

  render(){
  return (
    <div className="App">
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">
                  Shopping List
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                {this.props.isAuthenticated ? this.renderLogin() : this.renderLogout()}
            </Container>
        </Navbar>
    </div>
  );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user : state.auth.user,
  error: state.error
});

export default connect(mapStateToProps)(AppNavBar);
