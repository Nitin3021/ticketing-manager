import { Publisher, Subjects, TicketUpdatedEvent } from '@nptickets30/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}