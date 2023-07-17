const {gql} = require('apollo-server')
const user = require('../models/user.model')
const product = require('../models/product.model')
const typeDefs= gql `

type category {
    categoryName: String,
    number: Int
}

type pieChart {
    category:[category]
}

type country {
    countryName: String,
    number: Int
}

type heatMap {
    country:[country]
}

type Query{
    getPieChartData: pieChart!
    getHeatMapData: heatMap!
}

`;



const resolvers ={  
    Query:{
        getPieChartData:async (_: any) => {
            const data = await product.find();
            let category:any = [];
            
            data.forEach((element:any) => {
              const existingCategory = category.find((re:any) => re.categoryName === element.productCategory);
            
              if (existingCategory) {
                existingCategory.number += 1;
              } else {
                category.push({
                  categoryName: element.productCategory,
                  number: 1,
                });
              }
            });
            return { category: category };
            
        },
        getHeatMapData:async (_: any) => {
            const data = await user.find();
            let category:any = [];
            
            data.forEach((element:any) => {
              const existingCategory = category.find((re:any) => re.countryName === element.country);
            
              if (existingCategory) {
                existingCategory.number += 1;
              } else {
                category.push({
                  countryName: element.country,
                  number: 1,
                });
              }
            });
            return { country: category };
            
        },
    }
}


export {typeDefs,resolvers}