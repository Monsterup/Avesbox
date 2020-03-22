module.exports = {
    types: `
        type FeedStock{
            _id: ID!
            number: Int!
            feed: Feed!
            feedWarehouse: FeedWarehouse!
            creator: User!
            createdAt: String!
            updatedAt: String!
            deletedAt: String
        }

        type FeedStocks{
            totalCount: Int!
            feedStocks: [FeedStock!]
        }

        type CheckDeleteFeedStock{
            deleted: Boolean!
        }
    `
    ,
    queries: `
        feedStocks(keyword: String, limit: Int, skip: Int): FeedStocks
        feedStocksWarehouse(warehouseId: ID!): [FeedStock!]!
        feedStock(_id: ID!): FeedStock
    `
    ,
    mutations: `
        createFeedStock(feedStockInput: FeedStockInput): FeedStock
        updateFeedStock(_id: String!, updateFeedStockInput: UpdateFeedStockInput): FeedStock
        deleteFeedStock(_id: String!): CheckDeleteFeedStock
    `
    ,
    inputs: `
        input FeedStockInput{
            number: Int!
            feed: String!
            feedWarehouse: String!
        }
        input UpdateFeedStockInput{
            number: Int
            feed: String
            feedWarehouse: String
        }
    `
};