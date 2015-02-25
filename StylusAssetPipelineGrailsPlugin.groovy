import asset.pipeline.AssetHelper
import asset.pipeline.stylus.StylusAssetFile

class StylusAssetPipelineGrailsPlugin {
	def version = "0.8.4"
	def grailsVersion = "2.0 > *"

	def title = "Stylus Asset Pipeline Plugin"
	def author = "Gregor Petrin"
	def authorEmail = "gregap@gmail.com"
	def description = '''\
Provides Stylus support for the asset-pipeline static asset management plugin.'''

	def documentation = "http://grails.org/plugin/stylus-asset-pipeline"
	def license = "APACHE"
	def organization = [ name: "Razum d.o.o.", url: "http://razum.si/" ]
	def issueManagement = [ system: "GITHUB", url: "http://github.com/gregopet/stylus-asset-pipeline/issues" ]
	def scm = [ url: "http://github.com/gregopet/stylus-asset-pipeline" ]
	
	def doWithDynamicMethods = { ctx ->
		AssetHelper.assetSpecs << StylusAssetFile
	}
}
