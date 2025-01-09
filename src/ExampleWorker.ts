import { enableAssert } from "scenerystack/assert";
import { Property } from "scenerystack/axon";
import { Vector2 } from "scenerystack/dot";
import { Shape } from "scenerystack/kite";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV === "development") {
  // Enable assertions if we are in development mode
  enableAssert();
}

self.postMessage({
  type: "example-worker-loaded",
});

self.addEventListener("message", (event) => {
  const data = event.data;

  if (data.type === "example-request") {

    // Do something axon-related (to check for WebWorker-specific failures)
    console.log( new Property( 5 ).value );

    // Do something kite-related (to check for WebWorker-specific failures)
    console.log( new Shape().moveTo( 0, 0 ).quadraticCurveTo( 10, 0, 10, 10 ).close().getArea() );

    self.postMessage({
      type: "example-response",
      result: Math.round( new Vector2( 3, 4 ).magnitude )
    });
  }
});
