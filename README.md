##项目描述
>一次微信小游戏的学习与开发，学习js面向对象开发,ES6+微信小游戏API

##项目总结
>学习以面向对象的方式来开发一个小游戏的过程。理解开发一个游戏需要从哪些方面开始。

##项目收获总结
>一个游戏中主要分为这几部分、资源、精灵、导演、变量缓存器、

资源：游戏中的图片资源(要保证图片加载完成后之后再绘制canvas)
精灵：精灵的基类,负责初始化精灵的资源和大小以及位置
导演：导演类，控制游戏的逻辑
变量缓存器：变量缓存器，方便在不同的类中访问和修改变量

##需要注意的地方
####requestAnimationFrame和setInterval的区别
>requestAnimationFrame是由浏览器的刷新频率决定，即在下一帧开始之间执行回调函数,requestAnimationFrame要比setInterval的性能好很多。
####canvas渲染要考虑先后顺序问题
####类的单例模式
```Javascript
class Director {
    //单例模式
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
}
```

##游戏思路
- 图片资源的初始化与加载,采用数组来存储image路径,采用map数据结构存储image对象
- 创建精灵类、初始化精灵的位置大小
- 为游戏中所有的角色创建类(背景、陆地、小鸟等等)继承精灵类
- 创建变量缓存器类,map数据结构，添加添加变量方法、获取变量方法、销毁变量的方法
- 创建导演类，控制游戏的逻辑
- main类，游戏的入口、初始化图片、变量缓存器、绘画cavas，游戏动作、