Stylus Grails Asset Pipeline
==========================
The Grails `stylus-asset-pipeline` is a plugin that provides Stylus support for the asset-pipeline static asset management plugin. Most of it is copied from the [less-asset-pipeline](https://github.com/bertramdev/less-grails-asset-pipeline)

For more information on how to use asset-pipeline, visit [here](http://www.github.com/bertramdev/asset-pipeline).


Usage
-----

Simply create files in your standard `assets/stylesheets` folder with extension `.styl` or `.css.styl`. You also may require other files by using the following requires syntax at the top of each file:

```css
/*
*= require test
*= require_self
*= require_tree .
*/
```

WARNING: Native Stylus importing does not work (yet).

Including Stylus files into your GSP files is easy but there are a few things worth mentioning. Say we have a file called `application.styl`. You would include it into your gsp by its compiled extension instead of its original extension. aka, use `.css` instead of `.styl`

```gsp
<head>
  <asset:stylesheet src="application.css"/>
</head>
```

Production
----------
During war build your styl files are compiled into css files. This is all well and good but sometimes you dont want each individual styl file compiled, but rather your main base styl file. It may be best to add a sub folder for those Stylus files and exclude it in your precompile config...

Config.groovy:
```groovy
grails.assets.excludes = ["mixins/*.styl"]
```
