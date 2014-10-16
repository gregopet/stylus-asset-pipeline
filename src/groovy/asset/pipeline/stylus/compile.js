// Prevent a Rhino exception
Error.captureStackTrace = function(context, error) { 
  throw new Error(context) ;
};

var compile = function(fileText, paths) {
	var errors, parsed
	stylus(fileText).render(function (err, str) {
		errors = err;
		parsed = str
	})
	
	if (errors) {
		Packages.asset.pipeline.stylus.StylusJSCompiler.print("Error parsing Stylus file: \n" + errors.message);
		throw errors;
	}
    return parsed;
};
