package asset.pipeline.stylus

import groovy.util.logging.Log4j

import org.mozilla.javascript.Context
import org.mozilla.javascript.RhinoException
import org.mozilla.javascript.JavaScriptException
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.Scriptable
import org.mozilla.javascript.NativeObject
import org.springframework.core.io.ClassPathResource

import asset.pipeline.AssetFile
import asset.pipeline.AssetHelper
import asset.pipeline.CacheManager

/**
 * Compiles Stylus files into .css for the asset pipeline.
 */
@Log4j
class StylusJSCompiler {
	public static final ThreadLocal threadLocal = new ThreadLocal();
	Scriptable globalScope
	ClassLoader classLoader
	def precompilerMode
	static final String builtInFunctionsIdentifier = "STYLUS-BUILT-IN-FUNCTIONS.styl"

	StylusJSCompiler(precompiler = false) {
		this.precompilerMode = precompiler ? true : false
		
		try {
			classLoader = getClass().getClassLoader()

			def shellJsResource = new ClassPathResource('asset/pipeline/stylus/shell.js', classLoader)
			def envRhinoJsResource = new ClassPathResource('asset/pipeline/stylus/env.rhino.js', classLoader)
			def hooksJsResource = new ClassPathResource('asset/pipeline/stylus/hooks.js', classLoader)
			def fileSupportResource = new ClassPathResource('asset/pipeline/stylus/fileFuncs.js', classLoader)
			def stylusJsResource = new ClassPathResource('asset/pipeline/stylus/stylus.js', classLoader)
			def compileJsResource = new ClassPathResource('asset/pipeline/stylus/compile.js', classLoader)
			
			Context cx = Context.enter()
			try {
				cx.setOptimizationLevel(-1)
				globalScope = cx.initStandardObjects()
				this.evaluateJavascript(cx, shellJsResource)
				this.evaluateJavascript(cx, envRhinoJsResource)
				this.evaluateJavascript(cx, hooksJsResource)
				this.evaluateJavascript(cx, fileSupportResource)
				this.evaluateJavascript(cx, stylusJsResource)
				this.evaluateJavascript(cx, compileJsResource)
			} finally {
				Context.exit()
			}
		} catch (JavaScriptException e) {
			throw new Exception("Stylus Engine initialization failed: ${e.message}\n ${e.scriptStackTrace}")
		} catch (Exception e) {
			throw new Exception("Stylus Engine initialization failed.", e)
		}
	}

	def evaluateJavascript(context, resource) {
		def inputStream = resource.inputStream
		context.evaluateReader(globalScope, new InputStreamReader(inputStream, 'UTF-8'), resource.filename, 0, null)
	}

	public def process (String input, AssetFile assetFile) {
		def compileErrors = [:] //store Stylus compilation errors into this object!
		try {
			if (!this.precompilerMode) {
				threadLocal.set(assetFile);
			}
			def cx = Context.enter()
			try {
				def compileScope = cx.newObject(globalScope)
				compileScope.setParentScope(globalScope)
				compileScope.put("stylusSrc", compileScope, input)
				compileScope.put("sourceFile", compileScope, assetFile.name)
				compileScope.put("bifs", compileScope, builtInFunctionsIdentifier)
				compileScope.put("errors", compileScope, compileErrors)
				def result = cx.evaluateString(compileScope, "compile(stylusSrc, sourceFile, bifs, errors)", "Stylus compile command", 0, null)
				if (result instanceof String) {
					return result
				}
			} finally {
				Context.exit()
			}
		} catch (JavaScriptException e) {
			def errorDetails = "Stylus Engine Compiler Crashed - ${assetFile.name}.\n"
			errorDetails += e.scriptStackTrace
			if (errorMeta && errorMeta.get('message')) {

				//errorDetails += " -- ${errorMeta.get('message')} Near Line: ${errorMeta.line}, Column: ${errorMeta.column}\n"
				errorDetails += " -- ${errorMeta.get('message')}\n"
			}

			if (precompilerMode && !assetFile.baseFile) {
				log.error(errorDetails)
				return input
			} else {
				throw new Exception(errorDetails, e)
			}
		} catch (Exception e) {
			throw new Exception("Stylus Engine compilation of Stylus to CSS failed.", e)
		}
		
		//if we got to here then Stylus encountered a parse error and handled it internally
		log.error "Stylus compiler encountered an error in file: " + compileErrors.message
		throw new StylusException("Stylus compiler encountered an error!", compileErrors.message)
	}

	/**
	 * Enables logging from Javascript files.
	 */
	static void print(text) {
		log.debug text
	}

	/**
	 * Read a text file using the specified encoding and return it as a String.
	 */
	static String readTextFile(String existingPath, String encoding, NativeArray paths) {
		// Handle a request for the built-in functions which are located in the resources
		if (existingPath == builtInFunctionsIdentifier) {
			def builtInFunctions = new ClassPathResource('asset/pipeline/stylus/built-in-functions.styl', (ClassLoader)getClass().getClassLoader())
			return builtInFunctions.inputStream.text
		}
	
		def existingFile = AssetHelper.fileForFullName(existingPath)
		return existingFile.inputStream.getText(encoding)
	}

	/**
	 * Read a binary file and return it as a Javascript native array.
	 * If position or length are defined, read only part of the file; else read the entire thing.
	 * HACK: to be fully compliant the function should return the number of bytes read but it does not seem to matter for now!
	 */
	static NativeArray readFile(String existingPath, Integer position, Integer length, NativeArray paths) {
		def buffer
		
		def file = AssetHelper.fileForFullName(existingPath)
		if (position || length) {
			buffer = new byte[position + length]
			//file.inputStream.skip(position) <-- does not work for some reason
			file.inputStream.read(buffer, 0, position + length)
			buffer = buffer[position..<position+length]
		} else {
			buffer = file.bytes
		}
		
		def unsignedByteArray = buffer.collect { it & 0xFF }.toArray()
		def returnArray = new NativeArray(unsignedByteArray)
		returnArray.prototype = paths.prototype
		return returnArray
	}

	/**
	 * Finds an asset URI in the local folders.
	 * TODO: support wildcard searches as defined in the Stylus documentation.
	 * @return An array of found path strings.
	 */
	 static NativeArray resolveUri(String path, NativeArray paths, Boolean includeFullPath = false) {
		//handle the built in functions which are provided as a separate file
		if (path == builtInFunctionsIdentifier) {
			//log.trace "'found' the native functions file"
			def array = new NativeArray([builtInFunctionsIdentifier].toArray())
			array.prototype = paths.prototype
			return array
		}
		def fileName = AssetHelper.nameWithoutExtension(path)
		def assetFile = threadLocal.get();
		def newFile = AssetHelper.fileForFullName(path)
		
		if (newFile) {
			CacheManager.addCacheDependency(assetFile.path, newFile)
			def file = new NativeArray([newFile.path ?: path] as Object[])
			file.prototype = paths.prototype
			//log.trace "resolveUri: found file $path, $paths"
			return file
		}
		
		//log.trace "resolveUri: could not find file $path, $paths"
		
		def emptyArray = new NativeArray()
		emptyArray.prototype = paths.prototype
		return emptyArray
    }
	
	/**
	 * Opens a File instance for a known existing path.
	 */
	static File getExistingFile(String existingPath, NativeArray paths) {
		def hits = resolveUri(existingPath, paths, true)
		if (!hits.length) return null
		else return new File(hits.get(0))
	}
	
	/**
	 * Returns enough information about a file to construct a fStat-like structure.
	 * WARNING: this function no longer works properly as asset pipeline no longer gives
	 * access to absolute files. It doesn't seem to bother Stylus, though.
	 */
	static def fStat(String existingPath, NativeArray paths) {
		def file = getExistingFile(existingPath, paths)
		if (!file) return null
		else {
			def returnObject = new NativeObject()
			returnObject.put("isFile", returnObject, file.isFile());
			returnObject.put("mtime", returnObject, file.lastModified());
			returnObject.put("fsize", returnObject, file.length());
			return returnObject
		}
	}
}

trait NoStackTraceException {
	Throwable fillInStackTrace() {
		return this
	}
}
/*
 * An exception to throw when the problem rests solely in user's Stylus file and doesn't
 * need to see the Java strack trace as well.
 */
class StylusException extends RuntimeException implements NoStackTraceException {
	String stylusStackTrace
	
	StylusException(String m, String stackTrace) {
		super(m)
		stylusStackTrace = stackTrace
	}
}