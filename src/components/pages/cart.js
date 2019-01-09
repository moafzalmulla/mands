"use strict"
import React from 'react';
import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label} from
'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'

import {deleteCartItem, updateCart} from
'../../actions/cartActions';

class Cart extends React.Component{

  onDelete(_id){
    // Create a copy of the current array of books
    const currentBookToDelete =
    this.props.cart;
    // Determine at which index in books
    // array is the book to be deleted
    const indexToDelete =
        currentBookToDelete.findIndex(
              function(cart){
                return cart._id === _id;
        } )
    //use slice to remove the book at the
    // specified index
    let cartAfterDelete =
        [...currentBookToDelete.slice(0,
        indexToDelete),
        ...currentBookToDelete.slice(indexToDelete +
        1)]
        this.props.deleteCartItem(cartAfterDelete);
  }


  onIncrement(_id){
        this.props.updateCart(_id, 1);
  }

  onDecrement(_id, quantity){
        if(quantity > 1){
        this.props.updateCart(_id, -1);
        }
  }

  constructor(){
    super();
    this.state = {
      showModal:false
    }
  }

  open(){
     this.setState({showModal:true})
  }

  close(){
    this.setState({showModal:false})
  }

  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    } 
  }

  renderDelivery(){
    // if(this.props.totalAmount <= '50'){
    //   return "3.95";
    // } else {
    //   return "7.95";
    // } 
    // return "For orders under £50 delivery costs £4.95. For orders under £90, delivery costs £2.95. Orders over £90 have free delivery.";
  }

    renderEmpty(){
    return(<div>
      {/* Cart Empty */}
      </div>)
    }

    renderCart(){
    const cartItemsList =
        this.props.cart.map(function(cartArr){
          return(
          <Panel key={cartArr._id + "a"}>
            <Row>
            <Panel.Body>
              
              <Col xs={12} sm={4}>
                  <h6>{cartArr.title}</h6>
                  <span></span>
              </Col>

              <Col xs={12} sm={2}>
                <h6>&pound; {cartArr.price}</h6>
              </Col>

              <Col xs={12} sm={2}>
                <h6>qty.<Label bsStyle="success">{cartArr.quantity}</Label></h6>
              </Col>

              <Col xs={6} sm={4}>
                <ButtonGroup style={{minWidth:'300px'}} >
                    <Button  onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}  bsStyle="default" bsSize="small">-</Button>
                    <Button  onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                    <Button  onClick={this.onDelete.bind(this, cartArr._id)} bsStyle="danger" bsSize="small">DELETE</Button>
                </ButtonGroup>
            </Col>
            </Panel.Body>
            
            </Row>
        </Panel> )
        },this)


          return(
            <div>
            <Panel bsStyle="primary">
            <Panel.Heading>Cart</Panel.Heading>
            <Panel.Body>
            {cartItemsList}
            <Row>
                <Col xs={12}>
                    <h6>Total amount:&pound;{this.props.totalAmount}</h6>
                    <h6>Total count of products in cart:{this.props.totalQty}</h6>
                    <h6>Delivery charge:{this.props.renderDelivery}</h6>
                    
                    <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
                      PROCEED TO CHECKOUT
                    </Button>
       
                </Col>
            </Row>

                          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                          <Modal.Header closeButton>
                          <Modal.Title>Thank you!</Modal.Title>

                          </Modal.Header>

                              <Modal.Body>
                              <h6>Your order has been Saved</h6>
                              <p>You will receive an email confirmation</p>
                              </Modal.Body>

                          <Modal.Footer>
                            <Col xs={6}>
                            <h6>total &pound;{this.props.totalAmount}</h6>
                            </Col>
                          <Button onClick={this.close.bind(this)}>Close</Button>
                          </Modal.Footer>
                          </Modal>
            </Panel.Body>
          </Panel>
          </div>
            
          )
    }

}

function mapStateToProps(state){

    return{
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQty: state.cart.totalQty
    }
  }

  function mapDispatchToProps(dispatch){
    return bindActionCreators({
      deleteCartItem:deleteCartItem,
      updateCart:updateCart
    }, dispatch)
  }
  export default connect(mapStateToProps,
  mapDispatchToProps)(Cart);