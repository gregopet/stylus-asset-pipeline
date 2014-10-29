// Prevent Rhino exceptions by stubbing a V8 function.
Error.captureStackTrace = function(context, error) { };

/**
 * Compiles a unit of Stylus code.
 * @param fileText Contents of the file we're parsing
 * @param sourceFile Name of the source file so it will be included in error reports
 * @param paths A variable that holds Asset Pipeline's paths when we have to do lookups
 * @param bifs Path to the built-in functions of Stylus.
 * @param errors An empty object into which potential parsing errors will be fed
 * @return A string containing the CSS if the compilation was successful or null in case of errors
 */
var compile = function(fileText, sourceFile, paths, bifs, errors) {
	//put paths into a global variable which is used in fileFuncs.js
	//TODO: avoid setting a global variable! Either don't pass the paths through Javascript at all
	//or construct a FS object containing it and inject it into Stylus!
	globalPaths = paths
	
	var parsed
	stylus(fileText)
		.set('filename', sourceFile)
		.set('linenos', true)
		.import(bifs)
		.render(function(err, str) {
			parsed = str
			
			if (err) {
				//store object errors into the Java object passed into the function
				var standardObject = {}
				for (var x in err) {
					errors.put(x, err[x])
				}
			}
		}
	)
	return parsed;
};
