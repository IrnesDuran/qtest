import React, { useState, useEffect, useCallback } from "react";
import { getPosts } from "../services/services";
import { useLocation } from "react-router-dom";

//contextModel used only for autocomplete
const contextModel = {
  searchFieldVisible: false,
  greetingsMessage: "Hello from",
  posts: [],
  filteredPosts: [],
  isFetching: false,
  beingFiltered: false,
  filter: "",
  storeUsers: () => {},
  setFilter: () => {},
};

const Context = React.createContext(contextModel);

export const ContextProvider = (props) => {
  const location = useLocation();

  const storeUsersHandler = (user) => {
    const userId = user.id;
    setUsers((prev) => {
      const existingUser = prev.find((user) => user.id === userId);
      return existingUser ? prev : [...prev, user];
    });
  };

  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filteredPosts, setFilteredPost] = useState([]);
  const [filter, setFilter] = useState("");
  const [beingFiltered, setBeingFiltered] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState({
    searchFieldVisible: false,
    greetingsMessage: "Hello from",
    posts: [],
    isFetching: false,
    storeUsers: storeUsersHandler,
    setFilter: (value) => {
      if (value === "") {
        setBeingFiltered(false);
      } else {
        setBeingFiltered(true);
      }
      setFilter(value);
    },
  });

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
      (location.pathname === "/posts" || location.pathname === "/") &&
      !isFetching
    ) {
      //cheat for first app mount
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      if (!beingFiltered) setIsFetching(true);
    }
  };

  //load additional pages
  const moreData = useCallback(async () => {
    //prevent load when total pages have been injected
    const additionalPosts = await getPosts(page + 1);
    setData((prev) => ({
      ...prev,
      posts: [...prev.posts, ...additionalPosts],
    }));
    setPage((prevPage) => prevPage + 1);
    setIsFetching(false);
  }, [page]);

  //when scroll reaches bottom of the component/page, isFetching trigers which in turn triggers additional pages load
  const postsSize = data.posts.length;
  useEffect(() => {
    if (isFetching && postsSize !== 100 && !beingFiltered) {
      moreData();
    }
  }, [isFetching, moreData, beingFiltered]);

  useEffect(() => {
    // filter users based on input value, check all user data values (rafined version)
    const filteredUsersIds =
      filter !== "" &&
      users
        .filter((item) => {
          const lowercasedFilter = filter.toLowerCase().trim();
          const rafinedUser = {
            ...item,
            address: item.address.city,
            company: item.company.name,
          };

          return Object.keys(rafinedUser).some((key) =>
            rafinedUser[key].toString().toLowerCase().includes(lowercasedFilter)
          );
        })
        .map((user) => user.id);

    //map filtered users ids to identify which posts have same userId in order to show them
    let timer1 = setTimeout(() => {
      if (filter !== "" && filteredUsersIds.length !== 0) {
        const filteredPosts = data.posts.filter((item) => {
          return filteredUsersIds.find((id) => id === item.userId);
        });
        setFilteredPost(filteredPosts);
      } else {
        setFilteredPost([]);
      }
    }, 500);

    return () => {
      clearTimeout(timer1);
    };
  }, [filter, users]);

  return (
    <Context.Provider
      value={{
        ...data,
        isFetching: isFetching,
        users: users,
        filter: filter,
        filteredPosts: filteredPosts,
        beingFiltered: beingFiltered,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default Context;
