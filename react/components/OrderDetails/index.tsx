import React, { useState, useEffect, FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import ApiB2B from '../Services/ApiB2b'
import OrderTracking from './orderTracking'

import { FormattedMessage } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

import { format } from 'date-fns'

import { Link, Table } from 'vtex.styleguide'

const OrderDatails: FunctionComponent<Props> = ({ match }) => {
  const [dataPedidos, setDataPedido] = useState<any | undefined>([])
  const [dataArquivos, setDataArquivos] = useState<any | undefined>([])

  const idPedido = match.params.order.toString()

  const itens = dataPedidos.itens

  async function detailOrders() {
    try {
      const results = await ApiB2B.get('ordersb2b/' + idPedido)
      setDataPedido(results.data)
    } catch (err) {
      console.warn('Pedido', err)
    }
  }

  async function arquivos() {
    try {
      const resultado = await ApiB2B.get('ordersb2b/files/' + idPedido)
      setDataArquivos(resultado.data)
    } catch (err) {
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
    <ContentWrapper titleId="titleOrderDetails" namespace="custom-page">
      {() => (
        <div>
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

            <div className="mw9 center tc ph3-ns bg-black-10 ic__tracking">
              <OrderTracking status={dataPedidos.status} />
            </div>

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
                            {dataPedidos.corpname}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">E-mail</td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.corpemail}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.address" />}:
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.formattedAddres}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">
                            {dataPedidos.cityState}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.cityState}
                          </td>
                        </tr>
                        <tr>
                          <td className=" pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.zipCode" />}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.zipcode}
                          </td>
                        </tr>
                        <tr>
                          <td className=" pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.methodPayment" />}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.methodPayment}
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
                            {dataPedidos.corpname}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">E-mail</td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.corpemail}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.address" />}:
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.formattedAddres}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">
                            {dataPedidos.cityState}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.cityState}
                          </td>
                        </tr>
                        <tr>
                          <td className=" pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.zipCode" />}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.zipcode}
                          </td>
                        </tr>
                        <tr>
                          <td className=" pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.methodPayment" />}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.methodPayment}
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
                            {dataPedidos.methodPayment}
                          </td>
                        </tr>
                        <tr>
                          <td className="pv3 pr3 bb tl b--black-10">
                            {<FormattedMessage id="table.optionPayment" />}
                          </td>
                          <td className="pv3 pr3 bb tr b--black-10">
                            {dataPedidos.methodPaymentInfo}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

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

            <div className="t-heading-4 mt6 mb5">
              {<FormattedMessage id="title.serviceTax" />}
            </div>

            <ul className="pa0 ma0">
              {dataArquivos.itens?.map((item: any, index: number) => (
                <li key={index} className="pa3 dib">
                  <Link href={item.url} target="_blank">
                    {item.descricao}
                  </Link>
                </li>
              ))}
            </ul>
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
