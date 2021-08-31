import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
  var signin: () => string[]
}

let mongo: any

beforeAll(async () => {
  process.env.JWT_KEY = 'testingpurposeonly!'

  mongo = await MongoMemoryServer.create()

  await mongoose.connect(mongo.getUri(), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  // Build a JWT payload. {id, email}
  const payload = {
    id: '1231281y23j',
    email: 'test@testing.com'
  }

  // Creating JWT.
  const token = jwt.sign(payload, process.env.JWT_KEY!)
  const session = { jwt: token }
  const sessionJSON = JSON.stringify(session)
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string thats the cookie with the encoded data.
  return [`express:sess=${base64}`]

}
