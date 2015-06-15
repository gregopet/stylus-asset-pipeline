// Prevent Rhino exceptions by stubbing a V8 function.
Error.captureStackTrace = function(context, error) { };

/**
 * Compiles a unit of Stylus code.
 * @param fileText Contents of the file we're parsing
 * @param sourceFile Name of the source file so it will be included in error reports
 * @param bifs Path to the built-in functions of Stylus.
 * @param errors An empty object into which potential parsing errors will be fed
 * @return A string containing the CSS if the compilation was successful or null in case of errors
 */
var compile = function(fileText, sourceFile, bifs, errors) {
	//not used anymore, we're just using this object to access the Array prototype!
	globalPaths = []
	
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
