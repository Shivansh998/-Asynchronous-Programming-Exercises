// Task 2: Callback Implementation
function executeCallback(callback) {
    // Show processing message
    document.getElementById('result').innerHTML = 'Processing...';
    
    // Simulate 5 second delay
    setTimeout(() => {
        // Display callback execution message
        document.getElementById('result').innerHTML = 
            '<div class="callback-message">Callback executed after 5 seconds</div>';
        
        // Execute the provided callback
        callback();
    }, 5000);
}

// Task 3: Fetch Data from API
function fetchPosts() {
    fetch('https://dummyjson.com/posts')
        .then(response => response.json())
        .then(data => {
            // Create HTML for the posts
            const postsHtml = data.posts
                .slice(0, 5)
                .map(post => `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.body.slice(0, 100)}...</p>
                    </div>
                `)
                .join('');
            
            // Display the posts
            document.getElementById('result').innerHTML = postsHtml;
        })
        .catch(error => {
            document.getElementById('result').innerHTML = 
                `<div class="error">Error fetching posts: ${error.message}</div>`;
        });
}

// Add click event listener to button
document.getElementById('fetchButton').addEventListener('click', () => {
    // Execute callback function that will then fetch posts
    executeCallback(fetchPosts);
});