import bcrypt from "bcryptjs";
export const hashpwd = async(plainpwd)=>{
    return await bcrypt.hash(plainpwd,10);
}

export const comparepwd = async(plainpwd , hashpwd)=>{
    return await bcrypt.compare(plainpwd , hashpwd);
};