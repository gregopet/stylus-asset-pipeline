package asset.pipeline.stylus

import groovy.util.logging.Log4j
import asset.pipeline.AbstractAssetFile
import asset.pipeline.less.compilers.*
import asset.pipeline.processors.CssProcessor

@Log4j
class StylusAssetFile extends AbstractAssetFile {
  static final String contentType = 'text/css'
  static extensions = ['styl', 'css.styl']
  static final String compiledExtension = 'css'
  static processors = [StylusProcessor, CssProcessor]

  @Override
  public String directiveForLine (String line) {
    line.find(/\*=(.*)/) { fullMatch, directive -> return directive }
  }
}