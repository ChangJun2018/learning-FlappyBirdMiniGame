//变量缓存器，方便在不同的类中访问和修改变量
export class DataStore {
    //单例模式
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    //生成一个存储变量的数据结构map
    constructor(){
        this.map = new Map();
    }
    //put方法用于添加变量
    put(key,value){
        //如果传入的是一个方法就将其实例化出来
        //类class 其实是function的语法糖
        if (typeof value === "function") {
            value = new value()
        }
        this.map.set(key,value);
        return this;
    }
    //get方法用于获取变量
    get(key){
        return this.map.get(key)
    }
    //变量的销毁
    destroy(){
        for (let value of this.map.values()){
            value = null
        }
    }

}