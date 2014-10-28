// Prevent a Rhino exception
Error.captureStackTrace = function(context, error) { 
	
};

var compile = function(fileText, sourceFile, paths, errors) {
	
	//set global paths for looking for files
	globalPaths = paths
	
	var parsed
	stylus.render(fileText, { filename: sourceFile, linenos: true }, function(err, str) {
			parsed = str
			
			if (err) {
				//store object errors into the Java object passed into the function
				var standardObject = {}
				for (var x in err) {
					errors.put(x, err[x])
				}
				return null;
			}
		}
	)
	
	return parsed;
};
