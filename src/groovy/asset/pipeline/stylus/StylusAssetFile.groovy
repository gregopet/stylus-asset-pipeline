package asset.pipeline.stylus

import groovy.util.logging.Log4j
import asset.pipeline.AbstractAssetFile
import asset.pipeline.less.compilers.*
import asset.pipeline.processors.CssProcessor
import java.util.regex.Pattern

@Log4j
class StylusAssetFile extends AbstractAssetFile {
  static final contentType = ['text/css']
  static extensions = ['styl', 'css.styl']
  static final String compiledExtension = 'css'
  static processors = [StylusProcessor, CssProcessor]
  Pattern directivePattern = ~/\*=(.*)/
}