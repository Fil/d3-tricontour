import assert from "assert";
import * as tric from "../src/index.js";

it("tricontour() has the expected defaults", () => {
  const c = tric.tricontour();
  assert.strictEqual(c.thresholds(), undefined);
});

it("tricontour().contour(data, value) returns a GeoJSON", () => {
  const c = tric.tricontour().contour([[0, 0, 1], [1, 1, 0], [2, 0, 1]], 0.5);
  assert.deepStrictEqual(c, { type: 'MultiPolygon', coordinates: [[[[1.5, 0.5], [2, 0], [0, 0], [0.5, 0.5], [1.5, 0.5]]]], value: 0.5 });
});

it("tricontour()(data) returns an array of GeoJSON MultiPolygon", () => {
  const c = tric.tricontour()([[0, 0, 1], [1, 1, 0], [2, 0, 1]], 0.5);
  assert(Array.isArray(c));
  assert.strictEqual(c[0].type, "MultiPolygon");
});

it("tricontour().contours(data) returns an iterable of GeoJSON MultiPolygon", () => {
  const c = tric.tricontour().contours([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);
  assert(c[Symbol.iterator]);
  const d = [...c];
  assert.strictEqual(d.length, 11);
  assert.deepStrictEqual(d[5], { type: 'MultiPolygon', coordinates: [[[[1.5, 0.5], [2, 0], [0, 0], [0.5, 0.5], [1.5, 0.5]]]], value: 0.5 });
});

it("tricontour().isobands(data) returns an iterable of GeoJSON MultiPolygon", () => {
  const c = tric.tricontour().isobands([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);
  assert(c[Symbol.iterator]);
  const d = [...c];
  assert.strictEqual(d.length, 10);
  assert.strictEqual(d[4].value, 0.4);
  assert.strictEqual(d[4].valueMax, 0.5);
});

it("tricontour().x() sets the x accessor", () => {
  const c = tric.tricontour()
    .x(d => d[2])
    .contour([[0, 0, 1], [1, 1, 0], [2, 0, 0]], 0.5);
  assert.deepStrictEqual(c.coordinates, [[[[0.5, 0.5], [1, 0], [0.5, 0], [0.5, 0.5]]]]);
});

it("tricontour().y() sets the y accessor", () => {
  const c = tric.tricontour()
    .y(d => d[2])
    .contour([[0, 0, 1], [1, 1, 0], [2, 0, 0]], 0.5);
  assert.deepStrictEqual(c.coordinates, [[[[0.5, 0.5], [0, 1], [1, 0.5], [0.5, 0.5]]]]);
});

it("tricontour().value() sets the value accessor", () => {
  const c = tric.tricontour()
    .value(d => d[0])
    .contour([[0, 0, 1], [1, 1, 0], [2, 0, 0]], 0.5);
  assert.deepStrictEqual(c.coordinates, [[[[0.5, 0.5], [1, 1], [2, 0], [0.5, 0], [0.5, 0.5]]]]);
});

it("tricontour().thresholds([…]) sets the thresholds", () => {
  const c = tric.tricontour()
    .thresholds([0, 1]) (
      [[0, 0, 1], [1, 1, 0], [2, 0, 0]]
    );
  assert.deepStrictEqual(c.map(d => d.value), [0,1]);
});

it("tricontour().thresholds(n) sets a number of thresholds", () => {
  const c = tric.tricontour()
    .thresholds(4) (
      [[0, 0, 1], [1, 1, 0], [2, 0, 0]]
    );
  assert.deepStrictEqual(c.map(d => d.value), [0, 0.2, 0.4, 0.6, 0.8, 1]);
});

it("tricontour().thresholds() reads the thresholds", () => {
  const c = tric.tricontour().thresholds(4);
  c([[0, 0, 1], [1, 1, 0], [2, 0, 5]]);
  assert.deepStrictEqual(c.thresholds(), [0, 1, 2, 3, 4, 5]);
});

