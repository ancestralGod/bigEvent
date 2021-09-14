$(function() {
    $('#link_reg').on('click', () => {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', () => {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须是6到12位且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) return '两次密码不一致'
        }
    })
    $('#form_reg').on('submit', (e) => {
        e.preventDefault()
        var data = {
            username: $('#form-reg [name=username]').val(),
            password: $('#form-reg [name=password]').val()
        };
        $.post('api/reguser', data, (res) => {
            if (res.status !== 0) {
                return layer.msg(res.messge)
            }
        })
        layer.msg('注册成功！');
        $('#link_login').click()
    })
    $('#form.login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: 'api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})