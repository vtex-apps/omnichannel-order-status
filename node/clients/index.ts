import { IOClients } from '@vtex/api'

import Ordersb2b from './order'

export class Clients extends IOClients {
  public get orders() {
    return this.getOrSet('orders', Ordersb2b)
  }
}
