export class ApiExamples {
    //获取登录凭证code
    login(){
        wx.login({
            success: function(res) {
                console.log(res)
            }
        })
    }
    //获取用户信息
    getUserInfo(){
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '获取用户信息',
            style: {
                left: 10,
                top: 76,
                width: 200,
                height: 40,
                lineHeight: 40,
                backgroundColor: '#ff0000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
                borderRadius: 4
            }
        })
        button.onTap(function (res) {
            console.log(res)
        })
    }
    //创建一个socket连接
    socketExample(){
        wx.connectSocket({
            url:'ws://127.0.0.1:8282',
            success:function () {
                console.log("客户端连接成功")
            }
        });

        wx.onSocketOpen(function () {
            wx.sendSocketMessage({
                data:'这是来自客户端的实时消息'
            })
        })
    }

    download(){
        wx.downloadFile({
            url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531567965484&di=a0140db7e93a96543d04ea3dfff3a8da&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F6%2F4fcebe62e1d9a.jpg',
            success:function (temp) {
                console.log(JSON.stringify(temp))
            }
        })
    }

}