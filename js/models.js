// models.js

import _ from 'underscore'

import DataBase from './indexDB'

const HOST = 'http://m.ctrip.com/restapi/soa2/10101/json';
const HEADINFO = {"cid":"09031011210220861783","ctok":"","cver":"1.0","lang":"01","sid":"8888","syscode":"09","auth":null,"extension":[{"name":"protocal","value":"http"}]};
const BODY = {
	contentType: "json",
	ext: "",
	flag: 0,
	environment: 1, //环境，wifi还是运营商网络
	ver: 614, //版本号
	head: HEADINFO
}

let Model = {};

class Models {

	constructor() {
		this.url = HOST + '';
		this.headInfo = HEADINFO;
		this.method = 'POST';
		this.body = BODY;
	}

	exe(cache = false) {
		let t = this;

		if (cache) {
			return new Promise((resolve, reject) => {
				DataBase.db.get(t.id, r => {
					if (r) {
						resolve(r)
						console.log('fetch from database!')
					} else {
						t.fetchHandler.call(t, resolve, reject)
					}
				})
			})
		} else {
			return new Promise((resolve, reject) => {
				t.fetchHandler.call(t, resolve, reject)
			})
		}
	}

	setParam(param) {
		this.body = _.extend(BODY, param);
	}

	fetchHandler(resolve, reject) {
		let
			param = JSON.stringify(this.body),
			t = this;
			
		fetch(this.url, {
			method: this.method,
			body: param
		})
		.then(res => {
			t.fetchComplete.call(t, resolve, res)
		})
		.catch(err => {
			t.fetchFail.call(t, reject, err)
		})
	}

	fetchComplete(resolve, res) {
		if (res.ok) {
		    res
		    .json()
		    .then(data => {
		    	resolve(data);
		    	data.id=this.id, DataBase.db.save(data);
		    	console.log('fetch from link!')
		    })
		    .catch(err => console.log(err))
		} else {
			console.log('Fetch failed!')
		}
	}

	fetchFail(reject, err) {
		reject(err)
	}

}

/**
* 热门城市接口
**/
class HotModel extends Models {
	constructor() {
		super();
		this.url = HOST + '/HotCitySearch';
		this.id = 'HotCity';
	}
}
Model.HotModel = HotModel;


module.exports = Model;



