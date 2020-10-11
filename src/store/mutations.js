export default{
    SHOP(state,data){
        state.shop=data
    },
    DATA(state,data){
      
        sessionStorage.shop=JSON.stringify(data);
        state.details=JSON.parse(sessionStorage.shop)
    },
    UPLOADLIST(state,data){
        data.forEach(item => {
        item.filelist=[]
        });
        sessionStorage.uplist=JSON.stringify(data)
        state.uploadlist=JSON.parse(sessionStorage.uplist)
    },
    //上传照片返回的数据
    INDEX(state,data){
        let datas=state.uploadlist;
        datas[data.index].filelist=data.data
        
    }
   
}