"use strict"
import React from 'react';
import {Row, Col, Well, Button} from
'react-bootstrap';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import {addToCart, updateCart} from '../../actions/cartActions';


class BookItem extends React.Component{

  handleCart(){
    const book = [...this.props.cart, {
    _id:this.props._id,
    title:this.props.title,
    description:this.props.description,
    price:this.props.price,
    quantity:1
    }]

            // CHECK IF CART IS EMPTY : MEANS IF WE HAVE ITEMS IN CART
            if(this.props.cart.length > 0) {
                //   //CART IS NOT EMPTY
                  let _id = this.props._id;

                //   //CHECK FOR PRODUCT WITH SAME ID
                //   //RETURN THAT ITEM FORM THE CART
                  let cartIndex =
                  this.props.cart.findIndex(function(cart){
                    return cart._id === _id;
                  })

                // // IF RETURNS 0 THERE ARE NO ITEMS WITH SAME ID
                if (cartIndex === -1){
                //   //NO ITEMS IN CART, SO ADD ITEM
                  this.props.addToCart(book);
                  } else {
                //   //ITEM ALREADY IN CART SO,WE NEED TO UPDATE QUANTITY
                  this.props.updateCart(_id, 1)
                  }

            }else{
              // IF CART WAS EMPTY, BUY NOW MUST TRIGGER AN ADD_TO_CART - AS THERE ARE NO ITEMS
              this.props.addToCart(book)
            }

            // this.props.addToCart(book) 
            
          }

  render(){
    return(
        <Well>
          <Row>
            <Col xs={12}>
              <h3>{this.props.title}</h3>
              <p>{this.props.description}</p>
              <h6>usd. {this.props.price}</h6>
              <Button onClick={this.handleCart.bind(this)} bsStyle='primary'>Buy now</Button>
            </Col>
          </Row>
        </Well> 
        )
  }

}

function mapStateToProps(state){

    return{
    cart:state.cart.cart
    }
  }

  function mapDispatchToProps(dispatch){
  return bindActionCreators({
  addToCart:addToCart,
  updateCart:updateCart
  }, dispatch)
  }

  export default connect(mapStateToProps,
  mapDispatchToProps)(BookItem);
