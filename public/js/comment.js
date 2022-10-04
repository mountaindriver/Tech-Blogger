const leaveComment = async (event)=>{
    console.log('hi')
    event.preventDefault();

    const blog_id = window.location.pathname.split('/')[2];
    console.log(blog_id);
    const comments = document.querySelector('#comment').value.trim();
    // const user_id = 

    console.log(comments);
        const response = await fetch('/comment', {
            method: 'POST',
            body: JSON.stringify({blog_id, comments}),
            headers: { 'Content-Type': 'application/json' },
    })
}

document.querySelector('#leaveComment').addEventListener('click', leaveComment);