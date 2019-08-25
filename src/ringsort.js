// Code extracted from d3-contour; sorts the polygons so that the holes are grouped with their parent polygon
export default function(rings) {
  const polygons = [],
    holes = [];

  for (const ring of rings) {
    if (area(ring) > 0) polygons.push([ring]);
    else holes.push(ring);
  }

  holes.forEach(function(hole) {
    for (var i = 0, n = polygons.length, polygon; i < n; ++i) {
      if (contains((polygon = polygons[i])[0], hole) !== -1) {
        polygon.push(hole);
        return;
      }
    }
  });

  return polygons;

  // https://github.com/d3/d3-contour/blob/master/src/contains.js
  function contains(ring, hole) {
    var i = -1,
      n = hole.length,
      c;
    while (++i < n) if ((c = ringContains(ring, hole[i]))) return c;
    return 0;
  }

  function ringContains(ring, point) {
    var x = point[0],
      y = point[1],
      contains = -1;
    for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
      var pi = ring[i],
        xi = pi[0],
        yi = pi[1],
        pj = ring[j],
        xj = pj[0],
        yj = pj[1];
      if (segmentContains(pi, pj, point)) return 0;
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi)
        contains = -contains;
    }
    return contains;
  }

  function segmentContains(a, b, c) {
    var i;
    return collinear(a, b, c) && within(a[(i = +(a[0] === b[0]))], c[i], b[i]);
  }

  function collinear(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) === (c[0] - a[0]) * (b[1] - a[1]);
  }

  function within(p, q, r) {
    return (p <= q && q <= r) || (r <= q && q <= p);
  }

  // https://github.com/d3/d3-contour/blob/master/src/area.js
  function area(ring) {
    var i = 0,
      n = ring.length,
      area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
    while (++i < n)
      area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
    return area;
  }
}