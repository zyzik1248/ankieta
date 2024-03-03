const contentful = require("contentful")
const fs = require("fs")
const suppliers = require("./src/content/suppliers.json")
require('dotenv').config();

const data = JSON.parse(JSON.stringify(suppliers))
const out = "src/content/suppliers.json"

const client = contentful.createClient({
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  client.getEntries({content_type: 'inquiryQuestion'}).then(function (entry) {
    const categories = entry.items.map((item)=>({
        header: item.fields.title,
        categoryId: item.fields.categoryId,
        order: item.fields.order,
        suppliers: item.fields.options
    }))

    data.categories = categories
    
    const jsonData = JSON.stringify(data, null);
    const filePath = out;    
    fs.writeFileSync(filePath, jsonData);
  });