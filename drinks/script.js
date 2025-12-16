document.addEventListener('DOMContentLoaded', function () {

    // DOM 引用
    var drink_box_s = document.getElementById('drinks-box-s');
    var icon_donate = document.querySelectorAll('.icon-donate');
    var donate_button = document.querySelectorAll('.donate-button');
    var donate_buttons = document.getElementById('drinks-button-box');
    var donate_button_bg = document.getElementById('drinks-button-bg');
    var drinks_qrcodes = document.getElementById('drinks-qrcodes');
    var drinks_qrcode = document.getElementById('drinks-qrcode');
    var isMobile = /Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent);

    var GithubLink  =   "https://github.com/Kaiyuan/donate-page/";
    var PayPalLink  =   "https://www.paypal.me/KaiyuanXie";

    var paypalAnchor = document.querySelector('#paypal_donate > a');
    if (paypalAnchor) {
        paypalAnchor.href = PayPalLink;
    }
    var githubAnchor = document.querySelector('#github-box > a');
    if (githubAnchor) {
        githubAnchor.href = GithubLink;
    }

    var qrcodes = {
        'btc_donate'	        :   '../simple/images/BTCQR.png',	    // 二维码路径
        'alipay_donate'	    :   '../simple/images/AliPayQR.png',	// 支付宝二维码
        'alipay_donate_link' :   'https://qr.alipay.com/3272611934645308',   // 支付宝二维码上的链接
        'wechat_donate'	    :   '../simple/images/WeChanSQ.png'
    };

    var drinks_an = {};
    // 动画有 4 种状态，不同状态给对应 DOM 添加 css 动画
    drinks_an[0] = function(){
        if (!drink_box_s || !donate_buttons) return;
        drink_box_s.classList.remove('donate-animation-2', 'donate-animation-3');
        drink_box_s.classList.add('donate-animation-1');
        donate_buttons.classList.add('showBox');
        setTimeout(() => {
            donate_buttons.classList.remove('showBox');
        }, 300);
    };

    drinks_an[1] = function(){
        if (!drink_box_s) return;
        drink_box_s.classList.remove('donate-animation-1', 'donate-animation-3');
        drink_box_s.classList.add('donate-animation-2');
        setTimeout(() => {
            drink_box_s.classList.remove('donate-animation-2');
        }, 300);
    };

    drinks_an[2] = function(){
        if (!drink_box_s || !drinks_qrcodes) return;
        drink_box_s.classList.remove('donate-animation-2', 'donate-animation-1');
        drink_box_s.classList.add('donate-animation-3');
        drinks_qrcodes.classList.add('showBox');
        setTimeout(() => {
            drinks_qrcodes.classList.remove('showBox');
        }, 300);
    };

    drinks_an[3] = function(){
        if (!drink_box_s) return;
        drink_box_s.classList.remove('donate-animation-3', 'donate-animation-2');
        drink_box_s.classList.add('donate-animation-4');
        setTimeout(() => {
            drink_box_s.classList.remove('donate-animation-4');
            drink_box_s.classList.add('donate-animation-1');
        }, 300);
    };

    if (isMobile && donate_buttons) {
        donate_buttons.classList.add('Mobile');
    }

    // 事件绑定
    icon_donate.forEach(function (el) {
        el.addEventListener('click', drinks_an[0]); // drinks 图标点击
    });

    if (donate_button_bg) {
        donate_button_bg.addEventListener('click', drinks_an[1]); // 隐藏 donate box
    }

    donate_button.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var thisID = btn.id;
            if (!thisID) return;

            if (isMobile && thisID === 'alipay_donate') {
                // 当前网页在手机端打开跳转到支付宝 App
                window.open(qrcodes['alipay_donate_link']);
            } else {
                // 当前网页在 PC 端打开，显示二维码
                if (drinks_qrcode && qrcodes[thisID]) {
                    drinks_qrcode.style.backgroundImage = 'url(' + qrcodes[thisID] + ')';
                }
                drinks_an[2]();
            }
        });
    });

    if (drinks_qrcode) {
        drinks_qrcode.addEventListener('click', drinks_an[3]); // 隐藏二维码
    }
});