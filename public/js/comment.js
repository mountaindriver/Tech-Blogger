const leaveComment = async (event) => {
    event.preventDefault();

    const blog_id = window.location.pathname.split('/')[2];
    const comments = document.querySelector('#comment').value.trim();

    const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ blog_id, comments }),
        headers: { 'Content-Type': 'application/json' },
    })
    window.location.reload();
};

const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        
        const response = await fetch(`/api/blog/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete Blog post');
        }
    }
};

document.querySelector('#leaveComment').addEventListener('click', leaveComment);
document.querySelector('#deletePost').addEventListener('click', deletePost);