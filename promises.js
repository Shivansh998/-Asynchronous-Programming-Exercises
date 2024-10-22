function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Operation timed out')), 5000);
        });

        const fetchPromise = fetch('https://dummyjson.com/posts')
            .then(response => response.json());

        Promise.race([fetchPromise, timeoutPromise])
            .then(resolve)
            .catch(reject);
    });
}

document.getElementById('fetchButton').addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading">Loading...</div>';

    fetchDataWithPromise()
        .then(data => {
            const postsHtml = data.posts
                .slice(0, 5)
                .map(post => `
                    <div class="post">
                        <h3>${post.title}</h3>
                        <p>${post.body.slice(0, 100)}...</p>
                    </div>
                `)
                .join('');

            resultDiv.innerHTML = postsHtml;
        })
        .catch(error => {
            resultDiv.innerHTML = `
                <div class="error">
                    ${error.message}
                </div>
            `;
        });
});