require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");
const { expressMiddleware } = require("@apollo/server/express4");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");

const http = require("http");
const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('dist'))

const spotifyWebApi = require('spotify-web-api-node')


const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const User = require("./models/user");

const typeDefs = require("./schemas");
const resolvers = require("./resolvers");
const SpotifyWebApi = require("spotify-web-api-node");
global.access_token = '';

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });



const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
const clientId= process.env.SPOTIFY_CLIENT_ID
const redirectUri= 'http://localhost:5173'

// console.log("spotify ids", clientId, redirectUri)


app.post("/refresh", (req, res) => {
  
  const refreshToken = req.body.refreshToken
  console.log("refresh called, ", refreshToken)
  const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
      console.log("refresh backend token", data.body.access_token)
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
  })

app.post('/login', (req, res)=>{

  
  const code = req.body.code
  console.log("login called", code)

  const spotifyWebApi = new SpotifyWebApi({
    redirectUri : redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
  })

  spotifyWebApi.authorizationCodeGrant(code).then((data)=>{
    res.json({
      accessToken: data.body.access_token,
      refreshToken:data.body.refresh_token,
      expiresIn: data.body.expires_in
    })

    console.log("login backend token", data.body.access_token)
  }).catch((err)=>{
    console.log("error spotify api",err)
    res.sendStatus(400)
  })

})

// setup is now within a function
const start = async () => {
 
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/",
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

 


  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        console.log("as requested:: ", req.body);
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  const PORT = process.env.Port || 4000;

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};

start();
