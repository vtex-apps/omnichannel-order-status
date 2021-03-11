import React from "react"
import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

export const tableSchemaProducts = [
  {
    id: 'descricaoDoProduto',
    title: <FormattedMessage id='table.name' />
  },
  {
    id: 'valorUnitario',
    title: <FormattedMessage id='table.price' />,
    cellRenderer: ({ data }: any) => {
      return <FormattedCurrency value={data} />
    }
  },
  {
    id: 'quantidade',
    title: <FormattedMessage id='table.quantity' />
  },
  {
    id: 'valorTotal',
    title: 'Total',
    cellRenderer: ({ data }: any) => {
      return <FormattedCurrency value={data} />
    },
  }
]

export const tableSchemaBillingAddress = [
  {
    id: 'deliveryAddressCorpname',
    title: <FormattedMessage id='order.deliveryAddress' />
  },
  {
    id: 'billingAddressFormattedAddres',
    title: <FormattedMessage id='table.address' />
  },
  {
    id: 'billingAddressCity',
    title: <FormattedMessage id='table.city' />
  },
  {
    id: 'billingAddressState',
    title: <FormattedMessage id='table.state' />
  },
  {
    id: 'billingAddresszipcode',
    title: <FormattedMessage id='table.zipCode' />
  }
]

export const tableSchemaDeliveryAddress = [
  {
    id: 'deliveryAddressCorpname',
    title: <FormattedMessage id='order.deliveryAddress' />
  },
  {
    id: 'billingAddressCity',
    title: <FormattedMessage id='table.city' />
  },
  {
    id: 'billingAddressState',
    title: <FormattedMessage id='table.state' />
  },
  {
    id: 'billingAddresszipcode',
    title: <FormattedMessage id='table.zipCode' />
  },
]

export const tableSchemaOtherInformations = [
  {
    id: 'paymentMethod',
    title: <FormattedMessage id='table.methodPayment' />
  },
  {
    id: 'paymentOptions',
    title: <FormattedMessage id='table.optionPayment' />
  },
  {
    id: 'deliveryMethod',
    title: <FormattedMessage id='table.deliveryMethod' />
  },
  {
    id: 'linkTransportadora',
    title: <FormattedMessage id='table.carrierLink' />
  },
]
