import React, { Suspense } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import AllQuotes from "./pages/AllQuotes";
// import NewQuote from './pages/NewQuote';
import QuoteDetail from "./pages/QuoteDetail";

import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));

function App() {
  return (
    <div>
      <Layout>
        <Suspense
          fallback={
            <div className="centered">
              <LoadingSpinner />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quotes" />
            </Route>
            <Route path="/quotes" exact>
              <AllQuotes />
            </Route>
            <Route path="/quotes/:quoteID">
              <QuoteDetail />
            </Route>
            <Route path="/new-quote">
              <NewQuote />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

export default App;
