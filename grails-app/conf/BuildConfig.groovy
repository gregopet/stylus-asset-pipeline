grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.work.dir = 'target'
grails.project.class.dir = "target/classes"
grails.project.dependency.resolver = "maven" // or ivy

grails.project.fork = [
    // configure settings for compilation JVM, note that if you alter the Groovy version forked compilation is required
    //  compile: [maxMemory: 256, minMemory: 64, debug: false, maxPerm: 256, daemon:true],

    // configure settings for the test-app JVM, uses the daemon by default
    test: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, daemon:true],
    // configure settings for the run-app JVM
    run: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the run-war JVM
    war: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256, forkReserve:false],
    // configure settings for the Console UI JVM
    console: [maxMemory: 768, minMemory: 64, debug: false, maxPerm: 256]
]

grails.project.dependency.resolution = {
	
	inherits 'global'
	log 'warn'

	repositories {
		grailsCentral()
		grailsPlugins()
		mavenCentral()
	}
	
	dependencies {
		runtime 'org.springframework:spring-expression:4.0.5.RELEASE'
	}

	plugins {
		runtime ":asset-pipeline:1.9.2"
		
		build(":release:3.0.1", ":rest-client-builder:1.0.3") {
			export = false
		}
		
		//testing required classes
		build ":tomcat:7.0.54"
		compile ':cache:1.1.7'
	}
}
