import React, {PureComponent} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import uuid from 'uuid'

import {
    ListGroup,
    ListGroupItem,
    Button,
    Container
} from 'reactstrap'

import './component.css'

import {getItem, deleteItem, setItem} from '../module/item/itemAction'

import { CSSTransition, TransitionGroup} from 'react-transition-group'

class ShoopingList extends PureComponent{


  constructor(props){
      super(props)
      this.state = {
          items : [
              {
                  id : uuid(), name : 'Eggs'
              },
              {
                id : uuid(), name : 'Potato'
            },{
                id : uuid(), name : 'Table'
            },
            {
                id : uuid(), name : 'Milk'
            },
          ]
      }
  this.onHandleClick = this.onHandleClick.bind(this)
  }

  componentDidMount(){
    this.props.getItem()
  }

  onHandleClick(){
    const name = prompt('Enter Item')
    this.props.setItem({name})
  }

  render(){
      console.log("itesm",this.props.items)
  return (
        <Container>
            <Button
            color="dark"
            style={{marginBottom : '2rem'}}
            onClick={this.onHandleClick}
            >
                Add Item
            </Button>

            <ListGroup>
                {/* <TransitionGroup> */}
                    {this.props.items.map((item)=> {
                        return(
                            // <CSSTransition id={item.id}>
                                <ListGroupItem id= {item._id}>
                                    <Button
                                    className="remove-button"
                                    color="danger"
                                    size="sm"
                                    onClick={() => {
                                        this.props.deleteItem(item._id)
                                    }}
                                    >&times;</Button>
                                    
                                {item.name}

                                </ListGroupItem>
                            // </CSSTransition>
                        )
                    })}
                {/* </TransitionGroup> */}
            </ListGroup>
        </Container>
  );
  }
}

function mapStateToProps(state){
    return{
        items : state.items.items
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getItem, deleteItem, setItem}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoopingList);
