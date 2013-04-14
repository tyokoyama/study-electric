var canvas;
var ctx;
var timer;
var remain;
var setting_time;

function mainCtrl($scope) {
	$scope.timer_add = function() {

	};

	$scope.timer_start = function() {
		animation();
	};

	$scope.timer_stop = function() {
		clearTimeout(timer);
	};

	canvas = document.getElementById('timer_canvas');

	if(!canvas || !canvas.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	canvas.width = 500;
	canvas.height = 500;

	ctx = canvas.getContext('2d');

	// 残り時間（秒）
	setting_time = 1 * 60 * 1000;
	remain = 1 * 60 * 1000;
}

function animation() {
	var bigWidth = (canvas.width / 2) - 50;
	var smallWidth = bigWidth - 120;

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.fillStyle = "#ff5555";
	ctx.arc(canvas.width / 2, canvas.height / 2, bigWidth, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();	

	var angle = 360 * (remain / setting_time);
	ctx.beginPath();
	// 円の中心に描画点を移動させておく必要がある。
	// 移動した点を中心に円を塗りつぶす仕様？
	ctx.moveTo(canvas.width / 2, canvas.height / 2);
	ctx.fillStyle = "#ffffff";
	var endangle = ((Math.PI / 180) * (angle - 90));
	ctx.arc(canvas.width / 2, canvas.height / 2, bigWidth, (Math.PI / 180) * 270,  endangle, true);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();	

	ctx.beginPath();
	ctx.fillStyle = "#ffffff";
	ctx.arc(canvas.width / 2, canvas.height / 2, smallWidth, 0, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();	

	// 残り時間のチェック
	remain -= 10;

	// 残り時間表示
	var minute = Math.floor(Math.round(remain / 1000) / 60);
	var second = Math.round(remain / 1000) % 60;

	ctx.beginPath();
	ctx.fillStyle = "#000000";
	ctx.font = "18px 'ＭＳ ゴシック'";
	ctx.strokeText("残り時間", (canvas.height / 2) - 30, (canvas.height / 2) - 50);
	var time_string = minute + ":" + ((second < 10) ? ("0" + second) : second);
	ctx.strokeText(time_string, (canvas.height / 2) - 30, (canvas.height / 2) - 10);
	ctx.closePath();
	ctx.stroke();	


	clearTimeout(timer);

	if(remain > 0) {
		timer = setTimeout(animation, 10);
	}
}