import { Ticket } from "../ticket";

it('implements optimistic concurrency control', async () => {
  // Create an instace of a ticket
  const ticket = Ticket.build({
    title: 'movie',
    price: 5,
    userId: '12331'
  })

  // Save the tickete to the DB
  await ticket.save()

  // fetch ticket twice
  const firstInstance = await Ticket.findById(ticket.id)
  const secondInstance = await Ticket.findById(ticket.id)

  // make two separate changes to the tickets fetched
  firstInstance!.set({ price: 10 })
  secondInstance!.set({ price:15 })

  // save first fetched ticket
  await firstInstance!.save()

  // save second fetched ticket & expect error due to outdated version.
  try {
    await secondInstance!.save()
  } catch (error) {
    return
  }

  throw new Error('Should not reach this statement!')
})

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'boxing',
    price: 25,
    userId: '12412'
  })

  await ticket.save()
  expect(ticket.version).toEqual(0)
  await ticket.save()
  expect(ticket.version).toEqual(1)
  await ticket.save()
  expect(ticket.version).toEqual(2)
})