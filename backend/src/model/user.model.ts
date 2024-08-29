import { model,Schema } from "mongoose";

type UserType={
    firstName:string,
    lastName:string,
    email:string,
    passwordHash:string,
    isEmailVerified:boolean
}

const userSchema=new Schema<UserType>({
    firstName :{type:String,require:true},
    lastName : {type:String,require:true},
    email:{type:String,require:true,unique:true},
    passwordHash:{type:String,require:true},
    isEmailVerified:{type:Boolean,default:false}
})

const User=model<UserType>('user',userSchema)

export default User;