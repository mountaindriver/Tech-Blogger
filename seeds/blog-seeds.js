const { Blog } = require('../models');
 
const blogData = [
    {
        blog_name: "Why is MVC so important",
        blog_description: "MVC allows developers to maintain a true separtation of concerns, devisng their code between the Model layer for data, the View layer for design and the Controller layr for appilcation logic."
    },
    {
        blog_name: "Authentication vs. Authorization",
        blog_description: "There is a difference between authenticatin and authorization. Authentication means confirming your own identity, whereas authorization means being alllowed access to the system."
    },
    {
        blog_name: "Object-Relational Mapping",
        blog_description: "I have really loved learning about ORMs. It's really simplified the way I create queries in SQL!"
    }
];

const seedBlog = ()=> Blog.bulkCreate(blogData);

module.exports = seedBlog;