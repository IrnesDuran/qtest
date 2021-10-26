import React, { useState, useEffect, useCallback } from "react";
import { getPosts } from "../services/services";

//contextModel used only for autocomplete
const contextModel = {
  searchFieldVisible: false,
  greetingsMessage: "Hello from",
  posts: [],
  // getUser: () => {},
};

const Context = React.createContext(contextModel);

export const ContextProvider = (props) => {
  // const getUser = useCallback(async (id) => {
  //   const userResponse = await getUser(id);
  //   console.log(userResponse);
  //   // setData((prev) => ({ ...prev, posts: fetchedPosts }));
  // }, []);

  const [data, setData] = useState({
    searchFieldVisible: false,
    greetingsMessage: "Hello from",
    posts: [],
  });

  //fetch all posts upon homepage/posts page mount
  useEffect(() => {
    const tryFetch = async () => {
      const fetchedPosts = await getPosts();
      setData((prev) => ({ ...prev, posts: fetchedPosts }));
    };
    tryFetch();
  }, []);

  return <Context.Provider value={data}>{props.children}</Context.Provider>;
};

export default Context;
