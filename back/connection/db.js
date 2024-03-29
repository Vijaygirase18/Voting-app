const mongoose = require('mongoose');

const db = mongoose.connect(`mongodb://0.0.0.0:27017/vote`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
})
.then(()=>{

    console.log("DB connected");
}).catch((error)=>{
    console.log('error',error);
})
module.exports = db;