import { Subjects, Publisher, PaymentCreatedEvent } from '@nptickets30/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}