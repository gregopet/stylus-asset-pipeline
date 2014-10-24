// Prevent a Rhino exception
Error.captureStackTrace = function(context, error) { 
  //throw new Error(error);
};

var compile = function(fileText, sourceFile, paths) {
	
	//set global paths for looking for files
	globalPaths = paths
	
	var errors, parsed
	stylus(fileText).set('filename', sourceFile).render(function (err, str) {
		errors = err;
		parsed = str
	})
	
	if (errors) {
		Packages.asset.pipeline.stylus.StylusJSCompiler.print("Error parsing Stylus file: \n" + errors.message);
		throw errors;
	}
	return parsed;
};
