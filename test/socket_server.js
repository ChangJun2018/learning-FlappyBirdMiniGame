(function () {

    const webSocketServer = require('ws').Server;
    const ws = new webSocketServer({
        port:8282
    });

    ws.on('connection',function (ws) {
        console.log('客户端已经连接了');
        //接受到小游戏发送的数据所调用的方法
        ws.on('message',function (message) {
            console.log(message);
            wx.send('123');
        })
    })

})();