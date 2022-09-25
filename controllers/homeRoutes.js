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
        res.status(500).json({ message: "hello there" });
    }
});

// gets a specific blog post
router.get('/post/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Comments,
                    // include: [
                    //     {
                    //         model: User,
                    //         attributes: ['name'],
                    //     },
                    // ],
                },
            ],
        })
        const blog = blogData.get({ plain: true });

        res.render('post', {
            blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // find the logged in user with session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exlude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
