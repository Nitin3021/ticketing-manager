import { Publisher, OrderCancelledEvent, Subjects } from '@nptickets30/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
