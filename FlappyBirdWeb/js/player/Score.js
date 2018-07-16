//计分器类
import {DataStore} from "../base/DataStore.js";

export class Score {
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        // 定义一个变量控制加分，只加一次(canvas刷新频率很快)
        this.isScore = true;

    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#ffcabc';
        this.ctx.fillText(this.scoreNumber, window.innerWidth / 2, window.innerHeight / 18, 1000);

    }
}