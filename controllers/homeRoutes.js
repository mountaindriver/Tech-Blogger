const router = require('express').Router();

// autoration
const withAuth = require('../utils/auth');

router.get('/', async (req, res)=> {
    try {
        // GET all blog post and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: Blog,
                    attributes: ['name'],
                },
            ],
        });
        // Serialize data so handle bars can read it
        const blogPosts = blogData.map((posts)=> posts.get({ plain: true }));


        // the response is to render the page with serialized data
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});

router.get('/dashboard/:id', async (req, res)=> {
    try{
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: Blog,
                    attributes:['name'],
                },
            ],
        })
        const blogPost = blogData.map((post)=>post.get({ palin: true}));

        res.render('dashboard', {
            // why do i need a spread operator?
            ...blogPost,
            logged_in: req.session.logged_in
        });
    } catch (err){
        res.status(500).json(err);
    }
});