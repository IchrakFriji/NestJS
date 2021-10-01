import * as mongoose from'mongoose';
export const UserSchema = new mongoose.Schema({
    FullName:String,
    Email: String,
    Password: String,

});
export interface User{
    id?: string,
    FullName: string,
    Email:string,
    Password: string,
}