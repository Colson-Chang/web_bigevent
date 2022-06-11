/*
 * @Description: 
 * @Author: Ronda
 * @Date: 2022-06-11 08:31:33
 * @LastEditors: Ronda
 * @LastEditTime: 2022-06-11 08:38:07
 */
// 每次调用$.get/$.post/$.ajax时会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    // console.log(options.url)
    // 在发送真正的ajax请求之前统一拼接请求的路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url)
})
