// @ts-expect-error Vite worker
import ExampleWorker from "./ExampleWorker.ts?worker";
import { TinyProperty } from "scenerystack/axon";

let worker: Worker | null = null;

export const workerLoadedProperty = new TinyProperty(false);

export const getWorker = (): Worker => {
  if (!worker) {
    worker = new ExampleWorker();

    worker?.addEventListener("message", (event) => {
      if (event.data.type === "example-worker-loaded") {
        workerLoadedProperty.value = true;
      }
    });
  }

  return worker!;
};

QUnit.module("Web Workers", function () {
  QUnit.test("Request and Response", assert => {
    assert.timeout( 5000 );
    const done = assert.async();

    const myWorker = getWorker();

    workerLoadedProperty.link( hasLoaded => {
      if ( hasLoaded ) {
        console.log( 'loaded' );
        assert.ok( true, "Worker loaded" );

        myWorker.postMessage( {
          type: "example-request",
        } );

        myWorker.addEventListener( "message", event => {
          if ( event.data.type === 'example-response' ) {
            assert.equal( event.data.result, 5, "Worker responded with correct data" );
            done();
          }
        } );
      }
    } );
  });
});
