//初始化整个游戏的精灵,作为游戏的入口
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        //获取canvas
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        //初始化我的变量缓存器
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        //创建资源加载器类，开始加载图片
        const loader = ResourceLoader.create();
        //执行资源加载完毕类
        loader.onLoaded(map => this.onReasourceFirstLoaded(map));
    }

    //资源第一次加载
    onReasourceFirstLoaded(map) {
        //canvas的ctx和存储图片资源的map变量绘制结束是不变的
        //ctx和map是不变的变量
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        //执行初始化的方法
        this.init();
    }

    //初始化背景图片
    init() {
        //首先重置游戏时没有结束的
        this.director.isGameOver = false;
        //向我的变量缓存器里面存储背景图片
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('score',Score)
            .put('startButton',StartButton);
        this.registerEvent();
        //要在游戏逻辑运行之前
        this.director.createPencil();
        this.director.run();

    }


    // 监听事件
    registerEvent() {
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽事件冒泡
            e.preventDefault();
            //判断一下游戏是否结束
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init()
            }else{
                this.director.birdsEvent();
            }
        })
    }
}