import React from "react";
import { Switch, Route } from "wouter";

// Load views with lazy
import Home from "./views/Home"
import Pinned from "./views/Pinned"
import ShareLink from "./views/ShareLink"
import Filter from "./views/Filter"
import CreateBin from "./views/CreateBin"
import About from "./views/About"
import Settings from "./views/Settings"
import ViewBin from "./views/ViewBin"
import EditBin from "./views/EditBin"
import NotFound from "./views/NotFound"
import ErrorBoundary from "./components/ErrorBoundary"

export default function App() {
  return (
      <ErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/pinned" component={Pinned} />
          <Route path="/shared" component={ShareLink} />
          <Route path="/find" component={Filter} />
          <Route path="/create" component={CreateBin} />
          <Route path="/about-us" component={About} />
          <Route path="/settings" component={Settings} />
          <Route path="/view/:key" component={ViewBin} />
          <Route path="/edit/:key" component={EditBin} />
          <Route path="/find/:name" component={Filter} />
          <Route component={NotFound} />
        </Switch>
      </ErrorBoundary>
  );
}
