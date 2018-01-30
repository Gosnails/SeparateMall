'use strict';

require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');

//表单里的错误提示
var formError = {
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};
var page = {
    init: function () {
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        });
        $('.user-content').keyup(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    submit: function () {
        var formData = {
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        var validateResult = this.formValidate(formData);
        //验证成功
        if (validateResult.status) {
            _user.login(formData, function(res){
                alert(_mm.getUrlParam('redirect'));
                window.location.href = _mm.getUrlParam('') || './index.html';
            }, function(errMsg){
                formError.show(errMsg);
            });
        } else { // 验证失败
            formError.show(validateResult.msg);
        }
    },
    //表单字段验证
    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        };
        if (!_mm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_mm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
};
$(function () {
    page.init();
});
