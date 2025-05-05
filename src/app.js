const express = require('express');

const app = express();

const port = 7777
// will only execute whatever you pass
// app.use('/user' , (req , res) =>{
//     res.send("HAHAHA")
// })

// if write ab?c then b is optional here  works like query
// if write ab+c means u can add abbbbbbbbc (many times b)
// if write ab*cd means anything between ab and cd 
// if write a(bc)?d means bc is optional
// if write /a/ means a will be included like cat , car
// if write /.*fly$ means aything end with fly will work butterfly work , butterfly1 will not work

app.get('/user/:userid' , (req , res) =>{
     console.log(req.query)     // /user?userid=101&roll=12
     console.log(req.params)
    res.send({firstname : "Jyoti" , lastname : "Mahajan"})
})

app.post('/user' , (req , res) =>{
    res.send("Data successfully added")
})

app.delete('/user',(req , res) =>{
    res.send("Deleted successfully")
})



// app.use/()
//  this will macth all the HTTP request
// output - Route Handler 3
app.use('/test' , (req , res, next) =>{
    console.log("route handler 1")
    // res.send("Router Handler")
    next();
},
(req , res, next) =>{
    console.log("route handler 2")
    // res.send("Router handler 2")
    next() // for sending it to the next route handler
},
(req, res) =>{
    console.log("router handler 3")
    res.send("Route Handler 3")
}
)

//gives error cant find get
app.use('/test1' , (req , res, next) =>{
    console.log("route handler 1")
    // res.send("Router Handler")
    next();
},
[(req , res, next) =>{
    console.log("route handler 2")
    // res.send("Router handler 2")
    next()
},
(req, res , next) =>{
    console.log("router handler 3")
    // res.send("Route Handler 3")
    next()
}]
)

// output - Response !! and error in console
app.use('/test2' , (req, res, next) =>{
    console.log("Handling the route user!!")
    res.send("Response!!")
    next()
} , (req , res) =>{
    console.log("Handling the route user 2!!")
    res.send("Response 2")
})

// output - Response test4
app.use("/test3", (req , res, next) =>{
    console.log("Router test3")
    next()
    res.send("Response test3")
},(req , res) =>{
    res.send("Response test4")
})
// wrap anything inside an array or not need to wrap work both ways
// app.use('/end-point' , rh , rh2 , [rh3 , rh4] , rh5)

// another way to write route handler
app.use('/test12' , (req , res , next) =>{
    console.log("test12 response")
    next()
})
app.use('/test12' , (req , res) =>{
    console.log("Response test123")
    res.send("Response test123")
} )

// GET /users  ----> go to middleware chain  ===> request handler
app.listen(port , () =>{
    console.log(`Server is listening on port ${port}`)
})