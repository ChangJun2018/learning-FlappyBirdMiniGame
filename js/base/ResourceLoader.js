//资源文件加载器，确保canvas在图片资源加载完成之后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader {
    //图片资源初始化
    constructor() {
        this.map = new Map(Resources);
        for (let [key, value] of this.map) {
            const image = wx.createImage();
            image.src = value;
            //map数据的value变成image对象
            this.map.set(key, image);
        }
    }

    //加载完成
    onLoaded(callback) {
        // 定义一个变量与map的长度进行对比，从而判断图片资源是否都已加载完毕
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map)
                }
            }
        }

    }

    static create() {
        return new ResourceLoader();
    }

}