const fetchPosts = async () => {
    const response = await fetch('/mocks/posts.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const posts = await response.json();
    return posts;
};

export default fetchPosts;
