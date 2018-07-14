//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    //单例模式
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        //初始化我的变量缓存器
        this.dataStore = DataStore.getInstance();
        this.landSpeed = 2;
    }

    createPencil() {
        //最大高度
        const minTop = DataStore.getInstance().canvas.height / 8;
        //最小高度
        const maxTop = DataStore.getInstance().canvas.height / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            //小鸟的位置等于我们传入的位置
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        let s = false;
        //检测小鸟与铅笔碰撞逻辑
        if (bird.top > pencil.bottom || bird.bottom < pencil.top || bird.right < pencil.left || bird.left > pencil.right) {
            s = true;
        }
        return !s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地板啦');
            this.isGameOver = true;
            return;
        }
        //小鸟的边框模型
        const birdsBorder = {
            top: birds.y[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };
        // 铅笔的边框模型
        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            //进行碰撞检测
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('撞到水管啦！');
                this.isGameOver = true;
                return;
            }
        }
        // 小鸟加分
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width &&score.isScore) {
            wx.vibrateShort({
                success:function () {
                    console.log('震动')
                }
            });
            //关掉加分
            score.isScore=false;
            score.scoreNumber++;
        }

    }

    run() {
        this.check();
        if (!this.isGameOver) {
            //从变量缓存器里取出要绘制的背景图片并执行渲染
            //此处留心
            //canvas渲染是有顺序的所以在绘制时要考虑的图片渲染顺序和所呈现的效果的问题
            //在此处我们的铅笔要在地板之上，如若在绘制地板之后绘制,则会出现穿帮的镜头
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            //铅笔的宽度+铅笔左侧的x表示铅笔刚刚越过边界
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                //刚越过边界的时候,数组铅笔中的第一个shift出去
                pencils.shift();
                pencils.shift();
                //将停止加分的开关开启
                this.dataStore.get('score').isScore = true;
            }
            //如果第一支铅笔的X坐标小于等于 屏幕宽度*-第一支铅笔的宽度/2 并且只有一组铅笔的时候去执行绘画铅笔的方法
            if (pencils[0].x <= (DataStore.getInstance().canvas.width - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil()
            }

            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
            //requestAnimationFrame 在浏览器重绘之前执行回调函数
            //在此处其实就是利用了不断的重绘run这个方法。从而实现渲染运动
            //requestAnimationFrame和setInterval的区别
            //requestAnimationFrame是由浏览器的刷新频率决定，即在下一帧开始之间执行回调函数
            //requestAnimationFrame要比setInterval的性能好很多
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        } else {
            console.log('游戏结束');
            //绘制开始按钮
            this.dataStore.get('startButton').draw();
            //停止canvas不断刷新
            cancelAnimationFrame(this.dataStore.get('timer'));
            //对我们的变量缓存器进行清空
            this.dataStore.destroy();
            //触发微信小游戏垃圾回收
            wx.triggerGC();
        }
    }


}