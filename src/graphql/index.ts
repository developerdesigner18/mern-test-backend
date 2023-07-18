const { gql } = require("apollo-server");
const user = require("../models/user.model");
const product = require("../models/product.model");
const typeDefs = gql`
  type category {
    categoryName: String
    number: Int
  }

  type pieChart {
    category: [category]
  }

  type country {
    id: String
    value: Int
  }

  type heatMap {
    country: [country]
  }

  type ageCount {
    teen: String
    adult: String
    senior: String
  }

  type occupation {
    occupationName: String
    number: Int
  }

  type gender {
    male: Int
    female: Int
    other: Int
  }

  type salesVSTarget {
    totalSellProduct: Int
    expectedSellProduct: Int
    productName: String
  }

  type top10Products {
    totalSoldQty: Int
    productName: String
  }

  type Query {
    getPieChartData: pieChart!
    getHeatMapData: heatMap!
    getAgeCountData: ageCount!
    getOccupationData: [occupation]!
    getGenderData: gender!
    getSalesVSTargetData: [salesVSTarget]!
    getTop10Products: [top10Products]!
  }
`;

const resolvers = {
  Query: {
    getPieChartData: async (_: any) => {
      const data = await product.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.categoryName === element.productCategory
        );

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
    getHeatMapData: async (_: any) => {
      const data = await user.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.id === element.countryCode
        );

        if (existingCategory) {
          existingCategory.value += 1;
        } else {
          category.push({
            id: element.countryCode,
            value: 1,
          });
        }
      });
      return { country: category };
    },
    getAgeCountData: async (_: any) => {
      const data = await user.find();
      const ageCount = {
        teen: 0,
        adult: 0,
        senior: 0,
      };
      data.forEach((element: any) => {
        if (element.userAge >= 13 && element.userAge <= 19) {
          ageCount.teen++;
        } else if (element.userAge > 19 && element.userAge <= 34) {
          ageCount.adult++;
        } else if (element.userAge > 34) {
          ageCount.senior++;
        }
      });
      return ageCount;
    },
    getOccupationData: async (_: any) => {
      const data = await user.find();
      let category: any = [];

      data.forEach((element: any) => {
        const existingCategory = category.find(
          (re: any) => re.occupationName === element.occupation
        );

        if (existingCategory) {
          existingCategory.number += 1;
        } else {
          category.push({
            occupationName: element.occupation,
            number: 1,
          });
        }
      });
      return category;
    },


    getGenderData: async (_: any) => {
      const data = await user.find()
      return { male: data.filter((e: any) => e.gender === 'Male').length, female: data.filter((e: any) => e.gender === 'Female').length, other: data.filter((e: any) => e.gender === 'Other').length }
    },

    getSalesVSTargetData: async (_: any) => {
      const data = await product.find()
      let returnData: any = [];
      data.forEach((e: any) => {
        returnData.push({ expectedSellProduct: e.productExpectedSale, totalSellProduct: e.totalSoldQty, productName: e.productName })
      });
      console.log(returnData);

      return returnData
    },

    getTop10Products: async (_: any) => {
      const data = await product.find()
      const sortedProducts = data.sort((a: any, b: any) => b.totalSoldQty - a.totalSoldQty)

      return sortedProducts.map((e: any) => { return { totalSoldQty: e.totalSoldQty, productName: e.productName } })
    }
  },
};

export { typeDefs, resolvers };
