const leaveComment = async (event) => {
    event.preventDefault();

    const blog_id = window.location.pathname.split('/')[2];
    const comments = document.querySelector('#comment').value.trim();

    const response = await fetch('/comment', {
        method: 'POST',
        body: JSON.stringify({ blog_id, comments }),
        headers: { 'Content-Type': 'application/json' },
    })
    window.location.reload();
}

document.querySelector('#leaveComment').addEventListener('click', leaveComment);