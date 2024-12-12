"use client";
import React, { Suspense } from "react";
import { useInView } from "react-intersection-observer";

// Lazy load the Spline component
const LazySpline = React.lazy(() => import("@splinetool/react-spline/next"));

const Robot = ({ onLoad }: { onLoad: () => void }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Ensures the model loads only once when in view
    threshold: 0.1,    // Triggers when 10% of the component is visible
  });

  return (
    <div ref={ref} className="h-screen">
      {inView ? (
        <Suspense>
          <LazySpline
            scene="https://prod.spline.design/NCQe8dUMReBbPYxM/scene.splinecode"
            onLoad={onLoad}
          />
        </Suspense>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Robot;
