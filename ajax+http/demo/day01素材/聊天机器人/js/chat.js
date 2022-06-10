/*
 * @Description: 
 * @Author: Ronda
 * @Date: 2022-06-08 16:45:49
 * @LastEditors: Ronda
 * @LastEditTime: 2022-06-08 18:15:21
 */
$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()
    // 为发送按钮绑定发送事件
    $('#btnSend').click(function () {
        let text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        // 将聊天内容追加到页面显示
        $('#talk_list').append(`
        <li class="right_word">
          <img src="img/person02.png" /> <span>${text}</span>
        </li>
        `)
        $('#ipt').val('')
        resetui()
        getMsg(text)
    })
    // 获取聊天机器人发送的消息
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: {
                // 后台根据用户输入的消息响应一个消息
                spoken: text
            },
            success: function (res) {
                // console.log(res)
                if (res.message === 'success') {
                    let msg = res.data.info.text
                    $('#talk_list').append(`
                    <li class="left_word">
          <img src="img/person01.png" /> <span>${msg}</span>
        </li>
                    `)
                    resetui()
                    getVoice(msg)
                }

            }
        })
    }
    // 将机器人发送的消息转为语音
    function getVoice(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: {
                // 后台根据用户输入的消息响应一个消息
                text: text
            },
            success: function (res) {
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl)
                }
            }
        })
    }
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode)
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }
    })

})
