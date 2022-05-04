var mongoose = require('mongoose')

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.alwth.mongodb.net/${process.env.DBNAME}`
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true
}

mongoose.connect(uri, options)
	.then(() => {
		console.log('connectado a la db')
	})
	.catch( err => {
		console.error(err)
	})