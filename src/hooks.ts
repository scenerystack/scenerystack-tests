import { enableAssert } from "scenerystack/assert";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (process.env.NODE_ENV === "development") {
  // Enable assertions if we are in development mode
  enableAssert();
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
QUnit.on("testEnd", (testEnd) => {
  console.log(
    `${testEnd.status === "passed" ? "[PASS]" : "[FAIL]"} ${testEnd.suiteName} : ${testEnd.name}`,
  );
  for ( const assertion of testEnd.assertions ) {
    console.log( `  ${assertion.passed ? "[PASS]" : "[FAIL]"} ${assertion.message}` );
  }
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
QUnit.on("runEnd", (runEnd) => {
  // We will ship this so scenerystack-tests perennial hook can read it out
  // @ts-expect-error It isn't defined or standard
  self.sceneryStackTestResults = runEnd;
});