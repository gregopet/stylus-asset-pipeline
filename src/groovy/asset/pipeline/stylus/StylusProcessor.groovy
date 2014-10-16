package asset.pipeline.stylus

import groovy.util.logging.Log4j
import asset.pipeline.AssetCompiler
import asset.pipeline.AssetFile

@Log4j
class StylusProcessor {
	AssetCompiler precompiler
	
	StylusProcessor(AssetCompiler precompiler) {
		this.precompiler = precompiler
	}
	
	public def process (String input, AssetFile assetFile) {
		StylusJSCompiler compiler = new StylusJSCompiler(precompiler)
		return compiler.process(input, assetFile)
	}
}