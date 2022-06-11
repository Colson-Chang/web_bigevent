/*
 * @Description: 
 * @Author: Ronda
 * @Date: 2022-06-10 17:06:42
 * @LastEditors: Ronda
 * @LastEditTime: 2022-06-11 09:32:21
 */
$(function () {
    // 点击去注册
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登陆
    $('#link_login').click(function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })


    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            // 自定义了一个pwd的校验规则
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验密码是否一致的规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听注册表单的事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('http://www.liulongbin.top:3007/api/reguser', data,
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message);
                }
                // console.log('注册成功')
                layer.msg("注册成功");
                // 模拟人的点击行为
                $('.link_login').click()
            })
    })
    // 监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // 将登陆成功的token值存入localstorage中
                localStorage.setItem('token', res.token)
                // console.log(res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
    // 入口函数
})
