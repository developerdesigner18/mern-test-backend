import { gql } from 'apollo-server';
const user = require('../models/user.model')
const product = require('../models/product.model')
const typeDefs= gql `

type category {
    categoryName: String,
    totalSoldQty: Int
}

type pieChart {
    [category]
}


type Query{
    getPieChartData: pieChart!
}

`;



const resolvers ={  
    Query:{
        getPieChartData:async (_: any) => {
            const data = await product.find
        },
    }
}


export {typeDefs,resolvers}