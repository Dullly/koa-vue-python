import axios from 'axios'
const $ajax = {
	async get(api, data) {
		try {
			let res = await axios.get("http://127.0.0.1:3002/python/"+api, {
				params: data
			})
			res = res.data
			return new Promise((resolve) => {
                resolve(res)
			})
		} catch (err) {
			console.log(err)
			return err.message
		}
	},
	async post(api, data) {
		console.log(api)
		console.log(data)
		try {
			let res = await axios.post("http://127.0.0.1:3002/python/"+api, data)
			res = res.data
			return new Promise((resolve) => {
                resolve(res)
			})
		} catch (err) {
			console.log(err)
			return err.message
		}
	},
}

module.exports = $ajax
