async function fetchDataWithTimeout() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        const response = await fetch('https://dummyjson.com/posts', {
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Network request timed out');
        }
        throw error;
    }
}

document.getElementById('fetchButton').addEventListener('click', async () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '<div class="loading">Loading...</div>';

    try {
        const data = await fetchDataWithTimeout();
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
    } catch (error) {
        resultDiv.innerHTML = `
            <div class="error">
                ${error.message}
            </div>
        `;
    }
});