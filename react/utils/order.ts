export const orderStatus = (s: any) => {
  switch (s) {
    case -1:
      s = 'Cancelado'
      break
    case 0:
      s = 'Recebido'
      break
    case 1:
      s = 'Liberação Comercial'
      break
    case 2:
      s = 'Liberação Financeira'
      break
    case 3:
      s = 'Em Separação'
      break
    case 4:
      s = 'Despachado'
      break
    case 5:
      s = 'Entregue'
      break
    default:
      s = '----'
  }
  return s
}