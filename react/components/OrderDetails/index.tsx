import React, { useState, useEffect, FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import ApiB2B from '../Services/ApiB2b'
import OrderTracking from './orderTracking'

import { FormattedMessage, useIntl } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { format } from 'date-fns'
import { Link, Alert, EXPERIMENTAL_Table } from 'vtex.styleguide'
 import  useTableMeasures  from '@vtex/styleguide/lib/EXPERIMENTAL_Table/hooks/useTableMeasures'
import './style.global.css'

const OrderDatails: FunctionComponent<Props> = ({ match }) => {
  const [dataPedidos, setDataPedido] = useState<any | undefined>([])
  const [dataArquivos, setDataArquivos] = useState<any | undefined>([])

  const [isLoading, setisLoading] = useState<boolean | false>(false)
  const [isErrorDataOrder, setIsErrorDataOrder] = useState<boolean | false>(false)
  const [isErrorDataFile, setIsErrorDataFile] = useState<boolean | false>(false)
  const intl = useIntl()
  const idPedido = match.params.order.toString()

  const itensOthersInformations = [
    {
    paymentMethod: dataPedidos.paymentMethod,
    paymentOptions: dataPedidos.paymentOptions,
    deliveryMethod: dataPedidos.deliveryMethod,
    linkTransportadora: dataPedidos.linkTransportadora
    }
  ]

  const itensDeliveryAddress = [
    {
      deliveryAddressCorpname: dataPedidos.deliveryAddressCorpname,
      billingAddressCity: dataPedidos.billingAddressCity,
      billingAddressState: dataPedidos.billingAddressState,
      billingAddresszipcode: dataPedidos.billingAddresszipcode
    }
  ]

  const itensBillingAddress = [
    {
      deliveryAddressCorpname: dataPedidos.deliveryAddressCorpname,
      billingAddressFormattedAddres: dataPedidos.billingAddressFormattedAddres,
      billingAddressCity: dataPedidos.billingAddressCity,
      billingAddressState: dataPedidos.billingAddressState,
      billingAddresszipcode: dataPedidos.billingAddresszipcode
    }
  ]

  const tableSchemaProducts = [
    {
      id: 'descricaoDoProduto',
      title: intl.formatMessage({ id: 'table.name'})
    },
    {
      id: 'valorUnitario',
      title: intl.formatMessage({ id: 'table.price'}),
      cellRenderer: ({ data }: any) => {
        return <FormattedCurrency value={data} />
      }
    },
    {
      id: 'quantidade',
      title: intl.formatMessage({ id: 'table.quantity'})
    },
    {
      id: 'valorTotal',
      title: 'Total',
      cellRenderer: ({ data }: any) => {
        return <FormattedCurrency value={data} />
      },
    }
  ]

  const tableSchemaBillingAddress = [
    {
      id: 'deliveryAddressCorpname',
      title: intl.formatMessage({ id: 'order.deliveryAddress'})
    },
    {
      id: 'billingAddressFormattedAddres',
      title: intl.formatMessage({ id: 'table.address'})
    },
    {
      id: 'billingAddressCity',
      title: intl.formatMessage({ id: 'table.city'})
    },
    {
      id: 'billingAddressState',
      title: intl.formatMessage({ id: 'table.state'})
    },
    {
      id: 'billingAddresszipcode',
      title: intl.formatMessage({ id: 'table.zipCode'})
    }
  ]

  const tableSchemaDeliveryAddress = [
    {
      id: 'deliveryAddressCorpname',
      title: intl.formatMessage({ id: 'order.deliveryAddress'})
    },
    {
      id: 'billingAddressCity',
      title: intl.formatMessage({ id: 'table.city'})
    },
    {
      id: 'billingAddressState',
      title: intl.formatMessage({ id: 'table.state'})
    },
    {
      id: 'billingAddresszipcode',
      title: intl.formatMessage({ id: 'table.zipCode'})
    },
  ]

  const tableSchemaOtherInformations = [
    {
      id: 'paymentMethod',
      title: intl.formatMessage({ id: 'table.methodPayment'})
    },
    {
      id: 'paymentOptions',
      title: intl.formatMessage({ id: 'table.optionPayment'})
    },
    {
      id: 'deliveryMethod',
      title: intl.formatMessage({ id: 'table.deliveryMethod'})
    },
    {
      id: 'linkTransportadora',
      title: intl.formatMessage({ id: 'table.carrierLink'})
    },
  ]

  const measuresProducts = useTableMeasures({ size: dataPedidos.itens?.length })
  const measuresOthersInformations = useTableMeasures({ size: itensOthersInformations?.length })
  const measuresDeliveryAddress = useTableMeasures({ size: itensDeliveryAddress?.length })
  const measureBillingAddress = useTableMeasures({ size: itensBillingAddress?.length })

  async function detailOrders() {
    setisLoading(true)
    try {
      const results = await ApiB2B.get('ordersb2b/' + idPedido)
      setDataPedido(results.data)
    } catch (err) {
      setIsErrorDataOrder(true)
      console.warn('Pedido', err)
    } finally {
      setisLoading(false)
    }
  }

  async function arquivos() {
    try {
      const resultado = await ApiB2B.get('ordersb2b/files/' + idPedido)
      setDataArquivos(resultado.data)
    } catch (err) {
      setIsErrorDataFile(true)
      console.warn('Arquivos do pedido', err)
    }
  }

  useEffect(() => {
    arquivos(), detailOrders()
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
                    {dataPedidos.pedidoErpId}
                  </td>
                </tr>
                <tr>
                  <td className="fw6 pv3 pr3 bb tl b--black-20 c-on-base">
                    {<FormattedMessage id="table.orderDate" />}
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataPedidos.dataPedido
                      ? format(new Date(dataPedidos.dataPedido), 'dd/MM/yyyy')
                      : dataPedidos.dataPedido}
                  </td>
                </tr>
                <tr>
                  <td className="fw6 pv3 pr3 bb tl b--black-20 c-on-base">
                    {<FormattedMessage id="table.name" />}
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataPedidos.clienteFinalNome}
                  </td>
                </tr>
                <tr>
                  <td className="fw6  pr3 bb tl b--black-20 c-on-base">
                    CPF/CNPJ
                  </td>
                  <td className="pv3 pr3 bb tr b--black-20">
                    {dataPedidos.clienteFinalCpf}
                    {dataPedidos.clienteFinalCnpj}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="order.tracking" />}
            </div>

            <div>
              <OrderTracking status={dataPedidos.status} />
            </div>

            {isErrorDataOrder ? (
              <div className="flex items-center h-100 c-muted-2 pa7-l">
                <div className="w-80 w-60-l center tc">
                  <span className="t-heading-4 mt0">Nothing to show.</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="fl w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.billingAddress" />}
                    </strong>
                  </p>
                  <EXPERIMENTAL_Table
                    measures={measureBillingAddress}
                    columns={tableSchemaBillingAddress}
                    items={itensBillingAddress}
                    loading={isLoading}
                  />
                </div>

                <div className="fl w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.deliveryAddress" />}
                    </strong>
                  </p>
                  <EXPERIMENTAL_Table
                    measures={measuresDeliveryAddress}
                    columns={tableSchemaDeliveryAddress}
                    items={itensDeliveryAddress}
                    loading={isLoading}
                  />
                </div>

                <div className="fl w-100 pa2">
                  <p>
                    <strong className="c-on-base">
                      {<FormattedMessage id="order.otherInformations" />}
                    </strong>
                  </p>
                  <EXPERIMENTAL_Table
                    measures={measuresOthersInformations}
                    columns={tableSchemaOtherInformations}
                    items={itensOthersInformations}
                    loading={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="order.purchaseData" />}
            </div>

            <div className="overflow-auto mt7 mb7">
              <EXPERIMENTAL_Table
                measures={measuresProducts}
                columns={tableSchemaProducts}
                items={dataPedidos.itens}
                loading={isLoading}
              />
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
                            dataPedidos.valorTotalPedido -
                            dataPedidos.valorFrete
                          }
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="fw5 pv3 pr3 bb tl b--black-10">
                        {<FormattedMessage id="table.freight" />}:
                      </td>
                      <td className="pv3 pr3 bb tr b--black-10">
                        <FormattedCurrency value={dataPedidos.valorFrete} />
                      </td>
                    </tr>
                    <tr>
                      <td className="fw5 pv3 pr3 bb tl b--black-10">
                        {<FormattedMessage id="table.orderTotal" />}:
                      </td>
                      <td className="pv3 pr3 bb tr b--black-10">
                        <FormattedCurrency
                          value={dataPedidos.valorTotalPedido}
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
              {dataArquivos.itens?.map((item: any, index: number) => (
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
