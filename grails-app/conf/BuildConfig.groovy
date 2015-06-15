grails.project.work.dir = 'target'
grails.project.dependency.resolution = {
	
	inherits 'global'
	log 'warn'

	repositories {
		grailsCentral()
		grailsPlugins()
		mavenCentral()
	}
	
	dependencies {
	}

	plugins {
		runtime ":asset-pipeline:2.1.5"
		
		build(":release:3.0.1", ":rest-client-builder:1.0.3") {
			export = false
		}
	}
}
