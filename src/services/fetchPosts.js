const fetchPosts = async () => {
    const response = await fetch('/mocks/posts.json');

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const posts = await response.json();
    return posts;
};

const fetchPostById = async (id) => {
    const posts = await fetchPosts();

    const post = posts.find(post => post._id == id);

    if (!post) {
        throw new Error('Post not found');
    }
    return post;
};

export { fetchPosts, fetchPostById };
