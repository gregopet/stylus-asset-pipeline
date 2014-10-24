//Array is a close enough representation of the Node Buffer..
Buffer = Array

var glob = {
	sync : function(path) {
		//java.lang.System.out.println("GLOB WAS CALLED: " + path + " (" + globalPaths + ")");
		var files = Packages.asset.pipeline.stylus.StylusJSCompiler.resolveUri(path, globalPaths);
		//java.lang.System.out.println("FOUND FILES: " + files + " ;length is " + files.length);
		var paths = []
		for (var a = 0; a < files.length; a++) {
			paths.push(files[a].getName())
		}
		return paths;
	}
}

// Searches for a local path in the assets folder
var pathToSingleFile = function(path) {
	var files = Packages.asset.pipeline.stylus.StylusJSCompiler.resolveUri(path, globalPaths)
	if (files.length > 0) {
		return files[0]
	} else {
		return null
	}
}

// Creates a Node.js fs.Stats compatible object with just the fields required by Stylus
// see http://nodejs.org/api/fs.html#fs_class_fs_stats
var fStatSync = function(file) {
	return {
		isFile: function() { return file.isFile() },
		mtime: new Date( file.lastModified() ),
		size : file.length()
	}
}

var fs = {
	statSync : function(path) {
		//java.lang.System.out.println("statSync CALLED FOR PATH " + path);
		var file = pathToSingleFile(path)
		if (file) {
			return fStatSync(file)
		} else {
			return null
		}
	},
	fstatSync : function(file) {
		//java.lang.System.out.println("fstatSync CALLED FOR FILE " + file);
		return fStatSync(file)
	},
	readFileSync : function(path, encoding) {
		var file = pathToSingleFile(path)
		if (!file) return null
		if (encoding) {
			//return text
			//java.lang.System.out.println("readFileSync CALLED FOR TEXT FILE " + path)
			return '' + Packages.asset.pipeline.stylus.StylusJSCompiler.readTextFile(file, encoding)
		} else {
			//return bytes
			//java.lang.System.out.println("readFileSync CALLED FOR BINARY FILE " + path)
			return Packages.asset.pipeline.stylus.StylusJSCompiler.readFile(file, null, null, [])
		}
	},
	//Read data from the file specified by fd.
	//buffer is the buffer that the data will be written to.
	//offset is the offset in the buffer to start writing at.
	//length is an integer specifying the number of bytes to read.
	//position is an integer specifying where to begin reading from in the file. If position is null, data will be read from the current file position.
	readSync : function(file, buffer, offset, length, position) {
		var slice = Packages.asset.pipeline.stylus.StylusJSCompiler.readFile(file, position, length, [])
		buffer.splice.apply(buffer, [offset, length + 1].concat(slice))
		return slice.length
	},
	openSync : function(path) {
		//java.lang.System.out.println("openSync CALLED FOR FILE " + path)
		var file = pathToSingleFile(path)
		if (!file) throw new Error("File " + path + " does not exist!")
		return file
	},
	closeSync : function(file) {
		//java.lang.System.out.println("closeSync CALLED FOR FILE " + file)
		return true //NOT IMPLEMENTED
	}
}