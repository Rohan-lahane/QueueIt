
const typeDefs = `
  type User {
    username: String!
    passwordHash: String!
    playlists: [Playlist]
    id: ID! 
  },

  type Playlist {
    title: String!
    description: String
    songs: [Song]
    id: ID!
  },

  type Token {
    value: String!
  }

  type Song {
    title: String!
    link: String!
    platform: String! 
  },

  type Query {
    findPlaylist(title: String!): Playlist
    findUser(id: String!): User
    me: User!
    allPlaylists : [Playlist]
  }

  type Mutation{

    createUser(username: String!, password: String! ): Token
    login(username: String!, password: String!) : Token

  }

`

module.exports = typeDefs