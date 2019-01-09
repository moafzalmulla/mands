"use strict"
import React from 'react';
import {connect} from 'react-redux';

import {getBooks} from '../../actions/booksActions';
import {bindActionCreators} from 'redux';
import {Grid, Col, Row, Button} from  'react-bootstrap';
import BookItem from './bookItem';
import BooksForm from './BooksForm';
import Cart from './cart';

class BooksList extends React.Component{

  componentDidMount(){
    // Dispatch an action
    this.props.getBooks()
   }

      render(){

                const booksList = this.props.books.map(function(booksArr){
                  return(
                      <Col md={4}
                      key={booksArr._id}>
                        <BookItem
                        _id = {booksArr._id}
                        title ={booksArr.title}
                        description ={booksArr.description}
                        price ={booksArr.price}/> 
                      </Col>

                  )
                })

                return(
                  <Grid>
                    
                    <Row className="topBarSpacer">
                        <h1>
                          {/* Hello first Redux App */}
                          </h1>
                    </Row>
                 
                    <Row>
                      <Cart />
                    </Row>
 
             
                    <Row>
                      {booksList}
                    </Row>

                    <Row>
                      <Col md={12} >
                      <h3>Add new products to test cart (ps. Just to illustrate admin functions)</h3>
                        <BooksForm />
                      </Col>
                    </Row> 

                  </Grid>
                  )
    } 
}

function mapStateToProps(state){
        return{
          books: state.books.books
        }
        
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({
      getBooks:getBooks
    },dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BooksList);


