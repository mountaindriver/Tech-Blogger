const { Comments } = require('../models');

const commentsData = [
    {
        blog_id: 1,
        comments: "This is a comment for the MVC blog post"
    },
    {
        blog_id: 2,
        comments: "This is a comment for the Authorization vs. Authantification"
    },
    {
        blog_id: 3,
        comments: "This is a comment for the OPP blog post"
    }
];

const seedComments = ()=> Comments.bulkCreate(commentsData);

module.exports = seedComments;