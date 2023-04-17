const { gql } = require("graphql-tag");

const typeDefs = gql`
type Farm {
  farmId: ID!
  userId: ID!
  name: String!
  location: Location!
  size: Float!
  unit: Unit!
  description: String
  dateCreated: String!

}



type Location {
  latitude: Float!
  longitude: Float!
}

enum Unit {
  HECTARES
  ACRES
}
type User {
    userId: ID!
    email: String!
    displayName: String!
    profileImageURL: String
    role: Role!
    dateCreated: String!
  }
  
  enum Role {
    FARMER
    AGRONOMIST
    RESEARCHER
    OTHER
  }
  
  type Query {
    getUser(userId: ID!): User
    getUsers: [User!]!
    getFarm(farmId: ID!): Farm
    getFarms: [Farm!]!
    getFarmsByUserId(userId: ID!): [Farm!]!
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
    updateUser(userId: ID!, input: UpdateUserInput!): User!
    createFarm(input: CreateFarmInput!): Farm!
    updateFarm(farmId: ID!, input: UpdateFarmInput!): Farm!
  }
  
  input CreateUserInput {
    email: String!
    displayName: String!
    profileImageURL: String
    role: Role!
  }
  
  input UpdateUserInput {
    email: String
    displayName: String
    profileImageURL: String
    role: Role
  }

  
  input CreateFarmInput {
    userId: ID!
    name: String!
    location: LocationInput!
    size: Float!
    unit: Unit!
    description: String
  }
  
  input UpdateFarmInput {
    name: String
    location: LocationInput
    size: Float
    unit: Unit
    description: String
  }
  
  input LocationInput {
    latitude: Float!
    longitude: Float!
  }
  
`  

module.exports = typeDefs;
