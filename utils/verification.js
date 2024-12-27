const verification=(data)=>{
    const{name,subscribedToChannel}=data;
    let arr=[]
    if(!name){
        arr.push({name:'String name missing'})
        
    }
    if(!subscribedToChannel){
       arr.push({subscribedToChannele:'String name missing'})
    }
    return arr
    
    
}
module.exports=verification