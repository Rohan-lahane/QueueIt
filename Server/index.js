
require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const typeDefs = require('./schemas')
const resolvers = require('./resolvers')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const server = new ApolloServer({
    typeDefs, 
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null

        console.log("request sent :", req.body.query)
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.JWT_SECRET
          )
          const currentUser = await User
            .findById(decodedToken.id)

          console.log("logged in user backend: ", currentUser) 
          return { currentUser }
        }
      },
  }).then(({ url }) => {

    console.log(`Server ready at ${url}`)
  })