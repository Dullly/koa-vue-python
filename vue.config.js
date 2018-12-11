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
				//target: 'http://129.204.15.134:3001',
				target: 'http://localhost:3001',
				changeOrigin: true
			},
		}
	}
}
