# tricontours

This library computes contour polygons by applying meandering triangles to an array of points with arbitrary 2D coordinates (_x_, _y_) holding numeric values _z_. To compute contours on gridded coordinates, see [d3-contour](https://github.com/d3/d3-contour) instead.

For examples, see the [contours collection](https://observablehq.com/collection/@fil/contours) on Observable.

[![flower](https://gist.githubusercontent.com/Fil/3eb6ad8e16a83a65c1e86ec8d02e8ed9/raw/a5b25440875f9b2f8d60193c9bd59348ea838571/thumbnail.png)](https://blockbuilder.org/Fil/3eb6ad8e16a83a65c1e86ec8d02e8ed9)

## Installing

If you use NPM, `npm install tricontours`. Otherwise, download the [latest release](https://github.com/Fil/tricontours/releases/latest). You can also load directly as a [standalone library](https://cdn.jsdelivr.net/npm/tricontours). ES modules, AMD, CommonJS, and vanilla environments are supported. In vanilla, a `tricontours` global is exported:

```html
<script src="https://unpkg.com/d3-scale@3"></script>
<script src="https://unpkg.com/d3-delaunay@5"></script>
<script src="https://unpkg.com/tricontours@0.0.5"></script>
<script>

const tri = tricontours.tricontours();
const contours = tri([[0, 0, 1], [1, 1, 0], [2, 0, 1]]);

</script>
```

## API Reference

The API of tricontours is similar to that of [d3-contour](https://github.com/d3/d3-contour):

<a href="#tricontours" name="tricontours">#</a> <b>tricontours</b>() · [Source](https://github.com/Fil/tricontours/blob/master/src/tricontours.js), [Examples](https://observablehq.com/collection/@fil/contours)

Constructs a new tricontours generator with the default settings.

```js
const tri = tricontours();
```


<a href="#_tricontours" name="_tricontours">#</a> _tricontours_(_data_)

Returns an array of contours, one for each threshold. The contours are MultiPolygons in GeoJSON format, that contain all the points with a value larger than the threshold. The value is indicated as _geometry_.value.

The _data_ is passed as an array of points, by default with the format [x,y,value].

<a href="#contour" name="contour">#</a> _tricontours_.<b>contour</b>(_data_[, _value_])

Returns a contour, as a MultiPolygon in GeoJSON format, containing all points with a value larger or equal to _value_. The value is indicated as _geometry_.value 

<a href="#contours" name="contours">#</a> _tricontours_.<b>contours</b>(_data_)

Returns an iterable over the contours.

<a href="#isobands" name="isobands">#</a> _tricontours_.<b>isobands</b>(_data_)

Returns an iterable over the isobands (contours between pairs of consecutive threshold values). _geometry_.value is equal to [value0, value1].

<a href="#x" name="x">#</a> _tricontours_.<b>x</b>([_x_])

Sets the *x* accessor. Defaults to \`d => d[0]\`. If _x_ is not given, returns the current x accessor.

<a href="#y" name="y">#</a> _tricontours_.<b>y</b>([_y_])

Sets the *y* accessor. Defaults to \`d => d[1]\`. If _y_ is not given, returns the current y accessor.

<a href="#value" name="value">#</a>  _tricontours_.<b>value</b>([_value_])

Sets the *value* accessor. Defaults to \`d => d[2]\`. Values must be defined and finite. If _value_ is not given, returns the current value accessor.

<a href="#thresholds" name="thresholds">#</a>  _tricontours_.<b>thresholds</b>([_thresholds_])

Sets the thresholds, either explicitly as an array of values, or as a count that will be passed to d3.ticks. If empty, returns the current thresholds.


_The following are still experimental_

<a href="#triangulate" name="triangulate">#</a>  _tricontours_.<b>triangulate</b>([_triangulate_])

Sets the *triangulate* function. Defaults to d3.Delaunay.from. See [UK tricontours](https://observablehq.com/d/b8bf49a3048a6f3d) for a detailed example.

<a href="#pointInterpolate" name="pointInterpolate">#</a> _tricontours_.<b>pointInterpolate</b>(_[pointInterpolate]_)

Sets the *pointInterpolate* function. Arguments: *i*, *j*, *0≤a<1*. Defaults to linear interpolation between the coordinates of points *i* and *j*. See [Spherical tricontours](https://observablehq.com/d/fa704c04f1a3de6a) for a detailed example.
