import setup from "../initialize-webhandle-component.mjs"

export default async function setupServer(webhandle) {
	webhandle.development = true
	await setup(webhandle)
}