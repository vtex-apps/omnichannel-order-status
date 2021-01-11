import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

interface TrackingProps {
   status: number
}

const OrderTracking: FunctionComponent<TrackingProps> = ({status}) => {
	function orderStatusDot(meuNum: Number, status: Number){
		if(meuNum <= status){
				return "milestone--reached"
		}
		return ""
	}

	function orderStatusBar(status: number){
		if(status > 4){
			return "100%"
		}

		return `${(Number(17) * status)}%`
	}

	return (
		<div className="progress-bar" role="progressbar">
			<span className="progress" style={{"width": `${orderStatusBar(status)}`}}></span>
			<div className={`milestone ${orderStatusDot(1, status)}`}>
				<label className="c-on-base">{<FormattedMessage id="order.commercialRelease" />}</label>
			</div>
			<div className={`milestone ${orderStatusDot(2, status)}`}>
				<label className="c-on-base"><FormattedMessage id="order.financeRelease" /></label>
			</div>
			<div className={`milestone ${orderStatusDot(3, status)}`}>
				<label className="c-on-base"><FormattedMessage id="order.separation" /></label>
			</div>
			<div className={`milestone ${orderStatusDot(4, status)}`}>
				<label className="c-on-base"><FormattedMessage id="order.dispatch" /></label>
			</div>
			<div className={`milestone ${orderStatusDot(5, status)}`}>
				<label className="c-on-base"><FormattedMessage id="order.delivery" /></label>
			</div>
		</div>
	)
}

export default OrderTracking