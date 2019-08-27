import tape from "tape-await";
import * as tric from "../src/index.js";

tape("tricontour() has the expected defaults", test => {
  const c = tric.tricontour();
  test.equal(c.thresholds(), undefined);
});

tape("tricontour().contour(data, value) returns a GeoJSON", test => {
  const c = tric.tricontour().contour([[0, 0, 1], [1, 1, 0], [2, 0, 1]], 0.5);
  test.deepEqual(c, { type: 'MultiPolygon', coordinates: [[[[1.5, 0.5], [2, 0], [0, 0], [0.5, 0.5], [1.5, 0.5]]]], value: 0.5 });
});

tape("tricontour()(data) returns an array of GeoJSON MultiPolygon", test => {
  const c = tric.tricontour()([[0, 0, 1], [1, 1, 0], [2, 0, 1]], 0.5);
  test.assert(Array.isArray(c));
  test.equal(c[0].type, "MultiPolygon");
});

tape("tricontour().contours(data) returns an iterable of GeoJSON MultiPolygon", test => {
  const c = tric.tricontour().contours([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);
  test.assert(c[Symbol.iterator]);
  const d = [...c];
  test.equal(d.length, 11);
  test.deepEqual(d[5], { type: 'MultiPolygon', coordinates: [[[[1.5, 0.5], [2, 0], [0, 0], [0.5, 0.5], [1.5, 0.5]]]], value: 0.5 });
});

tape("tricontour().isobands(data) returns an iterable of GeoJSON MultiPolygon", test => {
  const c = tric.tricontour().isobands([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);
  test.assert(c[Symbol.iterator]);
  const d = [...c];
  test.equal(d.length, 10);
  test.deepEqual(d[4].value, [0.4, 0.5]);
});
