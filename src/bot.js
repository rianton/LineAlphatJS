const LineConnect = require('./connect');
let line = require('./main.js');
let LINE = new line();


const auth = {
	authToken: 'EsOqHDXlEoZRQbv81hP6.za+e5svtVOOkvtLheQuILG.rGXBhEmayJsOHJWw5CfSzc9/4hWdEvp9XQ9JG5XxZzA=',
	certificate: 'ef2f97ee74ecff6237ef4b72fe2dcabd74864bc73a17b3092843f2c274005384',
	email: '',
	password: ''
}

//let client =  new LineConnect();
let client =  new LineConnect(auth);

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});

