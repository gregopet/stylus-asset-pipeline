package asset.pipeline.stylus

import groovy.util.logging.Log4j

import org.mozilla.javascript.Context
import org.mozilla.javascript.JavaScriptException
import org.mozilla.javascript.NativeArray
import org.mozilla.javascript.Scriptable
import org.springframework.core.io.ClassPathResource

import asset.pipeline.AssetFile
import asset.pipeline.AssetHelper
import asset.pipeline.CacheManager

@Log4j
class StylusJSCompiler {
  public static final ThreadLocal threadLocal = new ThreadLocal();
  Scriptable globalScope
  ClassLoader classLoader
  def precompilerMode

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

    } catch (Exception e) {
      throw new Exception("Stylus Engine initialization failed.", e)
    }
  }

  def evaluateJavascript(context, resource) {
    def inputStream = resource.inputStream
    context.evaluateReader(globalScope, new InputStreamReader(inputStream, 'UTF-8'), resource.filename, 0, null)

  }
  
  public def process (String input, AssetFile assetFile) {
    try {
      if (!this.precompilerMode) {
        threadLocal.set(assetFile);
      }
      def assetRelativePath = relativePath(assetFile.file)
      // def paths = AssetHelper.scopedDirectoryPaths(new File("grails-app/assets").getAbsolutePath())

      // paths += [assetFile.file.getParent()]
      def paths = AssetHelper.getAssetPaths()
      def relativePaths = paths.collect { [it, assetRelativePath].join(AssetHelper.DIRECTIVE_FILE_SEPARATOR) }
      // println paths
      paths = relativePaths + paths


      def pathstext = paths.collect {
        def p = it.replaceAll("\\\\", "/")
        if (p.endsWith("/")) {
          "'${p}'"
        } else {
          "'${p}/'"
        }
      }.toString()
      
      def cx = Context.enter()
      try {
        def compileScope = cx.newObject(globalScope)
        compileScope.setParentScope(globalScope)
        compileScope.put("stylusSrc", compileScope, input)
        return result
      } finally {
        Context.exit()
      }
    } catch (JavaScriptException e) {
      def errorMeta =  e.value

      def errorDetails = "Stylus Engine Compiler Failed - ${assetFile.file.name}.\n"
      if (precompilerMode) {
        errorDetails += "**Did you mean to compile this file individually (check docs on exclusion)?**\n"
      }
      if (errorMeta && errorMeta.get('message')) {
			compileScope.put("sourceFile", compileScope, assetFile.file.canonicalPath)
			def result = cx.evaluateString(compileScope, "compile(stylusSrc, sourceFile, ${pathstext})", "Stylus compile command", 0, null)

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
      throw new Exception("""
        Stylus Engine compilation of Stylus to CSS failed.
        $e
        """)
    }
  }
  
  static void print(text) {
    log.debug text
  }
  
  
	
  
  def relativePath(file, includeFileName = false) {
    def path
    if (includeFileName) {
      path = file.class.name == 'java.io.File' ? file.getCanonicalPath().split(AssetHelper.QUOTED_FILE_SEPARATOR) : file.file.getCanonicalPath().split(AssetHelper.QUOTED_FILE_SEPARATOR)
    } else {
      path = file.getParent().split(AssetHelper.QUOTED_FILE_SEPARATOR)
    }

    def startPosition = path.findLastIndexOf { it == "grails-app" }
    if (startPosition == -1) {
      startPosition = path.findLastIndexOf { it == 'web-app' }
      if (startPosition + 2 >= path.length) {
        return ""
      }
      path = path[(startPosition + 2)..-1]
    } else {
      if (startPosition + 3 >= path.length) {
        return ""
      }
      path = path[(startPosition + 3)..-1]
    }

    return path.join(AssetHelper.DIRECTIVE_FILE_SEPARATOR)
  }
	/**
	 * Read a text file using the specified encoding and return it as a String.
	 */
	static String readTextFile(File file, String encoding) {
		log.trace "Reading contents of text file (opened via file ${file})"
		file.getText(encoding)
	}

	/**
	 * Read a binary file and return it as a Javascript native array.
	 * If position or length are defined, read only part of the file; else read the entire thing.
	 * HACK: to be fully compliant the function should return the number of bytes read but it does not seem to matter for now!
	 */
	static NativeArray readFile(File file, Integer position, Integer length, NativeArray sampleArray) {
		log.trace "Reading contents of binary file (opened via the File instance file)"
		
		def buffer
		if (position || length) {
			buffer = new byte[length]
			file.withInputStream { InputStream stream -> 
				stream.skip(position)
				stream.read(buffer, 0, length)
			}
		} else {
			buffer = file.bytes
		}
		
		def unsignedByteArray = buffer.collect { it & 0xFF }.toArray()
		def returnArray = new NativeArray(unsignedByteArray)
		returnArray.prototype = sampleArray.prototype
		return returnArray
	}

	/**
	 * Finds an asset URI in the local folders.
	 * TODO: support wildcard searches as defined in the Stylus documentation.
	 */
	static NativeArray resolveUri(String path, NativeArray paths) {
		log.trace "Resolving asset(s) by path: $path"
		def assetFile = threadLocal.get();
		log.debug "resolveUri: path=${path}"
		def foundFiles = new HashSet()
		for (Object index : paths.getIds()) {
			def it = paths.get(index, null)
			def file = new File(it, path)
			log.trace "test exists: ${file}"
			if (file.exists()) {
				log.trace "found file: ${file}"
				if (assetFile) {
				CacheManager.addCacheDependency(assetFile.file.canonicalPath, file)
				}
				foundFiles << file.canonicalPath
			}
		}
		
		def array = new NativeArray(foundFiles.toArray())
		array.prototype = paths.prototype
		return array
	}

}
