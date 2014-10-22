var glob = {
	sync : function(path) {
		//java.lang.System.out.println("GLOB WAS CALLED: " + path + " (" + globalPaths + ")");
		var files = Packages.asset.pipeline.stylus.StylusJSCompiler.resolveUri(path, globalPaths);
		//java.lang.System.out.println("FOUND FILES: " + files + " ;length is " + files.length);
		return files;
	}
}

var fs = {
	statSync : function(path) {
		var file = new java.io.File(path);
		//java.lang.System.out.println("STAT CALLED FOR PATH " + path);
		//java.lang.System.out.println("GOT FILE " + file);
		return {
			isFile: function() { file.isFile() },
			mtime: function() { new Date(file.lastModified()) }
		}
	},
	readFileSync : function(path, encoding) {
		if (encoding) {
			//return text
			return '' + Packages.asset.pipeline.stylus.StylusJSCompiler.readTextFile(path, encoding)
		} else {
			//return bytes
			"NOT IMPLEMENTED!"
		}
	}
}