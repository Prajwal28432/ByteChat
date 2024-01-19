const mongoose = require('mongoose');
const bcrpyt =require('bcryptjs')
const userSchema  = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true},

    pic:{
        type:String,
       
        default:"https://icon-library.com/images/profile-png-icon/profile-png-icon-7.jpg"
    },
//
},
{
    timestamps:true
}
)
userSchema.methods.matchPassword =async function(enteredPassword){
    return await bcrpyt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function(req,res,next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrpyt.genSalt(10);
    this.password = await bcrpyt.hash(this.password,salt);
})
const User = mongoose.model("User",userSchema);

module.exports=User;