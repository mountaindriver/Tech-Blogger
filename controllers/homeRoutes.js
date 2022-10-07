const router = require('express').Router();
const { Blog, Comments, User } = require('../models');

const withAuth = require('../utils/auth');

// gets all blog posts
router.get('/', async (req, res) => {
    try {
        // GET all blog post and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comments,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ]
                }
            ],
        });

        // Serialize data so handle bars can read it
        const blogPosts = blogData.map((posts) => posts.get({ plain: true }));
        console.log(blogPosts);
        // the response is to render the page with serialized data
        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// gets a specific blog post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comments,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                    ]
                }
            ],
        })
        const blog = blogData.get({ plain: true });
        console.log(blog)
        res.render('post', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/update/:id', withAuth, async (req, res)=>{
    try{
        if (!req.session.logged_in) {
            res.redirect('/login');
            return;
        }

        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        })

        const blog = blogData.get({ plain: true });

        res.render('updatePost', {
            blog,
            logged_in: req.session.logged_in
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
})

router.put('/post/:id', withAuth, async (req, res)=>{
    try{
        const blogData = await Blog.findByPk(req.params.id, {})
        
        blogData.name = req.body.name;
        blogData.description = req.body.description;
        
        await blogData.save({fields: ['name', 'description']})

        const blog = blogData.get({ plain: true });

        res.render('post', {
            blog,
            logged_in: req.session.logged_in
        })
    } catch (err){
        res.status(500).json(err);
    }
})

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
            },
              include: [
                {
                  model: User,
                  attributes: ["id", "name"]
                },
                {
                    model: Comments,
                },
           ]
        })

        const blogPosts = blogData.map((blog)=> blog.get({ plain: true }));
        console.log(blogPosts);
        res.render('dashboard', {
            blogPosts,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;
