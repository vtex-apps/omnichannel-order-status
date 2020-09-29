
import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

// Your component pages
import OrderB2B from './components/OrdersB2B'
import OrderDetail from './components/OrderDetails'

const OrdersB2BPage = () => (
   <Fragment>
      <Route path="/b2b-order" component={OrderB2B}/>
      <Route path="/b2b-order-details/:order" component={OrderDetail}/>
   </Fragment>
)

export default OrdersB2BPage