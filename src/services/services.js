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

export const getPosts = async () => {
  const response = await fetchData(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return response;
};

export const getUser = async (id) => {
  const response = await fetchData(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );

  return response;
};
