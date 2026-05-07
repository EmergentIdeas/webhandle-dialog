import createInitializeWebhandleComponent from "@webhandle/initialize-webhandle-component/create-initialize-webhandle-component.mjs"
import ComponentManager from "@webhandle/initialize-webhandle-component/component-manager.mjs"
import path from "node:path"
import setupBackboneView from "@webhandle/backbone-view/initialize-webhandle-component.mjs"

let initializeWebhandleComponent = createInitializeWebhandleComponent()

initializeWebhandleComponent.componentName = '@webhandle/dialog'
initializeWebhandleComponent.componentDir = import.meta.dirname
initializeWebhandleComponent.defaultConfig = {
	"publicFilesPrefix": "/@webhandle/dialog/files"
	, "provideResources": false
}

initializeWebhandleComponent.setup = async function(webhandle, config) {
	let manager = new ComponentManager()
	
	let managerBackboneView = await setupBackboneView(webhandle)

	manager.provideExternalResources = function(externalResourceManager) {

		let resource = {
			mimeType: 'application/javascript'
			, url: config.publicFilesPrefix + '/js/dialog.mjs'
			, name: '@webhandle/dialog'
			, resourceType: 'module'
			, cachable: webhandle.development ? false : true
		}
		externalResourceManager.provideResource(resource)

		resource = {
			mimeType: 'application/javascript'
			, name: '@webhandle/dialog/configuration'
			, resourceType: 'module'
			, cachable: webhandle.development ? false : true
			, data: {publicFilesPrefix: config.publicFilesPrefix}
		}
		externalResourceManager.provideResource(resource)
	}
	
	manager.addExternalResources = function(externalResourceManager) {
		manager.provideExternalResources(externalResourceManager)
	}

	webhandle.addTemplate(initializeWebhandleComponent.componentName + '/addExternalResources', (data) => {
		let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
		manager.addExternalResources(externalResourceManager)
	})
	webhandle.addTemplate(initializeWebhandleComponent.componentName + '/renderExternalResources', (data) => {
		let externalResourceManager = initializeWebhandleComponent.getExternalResourceManager(data)
		manager.addExternalResources(externalResourceManager)
		return externalResourceManager.render()
	})
	
	if(config.provideResources) {
		webhandle.routers.preDynamic.use((req, res, next) => {
			manager.provideExternalResources(res.locals.externalResourceManager)
			next()
		})
	}
	
	let dir = 'public'
	manager.staticPaths.push(
		webhandle.addStaticDir(
			path.join(initializeWebhandleComponent.componentDir, dir),
			{
				urlPrefix: config.publicFilesPrefix
				, fixedSetOfFiles: true
			}
		)
	)
	return manager
}

export default initializeWebhandleComponent
