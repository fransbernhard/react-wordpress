var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	hot: true,
	filename: config.output.filename,
	publicPath: config.output.publicPath,
	proxy: {
		'/getMail': 'http://127.0.0.1:8227/frontend/php/mailer.php',
		'/getProducts': 'http://127.0.0.1:8227/frontend/php/products.php'
	},
	stats: {
		colors: true
	},
	historyApiFallback: {
		disableDotRule: true
	}
});

server.listen(8227, '127.0.0.1', () => {
	console.log('Starting server on http://127.0.0.1:8227');
});
