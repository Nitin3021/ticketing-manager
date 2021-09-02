import { Publisher, OrderCreatedEvent, Subjects } from "@nptickets30/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}