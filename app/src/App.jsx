import React from "react";
import { Switch, Route } from "wouter";
import { Preloader } from "./components/Preloaders";

// Load views with lazy
const Home = React.lazy(() => import("./views/Home"));
const Pinned = React.lazy(() => import("./views/Pinned"));
const ShareLink = React.lazy(() => import("./views/ShareLink"));
const CreateBin = React.lazy(() => import("./views/CreateBin"));
const EditBin = React.lazy(() => import("./views/EditBin"));
const ViewBin = React.lazy(() => import("./views/ViewBin"));
const About = React.lazy(() => import("./views/About"));
const Settings = React.lazy(() => import("./views/Settings"));
const Filter = React.lazy(() => import("./views/Filter"));
const NotFound = React.lazy(() => import("./views/NotFound"));
const ErrorBoundary = React.lazy(() => import("./components/ErrorBoundary"));

export default function App() {
  return (
    <React.Suspense fallback={<Preloader/>}>
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
    </React.Suspense>
  );
}
