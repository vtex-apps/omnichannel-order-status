import React, { FunctionComponent } from 'react'
import Success from '@vtex/styleguide/lib/icon/Success'
import { FormattedMessage } from 'react-intl'

interface TrackingProps {
   status: Number
}

const OrderTracking: FunctionComponent<TrackingProps> = ({status}) => {

   function orderStatus(meuNum: Number, status: Number){

      let result
      if(meuNum == status){
         result = <FormattedMessage id="order.inAnalysis" />
      }else if(meuNum < status){
         result = "ok"
      }else{
         result = <FormattedMessage id="order.waiting" />
      }
      return result
   }

   return (

      <div className="cf ph2-ns">

         <div className="fl w-100 w-20-ns pa2">
            <p className="f6">
               <strong>{<FormattedMessage id="order.commercialRelease" />}</strong>
            </p>
            <span className="f7">
               {orderStatus(1, status) == "ok" ? <Success /> : orderStatus(1, status)}
            </span>
         </div>
         <div className="fl w-100 w-20-ns pa2">
            <p className="f6">
               <strong>{<FormattedMessage id="order.financeRelease" />}</strong>
            </p>
            <span className="f7">
               {orderStatus(2, status) == "ok" ? <Success /> : orderStatus(2, status)}
            </span>
         </div>
         <div className="fl w-100 w-20-ns pa2">
            <p className="f6">
               <strong>{<FormattedMessage id="order.separation" />}</strong>
            </p>
            <span className="f7">
               {orderStatus(3, status) == "ok" ? <Success /> : orderStatus(3, status)}
            </span>
         </div>
         <div className="fl w-100 w-20-ns pa2">
            <p className="f6">
               <strong>{<FormattedMessage id="order.dispatch" />}</strong>
            </p>
            <span className="f7">
               {orderStatus(4, status) == "ok" ? <Success /> : orderStatus(4, status)}
            </span>
         </div>
         <div className="fl w-100 w-20-ns pa2">
            <p className="f6">
               <strong>{<FormattedMessage id="order.delivery" />}</strong>
            </p>
            <span className="f7">
               {orderStatus(5, status) == "ok" ? <Success /> : orderStatus(5, status)}
            </span>
         </div>
      </div>
   )
}

export default OrderTracking