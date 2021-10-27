import React, { useState, useEffect } from "react";
import { getPosts } from "../services/services";

//contextModel used only for autocomplete
const contextModel = {
  searchFieldVisible: false,
  greetingsMessage: "Hello from",
  posts: [],
  isFetching: false,
  // getUser: () => {},
};

const Context = React.createContext(contextModel);

export const ContextProvider = (props) => {
  const [data, setData] = useState({
    searchFieldVisible: false,
    greetingsMessage: "Hello from",
    posts: [],
    isFetching: false,
  });
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  //fetch all posts upon homepage/posts page mount and mount/umount scroll enevt for infinite scroll simulation
  useEffect(() => {
    const tryFetch = async () => {
      const fetchedPosts = await getPosts(page);
      setData((prev) => ({ ...prev, posts: fetchedPosts }));
    };
    tryFetch();
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  //we registered our isScrolling function to listen to the event scroll. So now, whenever a user scrolls, the isScrolling is called.
  const isScrolling = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    setIsFetching(true);
  };

  const moreData = async () => {
    if (data.posts.length !== 100) {
      const additionalPosts = await getPosts(page + 1);
      setData((prev) => ({
        ...prev,
        posts: [...prev.posts, ...additionalPosts],
      }));
      setPage(page + 1);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    if (isFetching) {
      moreData();
    }
  }, [isFetching]);

  return (
    <Context.Provider value={{ ...data, isFetching: isFetching }}>
      {props.children}
    </Context.Provider>
  );
};

export default Context;
