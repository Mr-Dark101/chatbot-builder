export  axiosAuth = axios.create()

//we intercept every requests 
axiosAuth.interceptors.request.use(async function(config){
    //anything you want to attach to the requests such as token 
    return config;
}, error => {
    return Promise.reject(error)
})


//we intercept every response
axiosAuth.interceptors.request.use(async function(config){
    
    return config;
}, error => {
//check for authentication or anything like that
    return Promise.reject(error)
})