import { UserInputError } from '@vtex/api'

export async function orderValidationMiddleware(
  ctx: Context,
  next: () => Promise<any>
) {
  const {
    vtex: {
      route: { params },
    },
  } = ctx

  const { order } = params

  if (!order) {
    throw new UserInputError('Validation Error')
  }

  ctx.state.order = order.toString()

  await next()
}
