const path = require('path');


module.exports = [
	{
		entry: './client-lib/index.mjs',
		mode: 'production',
		// mode: 'development',
		"devtool": 'source-map',
		experiments: {
			outputModule: true,
		},
		output: {
			filename: 'dialog.mjs',
			path: path.resolve(__dirname, 'public/js'),
			library: {
				type: 'module',
			}
		},
		module: {
			rules: [
				{ test: /\.tmpl$/, use: 'tripartite/webpack-loader.mjs' }
				, { test: /\.tri$/, use: 'tripartite/webpack-loader.mjs' }
			],
		},
		stats: {
			colors: true,
			reasons: true
		}
		, externals: {
			"@webhandle/backbone-view": '@webhandle/backbone-view'
		}

	}
	
]