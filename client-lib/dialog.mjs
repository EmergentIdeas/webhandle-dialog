import { View } from '@webhandle/backbone-view'

let defaultOptions = {
	tagName: 'dialog'
	, modal: true
	, showOkayButton: true
	, showCancelButton: true
}

let defaultStyles = {
	border: "solid 1px grey"
	, "border-radius": "5px"
	, "position": "relative"
	, "min-width": "300px"
	, "min-height": "300px"
	, "display": "flex"
	, "align-items": "stretch"
}

export class Dialog extends View {
	pre = '<div style="display: grid; width: 100%; grid-template-rows: auto 1fr auto; row-gap: 20px;">'
	post = "</div>"
	constructor(options) {
		super(Object.assign({}, defaultOptions, options))

		this.styles = Object.assign({}, defaultStyles, this.styles)
	}

	preinitialize(options) {
		this.events = Object.assign({}, {
			'click .title-bar .close': 'close',
			'click .footer .cancel': 'cancel',
			'click .footer .okay': 'okay',
		}, options.events)
		options.events = this.events
	}


	async render() {
		let top = await this.resolveItem(this.top)
		let body = '<div class="body" style="overflow: auto;">' + (await this.resolveItem(this.body)) + '</div>'
		let footer = await this.resolveItem(this.footer)

		this.el.insertAdjacentHTML('beforeend', this.pre + top + body + footer + this.post);

		for (let [key, val] of Object.entries(this.styles)) {
			this.el.style[key] = val
		}


		document.body.append(this.el)
		this.rendered = true

	}

	async open() {
		let p = new Promise(async (resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
			if (!this.rendered) {
				await this.render()
			}
			if (this.modal) {
				this.el.showModal()
			}
			else {
				this.el.show()
			}
			this.afterOpen()
		})
		return p
	}

	async resolveItem(item) {
		if (typeof item === 'string') {
			return item
		}
		if (typeof item === 'function') {
			return await item.apply(this)
		}
	}

	afterOpen() {

	}

	okay() {
		this.cleanup()
		this.resolve(true)
	}
	cancel() {
		this.cleanup()
		this.resolve(false)
	}

	close() {
		this.cleanup()
		this.resolve(false)
	}

	cleanup() {
		this.el.close()
		this.el.remove()
		this.rendered = false
		this.el.innerHTML = ''
	}

	top() {
		return `<div class="title-bar" style="display: grid; grid-template-columns: 1fr auto;">
	<span class="title">${this.title || ''}</span>
	<span class="close" style="font-size: 24px; cursor: pointer; margin-top: -5px;">&times</span>
</div>`
	}
	body() {

		return ''
	}
	footer() {
		let okayButton = `<button class="btn okay btn-default">OK</button>`
		let cancelButton = `<button class="btn cancel">Cancel</button>`
		return `
<div class="footer" >
${this.showOkayButton ? okayButton : ''}
${this.showCancelButton ? cancelButton : ''}
</div>
`
	}
}