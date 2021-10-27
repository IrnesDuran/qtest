export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (page) => {
  const response = await fetchData(`${BASE_URL}/posts?_page=${page}&_limit=20`);
  return response;
};

export const getUser = async (id) => {
  const response = await fetchData(`${BASE_URL}/users/${id}`);
  return response;
};

export const getComments = async (id) => {
  const response = await fetchData(`${BASE_URL}/posts/${id}/comments`);
  return response;
};

export const getUserAndComments = async (userId, postId) => {
  const user = await getUser(userId);
  const comments = await getComments(postId);

  return { user: user, comments: comments };
};
