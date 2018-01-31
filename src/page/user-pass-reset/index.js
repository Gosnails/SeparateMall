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
    data: {
        username: '',
        question: '',
        answer: '',
        toden: '',
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad: function() {
        this.loadStepUsername();
    },
    bindEvent: function () {
        var _this = this;
        //点击输入用户名
        $('#submit-username').click(function () {
            var username = $.trim($('#username').val());
            if(username) {
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }else{ // 用户名不存在
                formError.show('请输入用户名');
            }
        });
        // 点击提交问题密码
        $('#submit-question').click(function () {
            var answer = $.trim($('#answer').val());
            if(answer) {
                _user.checkAnswer({
                    username: _this.data.username,
                    question: _this.data.question,
                    answer: answer
                }, function(res){
                    _this.data.answer = answer;
                    _this.data.toden = res;
                    _this.loadStepPassword();
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }else{ // 用户名不存在
                formError.show('请输入密码提示问题的答案');
            }
        });
         // 点击输入问题答案
         $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if(password && password.length>6) {
                _user.resetPassword({
                    username: _this.data.username,
                    passwordNew: password,
                    forgetToken: _this.data.toden
                }, function(res){
                    window.location.href = './result.html?type=pass-reset';
                }, function(errMsg) {
                    formError.show(errMsg);
                });
            }else{ // 用户名不存在
                formError.show('请输入不少于6位的新密码');
            }
        });
    },
    // 这是加载输入用户名的一步
    loadStepUsername: function() {
        $('.step-username').show();
    },
    // 这是加载输入密码提示答案
    loadStepQuestion: function() {
        formError.hide();
        $('.step-username').hide().siblings('.step-question').show()
        .find('.question').text(this.data.question);
    },
    // 这是加载输入用户名的一步
    loadStepPassword: function() {
        formError.hide();
        $('.step-question').hide().siblings('.step-password').show();
    }
};
$(function () {
    page.init();
});
