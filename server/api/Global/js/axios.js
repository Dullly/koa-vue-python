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
	async post(url, data) {
		try {
			let res = await axios.post(url, {
                params: data
            })
			res = res.data
			return new Promise((resolve, reject) => {
                reject(res)
			})
		} catch (err) {
			console.log(err)
			return err.message
		}
	},
}

module.exports = $ajax
