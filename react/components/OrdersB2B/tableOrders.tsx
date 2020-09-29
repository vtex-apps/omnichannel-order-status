import React from "react"
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { orderStatus } from "../../utils/order"
import { format } from 'date-fns'
import { FormattedCurrency } from 'vtex.format-currency'

export const tableOrdersPeriod = {
    properties: {
      pedidoErpId: {
        title: <FormattedMessage id="label.numberOrderWeb" />,
      },
      dataPedido: {
        title: <FormattedMessage id="table.orderDate" />,
        cellRenderer: ({ rowData }: any) => {
          return format(new Date(rowData.dataPedido), 'dd/MM/yyyy')
        },
      },
      notaFiscal: {
        title: <FormattedMessage id="table.invoice" />,
      },
      status: {
        title: <FormattedMessage id="table.orderStatus" />,
        cellRenderer: ({ rowData }: any) => {
          return orderStatus(rowData.status)
        },
      },
      totalPedido: {
        title: <FormattedMessage id="table.orderTotal" />,
        cellRenderer: ({ rowData }: any) => {
          return <FormattedCurrency value={rowData.totalPedido} />
        },
      },
      details: {
        title: <FormattedMessage id="table.details" />,
        cellRenderer: ({ rowData }: any) => {
          return (
            <Link className="" to={`b2b-order-details/${rowData.pedidoErpId}`}>
              <FormattedMessage id="table.details" />
            </Link>
          )
        },
      },
    },
  }

export const tableOrders = {
  properties: {
    pedidoErpId: {
      title: <FormattedMessage id="label.numberOrderWeb" />,
    },
    pedidoErp: {
      title: <FormattedMessage id="label.numberDigimess" />,
    },
    meuPedido: {
      title: <FormattedMessage id="label.myOrder" />,
    },
    status: {
      title: <FormattedMessage id="table.orderStatus" />,
      cellRenderer: ({ rowData }: any) => {
        return orderStatus(rowData.status)
      },
    },
    dataPedido: {
      title: <FormattedMessage id="table.orderDate" />,
      cellRenderer: ({ rowData }: any) => {
        return format(new Date(rowData.dataPedido), 'dd/MM/yyyy')
      },
    },
    valorTotalPedido: {
      title: <FormattedMessage id="table.orderTotal" />,
      cellRenderer: ({ rowData }: any) => {
        return <FormattedCurrency value={rowData.valorTotalPedido} />
      },
    },
    details: {
      title: <FormattedMessage id="table.details" />,
      cellRenderer: ({ rowData }: any) => {
        return (
          <Link className="" to={`b2b-order-details/${rowData.pedidoErpId}`}>
            <FormattedMessage id="table.details" />
          </Link>
        )
      },
    },
  },
}




