import mongoose from 'mongoose'
import { Message } from 'node-nats-streaming'
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedListener } from '../ticket-updated-listener'
import { Ticket } from '../../../models/ticket'
import { TicketUpdatedEvent } from '@nptickets30/common'

const setup = async () => {
  // Create listener
  const listener = new TicketUpdatedListener(natsWrapper.client)

  // Create and save a ticket
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'soccer',
    price: 20
  })

  await ticket.save()

  // Create a fake data object
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new soccer',
    price: 921,
    userId: '123312'
  }

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  // return all these
  return { msg, data, ticket, listener }
}

it('finds, updates and saves a ticket', async () => {
  const { msg, data, ticket, listener } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.title).toEqual(data.title)
  expect(updatedTicket!.price).toEqual(data.price)
  expect(updatedTicket!.version).toEqual(data.version)
})

it('acks the message', async () => {
  const { msg, data, listener } = await setup()

  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version', async () => {
  const { msg, data, listener, ticket } = await setup()

  data.version = 10

  try {
    await listener.onMessage(data, msg)
  } catch (error) {}

  expect(msg.ack).not.toHaveBeenCalled()
})
