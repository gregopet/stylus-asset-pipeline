//Array is a close enough representation of the Node Buffer..
Buffer = Array


//define a node.js global
__dirname = "."

var glob = {
	sync : function(path) {
		//java.lang.System.out.println("GLOB WAS CALLED: " + path + " (" + globalPaths + ")");
		var files = Packages.asset.pipeline.stylus.StylusJSCompiler.resolveUri(path, globalPaths);
		//java.lang.System.out.println("FOUND FILES: " + files + " ;length is " + files.length);
		return files;
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
// TODO: move into Groovy code!
var fStatSync = function(existingPath) {
	if (!existingPath) throw "File " + existingPath + " not found!"
	//java.lang.System.out.println("fstatSync (internal) CALLED FOR PATH " + existingPath);
	var descriptor = Packages.asset.pipeline.stylus.StylusJSCompiler.fStat(existingPath, globalPaths)
	//java.lang.System.out.println("fstatSync (internal) GOT OBJECT " + descriptor);
	if (!descriptor) throw "File " + existingPath + " not found!"
	else return {
		isFile: function() { return descriptor.isFile },
		mtime: new Date( descriptor.mtime ),
		size : descriptor.size
	}
}

var fs = {
	statSync : function(path) {
		//java.lang.System.out.println("statSync CALLED FOR PATH " + path);
		var existingPath = pathToSingleFile(path)
		if (existingPath) {
			//java.lang.System.out.println("statSync FOUND FILE AT PATH " + path);
			return fStatSync(existingPath)
		} else {
			//java.lang.System.out.println("statSync FAILED TO FIND FILE " + path);
			throw "File " + existingPath + " not found!"
		}
	},
	fstatSync : function(existingPath) {
		//java.lang.System.out.println("fstatSync CALLED FOR FILE " + existingPath);
		return fStatSync(existingPath)
	},
	readFileSync : function(path, encoding) {
		var existingPath = pathToSingleFile(path)
		if (!existingPath) throw new Error("(readFileSync) File " + path + " does not exist!")
		if (encoding) {
			//return text
			//java.lang.System.out.println("readFileSync CALLED FOR TEXT FILE " + path)
			return '' + Packages.asset.pipeline.stylus.StylusJSCompiler.readTextFile(existingPath, encoding, globalPaths)
		} else {
			//return bytes
			//java.lang.System.out.println("readFileSync CALLED FOR BINARY FILE " + path)
			return Packages.asset.pipeline.stylus.StylusJSCompiler.readFile(existingPath, null, null, globalPaths)
		}
	},
	//Read data from the file specified by fd.
	//buffer is the buffer that the data will be written to.
	//offset is the offset in the buffer to start writing at.
	//length is an integer specifying the number of bytes to read.
	//position is an integer specifying where to begin reading from in the file. If position is null, data will be read from the current file position.
	readSync : function(existingPath, buffer, offset, length, position) {
		var slice = Packages.asset.pipeline.stylus.StylusJSCompiler.readFile(existingPath, position, length, globalPaths)
		buffer.splice.apply(buffer, [offset, length + 1].concat(slice))
		return slice.length
	},
	openSync : function(path) {
		//java.lang.System.out.println("openSync CALLED FOR FILE " + path)
		var existingPath = pathToSingleFile(path)
		if (!existingPath) {
			//java.lang.System.out.println("openSync COULD NOT FIND FILE " + path + ", THROWING JS EXCEPTION")
			throw new Error("File " + path + " does not exist!")
		}
		return existingPath
	},
	closeSync : function(existingPath) {
		//java.lang.System.out.println("closeSync CALLED FOR FILE " + existingPath)
		return true //NOT IMPLEMENTED
	},
	realpathSync: function(filename) {
		//java.lang.System.out.println("REALPATH CALLED FOR " + filename)
		return filename
	}
}