import { Dialog } from "./dialog.mjs";
import formValueInjector from "form-value-injector"
import gatherFormData from '@webhandle/gather-form-data'

export class FormAnswerDialog extends Dialog {
	/**
	 * 
	 * @param {Object} options Properties to create the dialog box. In addition to the properties from Dialog
	 * there those below.
	 * @param {Object} options.data The data which will be used to populate the controls in the dialog
	 */
	constructor(options) {
		super(options)
	}

	afterOpen() {
		super.afterOpen()
		let body = this.el.querySelector('.body')
		if (this.data) {
			body.innerHTML = formValueInjector(body.innerHTML, this.data)
		}
		let firstInput = body.querySelector('input, textarea')
		if (firstInput) {
			firstInput.focus()
		}

	}
	gatherData() {
		let body = this.el.querySelector('.body')
		return gatherFormData(body)
	}

	okay() {
		let data = this.gatherData()
		this.cleanup()
		this.resolve(data)
	}

}