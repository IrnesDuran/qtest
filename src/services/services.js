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

export const getPosts = async () => {
  const response = await fetchData(`${BASE_URL}/posts`);
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

export const getUserAndComments = async (id) => {
  const user = await getUser(id);
  const comments = await getComments(id);

  return { user: user, comments: comments };
};
