const updateBlog = async (event, req, res) => {
    event.preventDefault();
    
    const name = document.querySelector('#blogName').value.trim();
    const description = document.querySelector('#blogDescription').value.trim();
    const postID = window.location.pathname.split('/')[3];

    const response = await fetch(`/post/${postID}`, {
        method: 'PUT',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },
    })
    document.location.replace(`/post/${postID}`);
}

document.querySelector('#updateBlog').addEventListener('click', updateBlog);