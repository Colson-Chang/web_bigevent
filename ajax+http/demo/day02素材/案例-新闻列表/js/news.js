/*
 * @Description: 
 * @Author: Ronda
 * @Date: 2022-06-09 08:50:29
 * @LastEditors: Ronda
 * @LastEditTime: 2022-06-09 10:29:25
 */
$(function () {

    // 定义时间过滤器
    template.defaults.imports.filtername = function (dtStr) {
        let dt = new Date(dtStr)
        let y = dt.getFullYear()
        let m = dt.getMonth() + 1
        let d = dt.getDate()
        let hh = dt.getHours()
        let mm = dt.getMinutes()
        let ss = dt.getSeconds()
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function getNewsList() {
        $.get(
            'http://www.liulongbin.top:3006/api/news',
            function (res) {
                if (res.status !== 200) {
                    return alert('获取失败')
                }
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(',')
                }
                var htmlStr = template('tpl-news', res)
                $('#news-list').html(htmlStr)
            }
        )
    }

    getNewsList()
})