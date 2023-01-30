import { CircularProgress } from "@material-ui/core";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../Components/errorBoundary";
import Banner from "../Components/Home/Banner";
const Coinlist = React.lazy(() => import("../Components/Home/Coinlist"));

const Home = () => {
  return (
    <div>
      <Banner />
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
        window.location.reload();
      }}>
        <Suspense
          fallback={
            <div>
              <CircularProgress
                color="secondary"
                style={{ position: "absolute", top: "50%", left: "50%" }}
              />
            </div>
          }
        >
          <Coinlist />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
