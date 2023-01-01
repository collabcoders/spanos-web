$(function(){


const rS_area = $('#roundSlider');
const rS_items = $('#roundSlider ul li');
const rS_angleInterval = 360/rS_items.length;
const rS_width = 50;
const rS_depth = 150;
const rS_size = 3.5;
let rS_angle = 0;

const rS_setFunc = function(a){
	let lig_zoom = false;
	rS_items.each(function(n){
		const r = (Number(rS_angleInterval*n) + Number(a));
		const x = rS_width * Math.sin( r * (Math.PI / 180) ) * rS_size;
		const y = (rS_depth - rS_depth * Math.cos( r * (Math.PI / 180) )) * rS_size *-1;
		$(this).css({'transform': 'translate3d('+x+'%, 0px, '+y+'px) rotateY('+r+'deg)'});
		t = rS_items.length * 0.2;
		if((-8 + t) < y){
			$(this).addClass('zoom');
		}else{
			$(this).removeClass('zoom');
		}
		if((-5 + t) < y){
			lig_zoom = true;
		}
	});
	if(lig_zoom){
		$('#roundCircle div.light').addClass('zoom');
	}else{
		$('#roundCircle div.light').removeClass('zoom');
	}
}
rS_setFunc(rS_angle);


const rS_setFrontFunc = function(rS_angle){
	let f = Math.round(rS_angle / rS_angleInterval);
	rS_angle = f * rS_angleInterval;
	rS_setFunc(rS_angle);
}


const _ua = (function() {
	return {
		Touch: typeof document.ontouchstart != "undefined",
		Pointer: window.navigator.pointerEnabled,
		MSPoniter: window.navigator.msPointerEnabled
	}
})();
let _start = _ua.Pointer ? 'pointerdown' : _ua.MSPointer ? 'MSPointerDown' : _ua.Touch ? 'touchstart' : 'mousedown';
let _move = _ua.Pointer ? 'pointermove' : _ua.MSPointer ? 'MSPointerMove' : _ua.Touch ? 'touchmove' : 'mousemove';
let _end = _ua.Pointer ? 'pointerup' : _ua.MSPointer ? 'MSPointerUp' : _ua.Touch ? 'touchend' : 'mouseup';


rS_area.off(_start);
rS_area.on(_start, function(e){
	let sX, mX = 0, rX, pX = 0, dX;
	sX = (e.pageX ? e.pageX : event.changedTouches[0].pageX);
	rS_items.css({'transition': 'none'});
	//移動
	rS_area.on(_move, function(e){
		mX = (e.pageX ? e.pageX : event.changedTouches[0].pageX) - sX;
		rX = rS_angle + (mX / rS_size);
		rS_setFunc(rX);
		dX = mX - pX;
		pX = mX;
		$('#roundCircle div.light').removeClass('zoom');
	});
	//終了
	$(document).on(_end, function(e){
		rS_area.off(_move);
		rS_items.css({'transition': '0.3s'});
		rS_angle += (mX / rS_size);
		dX = Math.round(dX / 10);
		if(1 < Math.abs(dX)){
			v = (0 < dX) ? 1 : -1 ;
			dX = Math.abs(dX) +1;
			rS_items.css({'transition': 0.3/dX +'s', 'transition-timing-function': 'linear'});
			for(var d = 0; d <= dX; d++){
				setTimeout(function(){
					$('#roundCircle div.light').removeClass('zoom');
					rS_angle += rS_angleInterval * v;
					rS_setFrontFunc(rS_angle);
				}, 300/dX *d);
			}
		}else{
		rS_setFrontFunc(rS_angle);
		}
		$(document).off(_end);
	});
});


let iconEnter_timer;
$('#roundSlider_icon ul li').on('mouseenter', function(){
	clearTimeout(iconEnter_timer);
	const name = $(this).attr('name');
	if(!name) return false;
	iconEnter_timer = setTimeout(function(){
		const n = $('#roundSlider ul li').index($('#roundSlider ul li[name="'+name+'"]'));
		const r = Math.ceil(rS_angle / 360);
		rS_items.css({'transition': '0.1s', 'transition-timing-function': 'linear'});
		rS_items.addClass('nonzoom');
		rS_angle_dest = (r * 360) - (n * rS_angleInterval);
		rS_angle_diff = (rS_angle_dest - rS_angle) / 3;
		for(var x = 0; x < 3; x++){
			setTimeout(function(){
				rS_setFunc(rS_angle += rS_angle_diff);
			}, x*100);
		}
		setTimeout(function(){
			rS_items.removeClass('nonzoom');
		}, 200);
	}, 1000);
});
$('#roundSlider_icon ul li').on('mouseleave', function(){
	clearTimeout(iconEnter_timer);
});


let autoRound_timer = [];
const autoRoundFunc = function(){
	$('#roundCircle div.light').removeClass('zoom');
	rS_setFrontFunc(rS_angle -= rS_angleInterval);
	autoRound_timer.push(setTimeout(function(){
		autoRoundFunc();
	}, 3000));
}
/*
autoRound_timer.push(setTimeout(function(){
	autoRoundFunc();
}, 3000));
*/
$('#roundSlider, #roundSlider_icon ul').on('mouseenter', function(){
	for(art of autoRound_timer){
		clearTimeout(art);
	}
});
$('#roundSlider, #roundSlider_icon ul').on('mouseleave', function(){
	autoRound_timer.push(setTimeout(function(){
		autoRoundFunc();
	}, 3000));
});


$('#parts .tcg, #parts .atcg').on('mouseenter', function(){
	$('#roundSlider_icon ul li').addClass('noselect');
	if($(this).hasClass('tcg')){
		target = ['yrd', 'vg', 'ygo', 'zx', 'sev', 'wx', 'fe', 'bs', 'lo', 'pm', 'ws', 're', 'dm', 'poc', 'digi', 'chaos'];
	}else{
		target = ['gab', 'fgo', 'kan', 'dcd', 'ei', 'sanac'];
	}
	for(tar of target){
		$('#roundSlider_icon ul li[name="'+tar+'"]').removeClass('noselect');
	}
});
$('#parts .tcg, #parts .atcg').on('mouseleave', function(){
	$('#roundSlider_icon ul li').removeClass('noselect');
});






window.requestAnimFrame = (function () {
return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();
 
window.onload = function() {
    var canvas = document.querySelector('#bg_star');
    var ctx = canvas.getContext('2d');
 
    var center = {};    // Canvas中央
    var dots = [];      // パーティクル配列
    var density = 200;  //パーティクルの数
    var baseSpeed = 2; // スピード
 
    var Dot = function () {
        this.size = Math.floor( Math.random() * 3 ) + 1;
        this.color = '#009E46';
        this.alpha = Math.floor( Math.random() * 20 ) + 1;
        this.speed = baseSpeed / this.size;
        this.pos = {   // 位置
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        var angle = 270 * Math.PI / 180;
 
        this.vec = {    // 移動方向
            x: Math.cos(angle) * this.speed,
            y: Math.sin(angle) * this.speed
        };
    };
    Dot.prototype = {
        update: function() {
            this.draw();

            this.pos.x += this.vec.x;
            this.pos.y += this.vec.y;

            this.alpha += Math.floor( Math.random() * 21 ) - 10;
            this.alpha = Math.min(this.alpha, 40);
            this.alpha = Math.max(this.alpha, 0);

            // 画面外に出たら反対へ再配置
            if(this.pos.x > canvas.width + 10) {
                this.pos.x = -5;
            } else if(this.pos.x < 0 - 10) {
                this.pos.x = canvas.width + 5;
            } else if(this.pos.y > canvas.height + 10) {
                this.pos.y = -5;
            } else if(this.pos.y < 0 - 10) {
                this.pos.y = canvas.height + 5;
            }
        },
 
        draw: function() {
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.moveTo(this.pos.x, this.pos.y-4*this.size);
            ctx.lineTo(this.pos.x, this.pos.y+4*this.size);
            ctx.stroke();
            ctx.moveTo(this.pos.x-2*this.size, this.pos.y);
            ctx.lineTo(this.pos.x+2*this.size, this.pos.y);
            ctx.stroke();
            ctx.globalAlpha = this.alpha/100;
        }
    };
 
    function update() {
        requestAnimFrame(update);
        // 描画をクリアー
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
         for (var i = 0; i < density; i++) {
            dots[i].update();
        }
    }
 
    function init() {
        // canvasにコンテンツサイズをセット
        canvas.setAttribute("width", canvas.offsetWidth);
        canvas.setAttribute("height", canvas.offsetHeight);
 
        // canvas中央をセット
        center.x = canvas.width / 2;
        center.y = canvas.height / 2;
 
        // densityの数だけパーティクルを生成
        for (var i = 0; i < density; i++) {
            dots.push(new Dot());
        }
        update();
    }
    init();
}

});