import React, { useState, FunctionComponent } from 'react'
import { ContentWrapper } from 'vtex.my-account-commons'
import ApiB2B from '../Services/ApiB2b'
import { tableOrdersPeriod, tableOrders } from "./tableOrders"
import { FormattedMessage } from 'react-intl'
import { format } from 'date-fns'
import {
  DatePicker,
  Spinner,
  Alert,
  Button,
  Table,
  Input,
} from 'vtex.styleguide'

type typeOrder =  "orderWeb" | "orderERP" | "myOrder"

const OrdersB2B: FunctionComponent<Props> = ({}) => {
  const [formFileds, setFormFileds] = useState<any | {}>({
    inputOrderWeb: '',
    inputOrderErp: '',
    inputOrderInpt: '',
  })

  const [pedidoWebInputError, setOrderWebInputError] = useState<any | {}>({})
  const [dataPedidosWeb, setDataPedidoWeb] = useState<any | []>([])
  const [dataPedidoPeriod, setDataPedidoPeriod] = useState<any | []>([])

  const [dateInicial, setDateInicial] = useState(new Date())
  const [dateFim, setEndDateFim] = useState(new Date())

  const [loadSpinner, setLoadSpinner] = useState<boolean | false>(false)
  const [noResult, setNoResult] = useState<boolean | false>(false)

  const itensPeriodOrder = dataPedidoPeriod.itens
  const orders = [dataPedidosWeb]

  function validateOrderInput(type: typeOrder){
    switch(type){
      case "myOrder": {
        if (formFileds.inputOrderInpt === '') {
          setOrderWebInputError({
            ...pedidoWebInputError,
            inputOrderInpt: <FormattedMessage id="label.required" />,
          })
          return true;
        }
        return null;
      }
      case "orderWeb": {
        if (formFileds.inputOrderWeb === '') {
          setOrderWebInputError({
            ...pedidoWebInputError,
            inptOrderWeb: <FormattedMessage id="label.required" />,
          })
          return true;
        }
        return null;
      }
      case "orderERP": {
        if (formFileds.inputOrderErp === '') {
          setOrderWebInputError({
            ...pedidoWebInputError,
            inptOrderERP: <FormattedMessage id="label.required" />,
          })
          return true;
        }
        return null;
      }
      default: {
        return null;
      }
    }
  }

  async function searchMyOrder(type: typeOrder){
    const validation = validateOrderInput(type);

    if(!validation){
      setDataPedidoPeriod([])
      setLoadSpinner(true)
      setNoResult(false)

      try {
        const result = await ApiB2B.get('ordersb2b/' + formFileds.inputOrderWeb + formFileds.inputOrderErp, formFileds.inputOrderInpt)
        setLoadSpinner(false)
        setDataPedidoWeb(result.data)
      } catch (err) {
        setDataPedidoWeb([])
        setLoadSpinner(false)
        setNoResult(true)
      }
    }
  }

  async function searchOrderData() {
    setDataPedidoWeb([])
    setLoadSpinner(true)
    setNoResult(false)

    const parseDateIncial = format(dateInicial, 'yyyy-MM-dd')
    const parseDateFinal = format(dateFim, 'yyyy-MM-dd')

    try {
      const data = {
        porPeriodo: {
          dataInicial: parseDateIncial,
          dataFim: parseDateFinal,
        },
      }

      const result = await ApiB2B.post('/ordersb2b/date', data)
      setDataPedidoPeriod(result.data)
      setLoadSpinner(false)
    } catch (err) {
      setLoadSpinner(false)
      setNoResult(true)
    }
  }

  return (
    <ContentWrapper titleId="title.OrderPage" namespace="custom-page">
      {() => (
        <div>
          <div className="vtex_ordersb2b flex flex-column-s flex-row-ns">
            <div className="w-60-ns w-100-s">
              <form>
                <p className="f4">
                  {<FormattedMessage id="title.searchOrders" />}
                </p>
                <div className="w-80-l mb4 cf">
                  <div className="mw5-l fl w-100 w-60-s">
                    <Input
                      label={<FormattedMessage id="label.numberOrderWeb" />}
                      type="text"
                      size="small"
                      id="pedido_web"
                      name="pedido_web"
                      errorMessage={pedidoWebInputError.inptOrderWeb}
                      onChange={(e: any) => {
                        setFormFileds({
                          ...formFileds,
                          inputOrderWeb: e.target.value,
                        })
                        if (pedidoWebInputError.inptOrderWeb !== '') {
                          setOrderWebInputError({
                            ...pedidoWebInputError,
                            inptOrderWeb: '',
                          })
                        }
                      }}
                    ></Input>
                  </div>

                  <div className="fl mw4 w-100 ml2 mt6 w-30-s">
                    <Button
                      size="small"
                      variation="primary"
                      onClick={() => searchMyOrder("orderWeb")}
                    >
                      <FormattedMessage id="btn.search" />
                    </Button>
                  </div>
                </div>

                <div className="w-80-l mb4 cf">
                  <div className="mw5-l fl w-100 w-60-s">
                    <Input
                      size="small"
                      label={<FormattedMessage id="label.numberDigimess" />}
                      type="text"
                      id="digimess"
                      name="digimess"
                      errorMessage={pedidoWebInputError.inptOrderERP}
                      onChange={(e: any) => {
                        setFormFileds({
                          ...formFileds,
                          inputOrderErp: e.target.value,
                        })
                        if (pedidoWebInputError.inptOrderERP !== '') {
                          setOrderWebInputError({
                            ...pedidoWebInputError,
                            inptOrderERP: '',
                          })
                        }
                      }}
                    ></Input>
                  </div>
                  <div className="fl mw4 w-100 ml2 mt6 w-30-s">
                    <Button
                      size="small"
                      variation="primary"
                      onClick={() => searchMyOrder("orderERP")}
                    >
                      <FormattedMessage id="btn.search" />
                    </Button>
                  </div>
                </div>

                <div className="w-80-l b4 cf">
                  <div className="mw5-l fl w-100 w-60-s">
                    <Input
                      size="small"
                      label={<FormattedMessage id="label.myOrder" />}
                      type="text"
                      id="meu_pedido"
                      name="meu_pedido"
                      errorMessage={pedidoWebInputError.inputOrderInpt}
                      onChange={(e: any) => {
                        setFormFileds({
                          ...formFileds,
                          inputOrderInpt: e.target.value,
                        })
                        if (pedidoWebInputError.inputOrderInpt !== '') {
                          setOrderWebInputError({
                            ...pedidoWebInputError,
                            inputOrderInpt: '',
                          })
                        }
                      }}
                    ></Input>
                  </div>

                  <div className="fl mw4 w-100 ml2 mt6 w-30-s">
                    <Button
                      size="small"
                      variation="primary"
                      onClick={() => searchMyOrder("myOrder")}
                    >
                      <FormattedMessage id="btn.search" />
                    </Button>
                  </div>
                </div>
              </form>
            </div>

            <div className="w-60-ns w-100-s">
              <p className="f4">{<FormattedMessage id="title.searchDate" />}</p>

              <form className="flex">
                <div className="w-60-ns w-100">
                  <DatePicker
                    label={<FormattedMessage id="label.date" />}
                    id="start_data"
                    name="start_data"
                    className="w-100 ma0 border-box bw1 br2  b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f6 pv3 ph5"
                    value={dateInicial}
                    locale="pt-BR"
                    onChange={(date: any) => setDateInicial(date)}
                  />
                </div>

                <div className="w-60-ns w-100 ph2">
                  <DatePicker
                    label={<FormattedMessage id="label.dateUpTo" />}
                    id="end_data"
                    name="end_data"
                    className="w-100 ma0 border-box bw1 br2  b--solid outline-0 near-black b--light-gray hover-b--silver bg-white f6 pv3 ph5"
                    value={dateFim}
                    locale="pt-BR"
                    s
                    onChange={(date: any) => setEndDateFim(date)}
                  />
                </div>
              </form>
              <div className="db mt4">
                <Button
                  block
                  size="small"
                  variation="primary"
                  onClick={searchOrderData}
                >
                  <FormattedMessage id="btn.search" />
                </Button>
              </div>
            </div>
          </div>

          <div className="vtex_order-table flex flex-column-s flex-row-ns">
            <div className="w-100 mt7">
              {loadSpinner ? (
                <div className="tc">
                  <Spinner />
                </div>
              ) : dataPedidosWeb?.itens ? (
                <Table
                  fullWidth
                  dynamicRowHeight
                  schema={tableOrders}
                  items={orders}
                  density="high"
                />
              ) : (
                <div></div>
              )}

              {noResult ? (
                <Alert type="error" onClose={() => console.log('Closed!')}>
                  <FormattedMessage id="message.results" />
                </Alert>
              ) : (
                <div></div>
              )}

              {dataPedidoPeriod?.itens ? (
                <Table
                  fullWidth
                  dynamicRowHeight
                  schema={tableOrdersPeriod}
                  items={itensPeriodOrder}
                  density="high"
                />
              ) : (
                <div></div>
              )}
            </div>
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
    }
  }
}

export default OrdersB2B
