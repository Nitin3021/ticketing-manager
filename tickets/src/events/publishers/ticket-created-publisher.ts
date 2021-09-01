import { Publisher, Subjects, TicketCreatedEvent } from '@nptickets30/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}