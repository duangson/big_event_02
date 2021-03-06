//入口函数
$(function () {
    //1.去点击注册账号，隐藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        //console.log(1);
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //2.点击去登录，显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //3.自定义验证规则
    var form = layui.form;
    //密码规则
    form.verify({
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须为6-16位，且不能输入空格'
        ],
        //确认密码规则
        repwd: function (value) {
            //选择器必须带空格，选择的是后代中的input，name属性值为password的那一个标签
            var pwd = $('.reg-box input[name=password]').val()
            //比较
            if (value !== pwd) {
                return '两次密码输入不一样！';
            }
        }
    });

    //4.注册功能
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        //阻止表单提交
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'POST',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                //console.log(res);
                if (res.status !== 0) {
                    return alert(res.message);
                }
                //提交成功后处理代码
                layer.msg('注册成功，请登录！');
                //手动切换到登录表单
                $('#link_login').click();
                //重置form表单
                $('#form_reg')[0].reset();
            }
        });
    })

    //登录功能(给form标签绑定事件，button按钮触发提交事件)
    $('#form_login').on('submit', function (e) {
        //阻止提交表单
        e.preventDefault();
        //发送ajax
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                //console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //提示信息，保存token，跳转页面
                layer.msg('恭喜您，登录成功!');
                //保存token，未来的接口要使用token
                localStorage.setItem('token', res.token);
                //跳转
                location.href = '/index.html';
            }
        })
    })

})