import React, { Suspense, useContext } from "react";
import { Redirect, Route, Switch } from "react-router";
import { routes } from "./routes";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import Context from "../store/context";

const Routes = () => {
  const ctx = useContext(Context); //target the store to extract greetingsMessage which will be defined only once there

  return ctx.posts.length !== 0 ? (
    <>
      <Header greetingsMessage={ctx.greetingsMessage} componentName="Header" />
      <Switch>
        {routes.map(({ Component, path, exact, componentName }) => {
          return (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={(props) => (
                <Suspense fallback={<Loader />}>
                  {
                    <Component
                      {...props}
                      greetingsMessage={ctx.greetingsMessage}
                      componentName={componentName}
                    />
                  }
                </Suspense>
              )}
            />
          );
        })}
        <Route exact path="*" render={() => <Redirect to="/posts" />} />
      </Switch>
    </>
  ) : (
    <Loader />
  );
};

export default Routes;
