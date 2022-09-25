// import models
const Blog = require('./Blog');
const Comments = require('./Comments');
const User = require('./User');

// comment belongs to Blog
Comments.belongsTo(Blog, {
    foreign: 'blog_id',
});

// Blog can have many comments
Blog.hasMany(Comments, {
    foreignKey: 'blog_id',
});

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = {
    Blog,
    Comments,
};