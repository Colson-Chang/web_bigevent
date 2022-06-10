/*
 * @Description: 
 * @Author: Ronda
 * @Date: 2022-06-08 21:30:52
 * @LastEditors: Ronda
 * @LastEditTime: 2022-06-08 23:08:00
 */
$(function () {
    function getCommentList() {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/cmtlist',
            data: {},
            success: function (res) {
                // console.log(res)
                if (res.status !== 200) {
                    return alert('请求失败')
                }
                // console.log('请求成功')
                let arr = []
                $.each(res.data, function (i, item) {
                    let str = `
                    <li class="list-group-item">
            <span class="badge" style="background-color: pink;">${item.time}</span>
            <span class="badge" style="background-color: skyblue;">${item.username}</span>
            ${item.content}
        </li>
                    `
                    arr.push(str)
                })
                //把每一行的数据用空字符串拼接
                $('#cmd-list').empty().append(arr.join(''))
            }
        })
    }
    getCommentList()

    $('.panel-body').submit(function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        // console.log(data)
        $.post('http://www.liulongbin.top:3006/api/addcmt', data,
            function (res) {
                if (res.status !== 201) {
                    return alert('发表评论失败')
                }
                getCommentList()
                // 法一
                $('#data-username').val('')
                $('#data-content').val('')
                // 法二
                $('.panel-body')[0].reset()
            })
    })

    // 自调用函数
})
