const postBlog = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#blogName').value.trim();
    const description = document.querySelector('#blogDescription').value.trim();

    console.log(name);
    console.log(description);
    
    const response = await fetch('/api/blog/', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: { 'Content-Type': 'application/json' },

    })
    window.location.reload();
}

document.querySelector('#postBlog').addEventListener('click', postBlog);