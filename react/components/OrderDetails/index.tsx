import React, { useState, useEffect, FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import ApiB2B from '../Services/ApiB2b'
import OrderTracking from './orderTracking'

import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { format } from 'date-fns'
import { Link, Alert, Spinner, EXPERIMENTAL_Table } from 'vtex.styleguide'
 import  useTableMeasures  from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import './style.global.css'


import {
  tableSchemaProducts,
tableSchemaBillingAddress,
tableSchemaDeliveryAddress,
tableSchemaOtherInformations
} from "./tableStructure"

const OrderDatails: FunctionComponent<Props> = ({ match }) => {
  const [dataOrder, setDataOrder] = useState<any | undefined>([])
  const [dataFiles, setDataFile] = useState<any | undefined>([])

  const [isLoading, setisLoading] = useState<boolean | false>(false)
  const [isErrorDataOrder, setIsErrorDataOrder] = useState<boolean | false>(false)
  const [isErrorDataFile, setIsErrorDataFile] = useState<boolean | false>(false)

  const idOrder = match.params.order.toString()

  const itensOthersInformations = [
    {
    paymentMethod: dataOrder.paymentMethod,
    paymentOptions: dataOrder.paymentOptions,
    deliveryMethod: dataOrder.deliveryMethod,
    linkTransportadora: dataOrder.linkTransportadora
    }
  ]

  const itensDeliveryAddress = [
    {
      deliveryAddressCorpname: dataOrder.deliveryAddressCorpname,
      billingAddressCity: dataOrder.billingAddressCity,
      billingAddressState: dataOrder.billingAddressState,
      billingAddresszipcode: dataOrder.billingAddresszipcode
    }
  ]

  const itensBillingAddress = [
    {
      deliveryAddressCorpname: dataOrder.deliveryAddressCorpname,
      billingAddressFormattedAddres: dataOrder.billingAddressFormattedAddres,
      billingAddressCity: dataOrder.billingAddressCity,
      billingAddressState: dataOrder.billingAddressState,
      billingAddresszipcode: dataOrder.billingAddresszipcode
    }
  ]

  const measuresProducts = useTableMeasures({ size: dataOrder.itens?.length })
  const measuresOthersInformations = useTableMeasures({ size: itensOthersInformations?.length })
  const measuresDeliveryAddress = useTableMeasures({ size: itensDeliveryAddress?.length })
  const measureBillingAddress = useTableMeasures({ size: itensBillingAddress?.length })

  async function detailOrders() {
    setisLoading(true)
    try {
      const results = await ApiB2B.get('ordersb2b/' + idOrder)
      setDataOrder(results.data)
    } catch (err) {
      setIsErrorDataOrder(true)
      console.warn('Pedido', err)
    } finally {
      setisLoading(false)
    }
  }

  async function getFiles() {
    try {
      const result = await ApiB2B.get('ordersb2b/files/' + idOrder)
      setDataFile(result.data)
    } catch (err) {
      setIsErrorDataFile(true)
      console.warn('Arquivos do pedido', err)
    }
  }

  useEffect(() => {
    getFiles(), detailOrders()
  }, [])

   return (
    <ContentWrapper
      titleId="titleOrderDetails"
      namespace="custom-page"
      backButton={{
        title: "return",
        titleId: "titleOrderDetails",
        path: "/b2b-order"
      }
    }>
      {() => (
        <div>
          {isErrorDataOrder && (
            <Alert type="error" onClose={() => console.log('Closed!')}>
              <FormattedMessage id="message.error" />
            </Alert>
          )}
          <div className="vtex_orders-detail c-on-base">
            <table className="f6 w-100 mw8">
              <tbody className="lh-copy">
                <tr>
                  <td className="fw6 pv3 pr3 bb tl b--black-20 c-on-base">
                    {<FormattedMessage id="label.numberOrderWeb" />}
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataOrder.pedidoErpId}
                  </td>
                </tr>
                <tr>
                  <td className="fw6 pv3 pr3 bb tl b--black-20 c-on-base">
                    {<FormattedMessage id="table.orderDate" />}
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataOrder.dataPedido
                      ? format(new Date(dataOrder.dataPedido), 'dd/MM/yyyy')
                      : dataOrder.dataPedido}
                  </td>
                </tr>
                <tr>
                  <td className="fw6 pv3 pr3 bb tl b--black-20 c-on-base">
                    {<FormattedMessage id="table.name" />}
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataOrder.clienteFinalNome}
                  </td>
                </tr>
                <tr>
                  <td className="fw6  pr3 bb tl b--black-20 c-on-base">
                    CPF/CNPJ
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataOrder.clienteFinalCpf}
                    {dataOrder.clienteFinalCnpj}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="order.tracking" />}
            </div>

            <div>
              <OrderTracking status={dataOrder.status} />
            </div>

            {isErrorDataOrder ? (
              <div className="flex items-center h-100 c-muted-2 pa7-l">
                <div className="w-80 w-60-l center tc">
                  <span className="t-heading-4 mt0">Nothing to show.</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.billingAddress" />}
                    </strong>
                  </p>
                  {isLoading ? (
                    <div className="tc">
                      <Spinner />
                    </div>
                  ) : (
                    <EXPERIMENTAL_Table
                      measures={measureBillingAddress}
                      columns={tableSchemaBillingAddress}
                      items={itensBillingAddress}
                    />
                  )}
                </div>

                <div className="w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.deliveryAddress" />}
                    </strong>
                  </p>
                  {isLoading ? (
                    <div className="tc">
                      <Spinner />
                    </div>
                  ) : (
                    <EXPERIMENTAL_Table
                      measures={measuresDeliveryAddress}
                      columns={tableSchemaDeliveryAddress}
                      items={itensDeliveryAddress}
                    />
                  )}
                </div>

                <div className="w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.otherInformations" />}
                    </strong>
                  </p>
                  {isLoading ? (
                    <div className="tc">
                      <Spinner />
                    </div>
                  ) : (
                    <EXPERIMENTAL_Table
                      measures={measuresOthersInformations}
                      columns={tableSchemaOtherInformations}
                      items={itensOthersInformations}
                    />
                  )}
                </div>
              </div>
            )}

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="order.purchaseData" />}
            </div>

            <div className="overflow-auto mt7 mb7">
            {isLoading ? (
              <div className="tc">
                <Spinner />
              </div>
            ) : (
              <EXPERIMENTAL_Table
                measures={measuresProducts}
                columns={tableSchemaProducts}
                items={dataOrder.itens}
              />
            )}
            </div>

            {!isErrorDataOrder && (
            <div className="order_-summary tr">
              <div className="w-100 mw6 dib">
                <table className="f6 w-100 ba b--black-10">
                  <tbody className="lh-copy">
                    <tr>
                      <td className="fw5 pv3 pr3 bb tl b--black-10">
                        Sub-total:
                      </td>
                      <td className="pv3 pr3 bb tr b--black-10">
                        <FormattedCurrency
                          value={
                            dataOrder.valorTotalPedido -
                            dataOrder.valorFrete
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="fw5 pv3 pr3 bb tl b--black-10">
                        {<FormattedMessage id="table.freight" />}:
                      </td>
                      <td className="pv3 pr3 bb tr b--black-10">
                        <FormattedCurrency value={dataOrder.valorFrete} />
                      </td>
                    </tr>
                    <tr>
                      <td className="fw5 pv3 pr3 bb tl b--black-10">
                        {<FormattedMessage id="table.orderTotal" />}:
                      </td>
                      <td className="pv3 pr3 bb tr b--black-10">
                        <FormattedCurrency
                          value={dataOrder.valorTotalPedido}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            )}

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="title.serviceTax" />}
            </div>

            {isErrorDataFile ? (
              <div className="flex items-center h-100 c-muted-2 pa7-l">
                <div className="w-80 w-60-l center tc">
                  <span className="t-heading-4 mt0">Nothing to show.</span>
                </div>
              </div>
            ) : (
            <ul className="pa0 ma0">
              {dataFiles.itens?.map((item: any, index: number) => (
                <li key={index} className="pa3 dib">
                  <Link href={item.url} target="_blank">
                    {item.descricao}
                  </Link>
                </li>
              ))}
            </ul>
            )}
          </div>
        </div>
      )}
    </ContentWrapper>
  )
}

type Props = {
  match: {
    params: {
      param: string
      order: string
    }
  }
}

export default OrderDatails
