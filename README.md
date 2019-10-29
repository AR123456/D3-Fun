svg Paths
<path d="M150 0 L75 200 L225 200 Z"/>
the d tells the svg how to draw

M - moveto - moves the "pen" to the starting position " x 150 , y 0
L - lineto - draw line to a point L x75, y 200 then to x225, y 200
Z - closepath - go back to the starting point and stop drawing

SVG paths -MDN
https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
W3 schools
https://www.w3schools.com/graphics/svg_path.asp

L = lineto
H = horizontal lineto
V = vertical lineto
C = curveto - takes 3 sets of 2 start point, position of control stick and end point - see mdm generator
https://developer.mozilla.org/en-US/docs/Web/CSS/Tools/Cubic_Bezier_Generator

S = smooth curveto
Q = quadratic Bézier curve
T = smooth quadratic Bézier curveto
A = elliptical Arc

data operator in d3
joins an array of data (which can be numbers, objects or other arrays) with the current selection.
The D3.js Data Operator returns three virtual selections rather than just the regular one like other methods.

The three virtual selections are enter, update and exit.

The enter selection contains placeholders for any missing elements.

The update selection contains existing elements, bound to data.

Any remaining elements end up in the exit selection for removal.
Thinking with Joins by Mike Bostock https://bost.ocks.org/mike/join/

inverting the bars - need to find the correct start possition of the rectancle which is the top of the rectangle y axies y(d.orders) in the code
