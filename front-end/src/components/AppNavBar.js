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

  render(){
  return (
    <div className="App">
        <Navbar color="dark" dark expand="sm" className="mb-5">
            <Container>
                <NavbarBrand href="/">
                  Shopping List
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                          <NavLink href="https://github.com/niteshsingh0129">Github</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    </div>
  );
  }
}

export default AppNavBar;
