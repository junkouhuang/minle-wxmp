// import vue from 'vue'
import axios from 'axios'

function request(method,urls,params,res,err) {
    
    //判断环境
    // if (process.env.NODE_ENV === "development") {
    //     urls='api/'+url
    //     }else {
    //      urls='api2.common.xinquanjk.com/'+url
    //     }
    if(method=='get'||method=='delete'){
        
        axios({
            method:method,
            url:urls,
            params:params,
            

        })
        .then(res)
        .catch(err)
    }else{
        axios({
            method:method,
            url:urls,
            data:params,

        })
        .then(res)
        .catch(err)
    }
}
export {request}
