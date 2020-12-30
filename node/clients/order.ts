import {
  ExternalClient,
  InstanceOptions,
  IOContext,
  IOResponse,
} from '@vtex/api'

export default class Orders extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, options)
  }

  public async getOrganization(
    hostSite: String,
    email: String
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(
      `http://${hostSite}/api/dataentities/CL/search?_fields=companyId&_where=email=${email}`,
      {
        metric: 'get-email',
      }
    )
  }

  public async getOrdersWithHeaders(
    order: String,
    endpoint: String,
    token: String,
    revendaId: String
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(
      endpoint +
        '/api/v1/pedido/?pedidoErpId=' +
        order +
        '&revendaId=' +
        revendaId,
      {
        metric: 'status-get-raw',
        headers: {
          Authorization: 'Bearer ' + token + '',
        },
      }
    )
  }

  public async getOrdersFilesWithHeaders(
    order: String,
    endpoint: String,
    token: String,
    revendaId: String
  ): Promise<IOResponse<string>> {
    return this.http.getRaw(
      endpoint +
        '/api/v1/arquivospedido?pedidoErpId=' +
        order +
        '&revendaId=' +
        revendaId,
      {
        metric: 'status-get-raw',
        headers: {
          Authorization: 'Bearer ' + token + '',
        },
      }
    )
  }

  public async postOrdersPeriod(
    body: any,
    endpoint: String,
    token: String
  ): Promise<IOResponse<string>> {
          return this.http.postRaw(endpoint + '/api/v1/pedido/pesquisa', body, {
      metric: 'get-order',
      headers: {
        Authorization: 'Bearer ' + token + '',
        'Content-Type': 'application/json',
      },
    })
  }
}
