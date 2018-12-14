module.exports = {
	baseUrl: '/',
	outputDir: 'dist',
	configureWebpack: {
		externals: {
			vue: "Vue",
			"vue-router": "VueRouter",
			"element-ui": "ELEMENT"
		}
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true
			},
			'/python': {
				target: 'http://localhost:3002',
				changeOrigin: true
			},
		}
	}
}
