const mongoose=require('mongoose');
const userInformationSchema=new mongoose.Schema({
    username:{
        type:String,
        default:""
    },
    authId:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now()
    }
});
module.exports=mongoose.model('UserAuthInfo',userInformationSchema);