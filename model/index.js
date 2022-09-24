// import models
const Blog = require('./Blog');
const Comment = require('./Comment')

// comment belongs to Blog
Comment.belongsTo(Blog, {
    foreign: 'blog_id',
});

// Blog can have many comments
Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
});

module.exports = {
    Blog,
    Comment,
};