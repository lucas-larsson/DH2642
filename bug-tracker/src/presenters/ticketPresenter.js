import { TicketView } from '../views'
import { useModelProperty } from '../hooks'

const TicketPresenter = ({ model }) => {
  const tickets = useModelProperty(model, 'tickets')
  return <TicketView ticket={tickets.find((t) => t.title === 'Ticket 1')} />
}

export default TicketPresenter
