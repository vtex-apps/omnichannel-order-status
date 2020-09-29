import { json } from 'co-body'

export async function ordersMiddeware(ctx: Context, next: () => Promise<any>) {
  const {
    state: { order },
    clients: { orders: statusClient },
  } = ctx

  const appId = process.env.VTEX_APP_ID as string
  const settings = await ctx.clients.apps.getAppSettings(appId)
  const email = ctx.request.header['x-vtex-caller']
  const hostSite = ctx.request.header['x-forwarded-host']

  const { data: organizationId }: any = await statusClient.getOrganization(
    hostSite,
    email
  )

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getOrdersWithHeaders(
    order,
    settings.endpoint,
    settings.token,
    organizationId[0].organizationId
  )

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}

export async function ordersFilesMiddeware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    state: { order },
    clients: { orders: statusClient },
  } = ctx

  const appId = process.env.VTEX_APP_ID as string
  const settings = await ctx.clients.apps.getAppSettings(appId)
  const email = ctx.request.header['x-vtex-caller']
  const hostSite = ctx.request.header['x-forwarded-host']

  const { data: organizationId }: any = await statusClient.getOrganization(
    hostSite,
    email
  )

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getOrdersFilesWithHeaders(
    order,
    settings.endpoint,
    settings.token,
    organizationId[0].organizationId
  )

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}

export async function ordersPeriodMiddeware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    clients: { orders: statusClient },
  } = ctx

  const appId = process.env.VTEX_APP_ID as string
  const settings = await ctx.clients.apps.getAppSettings(appId)
  const email = ctx.request.header['x-vtex-caller']
  const hostSite = ctx.request.header['x-forwarded-host']

  const { data: organizationId }: any = await statusClient.getOrganization(
    hostSite,
    email
  )

  let body = await json(ctx.req)

  body = {
    ...body,
    revendaId: organizationId[0].organizationId,
  }

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.postOrdersPeriod(
    body,
    settings.endpoint,
    settings.token
  )

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])
  await next()
}
