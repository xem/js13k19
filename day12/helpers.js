// Helpers
// -------

// Degrees to radians
var toRadians = (angle) => angle * (Math.PI / 180);

// Dist² between 2 points (Note for later: dist can be done with a simple Math.hypot)
var dist2 = (a, b) => (((a[0] - b[0]) ** 2) + ((a[1] - b[1]) ** 2));

// Log custom
var delog = () => deb.innerHTML = "";
var log = (...a) => deb.innerHTML += a + "\n";