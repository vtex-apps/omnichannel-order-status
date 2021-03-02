import { ClientsConfig, Service, ServiceContext } from '@vtex/api'

import { Clients } from './clients'
import {
  ordersMiddleware,
  ordersFilesMiddleware,
  ordersPeriodMiddleware,
} from './middlewares/orders'

import { orderValidationMiddleware } from './middlewares/oderValidation'

const TIMEOUT_MS = 10000

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients, State>
  interface State {
    order: String
  }
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State>({
  clients,
  routes: {
    // `status` is the route ID from service.json. It maps to an array of middlewares (or a single handler).
    ordersb2b: [orderValidationMiddleware, ordersMiddleware],
    ordersFiles: [orderValidationMiddleware, ordersFilesMiddleware],
    ordersDate: [ordersPeriodMiddleware],
  },
})
