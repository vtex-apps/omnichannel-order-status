import React, { useState, useEffect, FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import ApiB2B from '../Services/ApiB2b'
import OrderTracking from './orderTracking'

import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { format } from 'date-fns'
import { Link, Table, Alert } from 'vtex.styleguide'
import './style.global.css'

const OrderDatails: FunctionComponent<Props> = ({ match }) => {
  const [dataPedidos, setDataPedido] = useState<any | undefined>([])
  const [dataArquivos, setDataArquivos] = useState<any | undefined>([])
  const [isError, setIsError] = useState<boolean | false>(false)

  const idPedido = match.params.order.toString()

  const itens = dataPedidos.itens

  async function detailOrders() {
    try {
      const results = await ApiB2B.get('ordersb2b/' + idPedido)
      setDataPedido(results.data)
    } catch (err) {
      setIsError(true)
      console.warn('Pedido', err)
    }
  }

  async function arquivos() {
    try {
      const resultado = await ApiB2B.get('ordersb2b/files/' + idPedido)
      setDataArquivos(resultado.data)
    } catch (err) {
      setIsError(true)
      console.warn('Arquivos do pedido', err)
    }
  }

  useEffect(() => {
    arquivos(), detailOrders()
  }, [])

  const tableSchema = {
    properties: {
      descricaoDoProduto: {
        title: <FormattedMessage id="table.name" />,
      },
      valorUnitario: {
        title: <FormattedMessage id="table.price" />,
        cellRenderer: ({ rowData }: any) => {
          return <FormattedCurrency value={rowData.valorUnitario} />
        },
      },
      quantidade: {
        title: <FormattedMessage id="table.quantity" />,
      },
      valorTotal: {
        title: 'Total',
        cellRenderer: ({ rowData }: any) => {
          return <FormattedCurrency value={rowData.valorTotal} />
        },
      },
    },
  }

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
          {isError && (
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

            {isError ? (
              <div className="flex items-center h-100 c-muted-2 pa7-l">
                <div className="w-80 w-60-l center tc">
                  <span className="t-heading-4 mt0">Nothing to show.</span>
                </div>
              </div>
            ) : (
              <div className="flex justify-center con__address">
                <div className="mw9 center ph3-ns">
                  <div className="cf ph2-ns">
                    <div className="fl w-100 w-third-ns pa2">
                      <p>
                        <strong className="c-on-base">
                          {<FormattedMessage id="order.billingAddress" />}
                        </strong>
                      </p>
                      <table className="f6 w-100 mw8 ba b--black-10">
                        <tbody className="lh-copy">
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {dataPedidos.billingAddressCorpname}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.address" />}:
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.billingAddressFormattedAddres}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {dataPedidos.billingAddressCity}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.billingAddressState}
                            </td>
                          </tr>
                          <tr>
                            <td className=" pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.zipCode" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.billingAddresszipcode}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="fl w-100 w-third-ns pa2">
                      <p>
                        <strong className="c-on-base">
                          {<FormattedMessage id="order.deliveryAddress" />}
                        </strong>
                      </p>

                      <table className="f6 w-100 mw8 ba b--black-10">
                        <tbody className="lh-copy">
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {dataPedidos.deliveryAddressCorpname}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.address" />}:
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.deliveryAddressFormattedAddres}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {dataPedidos.deliveryAddressCity}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.deliveryAddressState}
                            </td>
                          </tr>
                          <tr>
                            <td className=" pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.zipCode" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.deliveryAddresszipcode}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="fl w-100 w-third-ns pa2">
                      <p>
                        <strong className="c-on-base">
                          {<FormattedMessage id="order.otherInformations" />}
                        </strong>
                      </p>

                      <table className="f6 w-100 mw8 ba b--black-10">
                        <tbody className="lh-copy">
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.methodPayment" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.paymentMethod}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.optionPayment" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.paymentOptions}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.deliveryMethod" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.deliveryMethod}
                            </td>
                          </tr>
                          <tr>
                            <td className="pv3 pr3 bb tl b--black-10">
                              {<FormattedMessage id="table.carrierLink" />}
                            </td>
                            <td className="pv3 pr3 bb tr b--black-10">
                              {dataPedidos.linkTransportadora}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="order.purchaseData" />}
            </div>

            <div className="overflow-auto mt7 mb7">
              <Table
                fullWidth
                schema={tableSchema}
                items={itens}
                density="high"
              />
            </div>

            {!isError && (
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

            {isError ? (
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
