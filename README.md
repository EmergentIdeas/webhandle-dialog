# @webhandle/dialog

A pretty simple dialog which can be used for forms and notification and
can be stacked.

## Install

```
npm install @webhandle/dialog
```


## Usage 

### Server Side

```js
import setupDialog from "@webhandle/dialog/initialize-webhandle-component.mjs"
let managerDialog = await setupDialog(webhandle)

```

## Client Side

```js
import {Dialog, FormAnswerDialog} from "@webhandle/dialog"
let dialog = new Dialog({
	body: '<p>This is a notification.</p>'
	, title: 'A notification!'
	, showCancelButton: false
})
await dialog.open()
```

The FormAnswerDialog assumes that the dialog will contain form controls. After those controls
are drawn, it will inject the values from `data` into the form elements. When the user closes
the dialog, if they click okay, the values from the form elements will be gathered and used to
resolve the promise created when `open` was called.

```js
import {Dialog, FormAnswerDialog} from "@webhandle/dialog"
let dialog = new FormAnswerDialog({
	data: {
		name: 'Dan'
	}
	, title: 'Edit User Information'
	, body: '<form><input type="text" name="name" /></form>'
	, styles: {
		minWidth: "400px"
	}
})
console.log(await dialog.open())
```


### Options

title
: The dialog's title

body
: This can be a string or a function. The result will be used to populate the dialog.

modal
: Defaults to true

showCancelButton
: Defaults to true 

showOkayButton
: Defaults to true 

styles
: Styles applied to the dialog element.


### Beyond the Options

This dialog is based on the `@webhandle/backbone-view` component, so it is REALLY extensible.
