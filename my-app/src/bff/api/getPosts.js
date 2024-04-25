export const getPosts = async (page, goSearchPhrase, limit) => {
	const url = `http://localhost:3003/posts?title_like=${goSearchPhrase}&_page=${page}&_limit=${limit}`;

	// const postsCount = await fetch(
	// 	`http://localhost:3003/posts?title_like=${goSearchPhrase}`,
	// )
	// 	.then((response) => response.json())
	// 	.then((data) => data.length);

	// const posts = await fetch(url).then((data) => data.json());

	const [count, posts] = await Promise.all([
		fetch(`http://localhost:3003/posts?title_like=${goSearchPhrase}`),
		fetch(url),
	]).then((res) => Promise.all(res.map((data) => data.json())));

	return {
		count,
		posts,
	};
};
