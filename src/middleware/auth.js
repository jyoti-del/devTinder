const adminAuth = (req , res, next) =>{
    console.log("admin auth")
    const token = "abc";
    const isAdminAuthorized = token === "abc"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }
   
}

const userAuth = (req , res, next) =>{
    console.log("user auth")
    const token = "abc";
    const isUserAuthorized = token === "abc"
    if(!isUserAuthorized){
        res.status(401).send("Unauthorized")
    }else{
        next()
    }
   
}

module.exports = {adminAuth , userAuth}