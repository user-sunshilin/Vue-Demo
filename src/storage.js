//封装 localStorage
var storage={
    //存数据
    setData(key,arr){
        localStorage.setItem(key,JSON.stringify(arr));
    },
    //取数据
    getData(key)
    {
        return JSON.parse(localStorage.getItem(key))||[]
    }
    // 删除数据和上面一样
}

export default storage