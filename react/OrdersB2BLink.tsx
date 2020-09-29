import { FunctionComponent } from 'react'
import { InjectedIntlProps, injectIntl } from 'react-intl'

const OrdersB2BLink: FunctionComponent<Props> = ({ render, intl }) => {
   return render([
      {
         name: intl.formatMessage({
            id: 'b2bOrders.link',
         }),
         path: '/b2b-order',
      },
   ])
}

interface Props extends InjectedIntlProps {
   render: (args: { name: string; path: string }[]) => any
}

export default injectIntl(OrdersB2BLink)