import mongoose from 'mongoose'
import { OrderCancelledEvent } from '@nptickets30/common'
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCancelledListener } from '../order-cancelled-listener' 
import { Ticket } from "../../../models/ticket"

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client)

  const orderId = mongoose.Types.ObjectId().toHexString()
  const ticket = Ticket.build({
    title: 'soccer',
    price: 23,
    userId: '12233',
  })
  ticket.set({ orderId })
  await ticket.save()

  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    }
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { msg, data, ticket, orderId, listener }
}

it ('updates ticket, publishes an event & acks message', async () => {
  const { msg, data, ticket, orderId, listener } = await setup()
  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)
  expect(updatedTicket!.orderId).not.toBeDefined()
  expect(msg.ack).toHaveBeenCalled()
  expect(natsWrapper.client.publish).toHaveBeenCalled()
})