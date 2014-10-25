// Prevent a Rhino exception
Error.captureStackTrace = function(context, error) { 
  //throw new Error(error);
};

var compile = function(fileText, sourceFile, paths) {
	
	//set global paths for looking for files
	globalPaths = paths
	
	var parsed
	stylus(fileText)
		.set('filename', sourceFile)
		.include('path')
		.render(function (err, str) {
			parsed = str
			
			if (err) {
				//Packages.asset.pipeline.stylus.StylusJSCompiler.print('ERRORS OBJECT:')
				//for (var x in err) {
				//	Packages.asset.pipeline.stylus.StylusJSCompiler.print('' + x + ": " + err[x])
				//}
				Packages.asset.pipeline.stylus.StylusJSCompiler.print("Error parsing Stylus file: \n" + err.message);
				//Packages.asset.pipeline.stylus.StylusJSCompiler.print("(in line): " + errors.lineno);
				//Packages.asset.pipeline.stylus.StylusJSCompiler.print("(in file): " + errors.filename);
				//java.lang.System.out.println(stylus.utils.formatException(errors))
				//java.lang.System.out.println("-------------------")
				throw err;
			}
		}
	)
	
	return parsed;
};
