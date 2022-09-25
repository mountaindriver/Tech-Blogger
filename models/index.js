// import models
const Blog = require('./Blog');
const Comments = require('./Comments')

// comment belongs to Blog
Comments.belongsTo(Blog, {
    foreign: 'blog_id',
});

// Blog can have many comments
Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
});

module.exports = {
    Blog,
    Comments,
};