const seedBlog = require('./blog-seeds.js');

const sequelize = require('../config/connection');

const seedAll = async ()=>{
    await sequelize.sycnc({ force: true });
    console.log('\n----DATABASE SYNCED ----\n');
    await seedBlog();
    console.log('\n----CATEGORIES SEEDED ----\n');

    await seedCommentS();
    console.log('\n ---- COMMENTS SEEDED ----');

    process.exit(0);
};

seedAll();