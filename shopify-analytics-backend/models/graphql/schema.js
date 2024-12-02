const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLFloat } = require('graphql');
const Analytics = require('../models/Analytics');

// Define Order Type
const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        customer: {
            type: new GraphQLObjectType({
                name: 'Customer',
                fields: () => ({
                    firstName: { type: GraphQLString },
                    lastName: { type: GraphQLString }
                })
            })
        },
        lineItems: {
            type: new GraphQLList(
                new GraphQLObjectType({
                    name: 'LineItem',
                    fields: () => ({
                        title: { type: GraphQLString },
                        quantity: { type: GraphQLFloat },
                        price: { type: GraphQLString }
                    })
                })
            )
        }
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        orders: {
            type: new GraphQLList(OrderType),
            resolve(parent, args) {
                return Analytics.find();
            }
        }
    }
});

// Mutations (if needed for saving data)
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addOrder: {
            type: OrderType,
            args: {
                name: { type: GraphQLString },
                totalSales: { type: GraphQLFloat }
            },
            resolve(parent, args) {
                const analytics = new Analytics({
                    name: args.name,
                    totalSales: args.totalSales
                });
                return analytics.save();
            }
        }
    }
});

// Export Schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
