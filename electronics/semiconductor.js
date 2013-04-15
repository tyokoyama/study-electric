var canvas_intrinsic;
var canvas_nimpurity;
var canvas_pimpurity;

var timer_intrinsic;
var timer_nimpurity;
var timer_pimpurity;

var ctx_intrinsic;
var ctx_nimpurity;
var ctx_pimpurity;

var power_on = false;
// ランダムで動く点の座標
var random_x = 0;
var random_y = 0;
var direction_count = 0;
var direction_index = 0;
var direction_table = [{x: -1, y: -1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: 1, y: 1}];

var n_random_x = 0;
var n_random_y = 0;
var n_direction_count = 0;
var n_direction_index = 0;
var n_power_on = false;

function intrinsicCtrl($scope) {
	// 真性半導体
	canvas_intrinsic = document.getElementById('canvas_intrinsic');

	if(!canvas_intrinsic || !canvas_intrinsic.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	$scope.power_on = false;
	random_x = 65;
	random_y = 75;
	$scope.int_power_status = "負荷をかける";
	$scope.power_int_click = function() {
		$scope.power_on = !$scope.power_on;
		if($scope.power_on) {
			$scope.int_power_status = "負荷がかかっています";
			random_x = 65;
			random_y = 75;
		} else {
			$scope.int_power_status = "負荷をかける";
		}
		power_on = !power_on;
	};

	canvas_intrinsic.width = 250;
	canvas_intrinsic.height = 250;

	ctx_intrinsic = canvas_intrinsic.getContext('2d');

	intrinsicAnimation();
}

function nImpurityCtrl($scope) {
	// n形半導体
	canvas_nimpurity = document.getElementById('canvas_n_impurity');
	canvas_nimpurity.width = 250;
	canvas_nimpurity.height = 250;

	if(!canvas_nimpurity || !canvas_nimpurity.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	$scope.n_power_status = "負荷をかける";
	$scope.power_n_click = function() {
		$scope.power_on = !$scope.power_on;
		if($scope.power_on) {
			$scope.n_power_status = "負荷がかかっています";
			n_random_x = 90;
			n_random_y = 150;
		} else {
			$scope.n_power_status = "負荷をかける";
		}
		n_power_on = !n_power_on;
	};

	ctx_nimpurity = canvas_nimpurity.getContext('2d');

	nimpurityAnimation();
}

function pImpurityCtrl($scope) {
	// p形半導体
	canvas_pimpurity = document.getElementById('canvas_p_impurity');
	canvas_pimpurity.width = 250;
	canvas_pimpurity.height = 250;

	if(!canvas_pimpurity || !canvas_pimpurity.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	ctx_pimpurity = canvas_pimpurity.getContext('2d');

	pimpurityAnimation();
}

function intrinsicAnimation() {
	ctx_intrinsic.clearRect(0, 0, canvas_intrinsic.width, canvas_intrinsic.height);

	// 原子の枠を描画
	ctx_intrinsic.beginPath();

	// 左側横線
	ctx_intrinsic.moveTo(15, 35);
	ctx_intrinsic.lineTo(30, 35);
	ctx_intrinsic.moveTo(15, 55);
	ctx_intrinsic.lineTo(30, 55);
	ctx_intrinsic.moveTo(15, 95);
	ctx_intrinsic.lineTo(30, 95);
	ctx_intrinsic.moveTo(15, 115);
	ctx_intrinsic.lineTo(30, 115);

	drawArc(ctx_intrinsic, 15, 35);
	drawArc(ctx_intrinsic, 15, 55);
	drawArc(ctx_intrinsic, 15, 95);
	drawArc(ctx_intrinsic, 15, 115);

	var x = 30;
	for(var i = 0; i < 3; i++, x+=60) {
		ctx_intrinsic.rect(x, 30, 30, 30);
		ctx_intrinsic.strokeText("Si", x + 10, 50);

		// 上側縦線
		ctx_intrinsic.moveTo(x + 5, 15);
		ctx_intrinsic.lineTo(x + 5, 30);
		ctx_intrinsic.moveTo(x + 25, 15);
		ctx_intrinsic.lineTo(x + 25, 30);

		drawArc(ctx_intrinsic, x + 5, 15);
		drawArc(ctx_intrinsic, x + 25, 15);

		// 上側横線（一番右は短め）
		var xx = x + 60;
		if(i >= 2) {
			xx = x + 45;
		}
		ctx_intrinsic.moveTo(x + 30, 35);
		ctx_intrinsic.lineTo(xx, 35);
		ctx_intrinsic.moveTo(x + 30, 55);
		ctx_intrinsic.lineTo(xx, 55);

		drawArc(ctx_intrinsic, x + 45, 35);
		drawArc(ctx_intrinsic, x + 45, 55);

		// 中央縦線
		ctx_intrinsic.moveTo(x + 5, 60);
		ctx_intrinsic.lineTo(x + 5, 90);
		ctx_intrinsic.moveTo(x + 25, 60);
		ctx_intrinsic.lineTo(x + 25, 90);

		if(i == 1) {
			if(power_on) {
				// 電子と正孔に別れる。
				drawArc(ctx_intrinsic, x + 5, 75, "#ffffff");

				direction_count++;
				if(direction_count > 5) {
					direction_index++;

					if(direction_index >= direction_table.length) {
						direction_index = 0;
					}

					direction_count = 0;
				}

				random_x += (direction_table[direction_index].x * Math.floor( Math.random() * 10));
				if(random_x > canvas_intrinsic.width) random_x = canvas_intrinsic.width;
				if(random_x < 0) random_x = 0;

				random_y += (direction_table[direction_index].y * Math.floor( Math.random() * 10));
				if(random_y > canvas_intrinsic.height) random_y = canvas_intrinsic.height;
				if(random_y < 0) random_y = 0;

				drawArc(ctx_intrinsic, random_x, random_y);
			} else {
				drawArc(ctx_intrinsic, x + 5, 75);
			}
		} else {
			drawArc(ctx_intrinsic, x + 5, 75);
		}
		drawArc(ctx_intrinsic, x + 25, 75);

		// 下側横線（一番右は短め）
		ctx_intrinsic.moveTo(x + 30, 95);
		ctx_intrinsic.lineTo(xx, 95);
		ctx_intrinsic.moveTo(x + 30, 115);
		ctx_intrinsic.lineTo(xx, 115);

		drawArc(ctx_intrinsic, x + 45, 95);
		drawArc(ctx_intrinsic, x + 45, 115);

		// 下側縦線
		ctx_intrinsic.moveTo(x + 5, 120);
		ctx_intrinsic.lineTo(x + 5, 135);
		ctx_intrinsic.moveTo(x + 25, 120);
		ctx_intrinsic.lineTo(x + 25, 135);

		drawArc(ctx_intrinsic, x + 5, 135);
		drawArc(ctx_intrinsic, x + 25, 135);

		ctx_intrinsic.rect(x, 90, 30, 30);
		ctx_intrinsic.strokeText("Si", x + 10, 110);
	}

	ctx_intrinsic.closePath();
	ctx_intrinsic.stroke();

	clearTimeout(timer_intrinsic);
	timer_intrinsic = setTimeout(intrinsicAnimation, 10);
}

function nimpurityAnimation() {
	ctx_nimpurity.clearRect(0, 0, canvas_nimpurity.width, canvas_nimpurity.height);

	// 原子の枠を描画
	ctx_nimpurity.beginPath();

	// 左側横線
	ctx_nimpurity.moveTo(15, 35);
	ctx_nimpurity.lineTo(30, 35);
	ctx_nimpurity.moveTo(15, 55);
	ctx_nimpurity.lineTo(30, 55);
	ctx_nimpurity.moveTo(15, 95);
	ctx_nimpurity.lineTo(30, 95);
	ctx_nimpurity.moveTo(15, 115);
	ctx_nimpurity.lineTo(30, 115);

	drawArc(ctx_nimpurity, 15, 35);
	drawArc(ctx_nimpurity, 15, 55);
	drawArc(ctx_nimpurity, 15, 95);
	drawArc(ctx_nimpurity, 15, 115);

	var x = 30;
	for(var i = 0; i < 3; i++, x+=60) {
		ctx_nimpurity.rect(x, 30, 30, 30);
		ctx_nimpurity.strokeText("Si", x + 10, 50);

		// 上側縦線
		ctx_nimpurity.moveTo(x + 5, 15);
		ctx_nimpurity.lineTo(x + 5, 30);
		ctx_nimpurity.moveTo(x + 25, 15);
		ctx_nimpurity.lineTo(x + 25, 30);

		drawArc(ctx_nimpurity, x + 5, 15);
		drawArc(ctx_nimpurity, x + 25, 15);

		// 上側横線（一番右は短め）
		var xx = x + 60;
		if(i >= 2) {
			xx = x + 45;
		}
		ctx_nimpurity.moveTo(x + 30, 35);
		ctx_nimpurity.lineTo(xx, 35);
		ctx_nimpurity.moveTo(x + 30, 55);
		ctx_nimpurity.lineTo(xx, 55);

		drawArc(ctx_nimpurity, x + 45, 35);
		drawArc(ctx_nimpurity, x + 45, 55);

		// 中央縦線
		ctx_nimpurity.moveTo(x + 5, 60);
		ctx_nimpurity.lineTo(x + 5, 90);
		ctx_nimpurity.moveTo(x + 25, 60);
		ctx_nimpurity.lineTo(x + 25, 90);

		drawArc(ctx_nimpurity, x + 5, 75);
		drawArc(ctx_nimpurity, x + 25, 75);

		// 下側横線
		ctx_nimpurity.moveTo(x + 30, 95);
		ctx_nimpurity.lineTo(xx, 95);
		ctx_nimpurity.moveTo(x + 30, 115);
		ctx_nimpurity.lineTo(xx, 115);

		drawArc(ctx_nimpurity, x + 45, 95);
		drawArc(ctx_nimpurity, x + 45, 115);

		// 下側縦線
		ctx_nimpurity.moveTo(x + 5, 120);
		ctx_nimpurity.lineTo(x + 5, 135);
		ctx_nimpurity.moveTo(x + 25, 120);
		ctx_nimpurity.lineTo(x + 25, 135);

		drawArc(ctx_nimpurity, x + 5, 135);
		drawArc(ctx_nimpurity, x + 25, 135);

		ctx_nimpurity.rect(x, 90, 30, 30);
		var elem_name = "Si";
		if(i == 1 && x == 90) {
			elem_name = "As";
			ctx_nimpurity.moveTo(x + 30, 120);
			ctx_nimpurity.lineTo(x + 60, 150);

			if(n_power_on) {
				// 電子が自由に動く
				n_direction_count++;
				if(n_direction_count > 5) {
					n_direction_index++;

					if(n_direction_index >= direction_table.length) {
						n_direction_index = 0;
					}

					n_direction_count = 0;
				}

				n_random_x += (direction_table[n_direction_index].x * Math.floor( Math.random() * 10));
				if(n_random_x > canvas_nimpurity.width) n_random_x = canvas_nimpurity.width;
				if(n_random_x < 0) n_random_x = 0;

				n_random_y += (direction_table[n_direction_index].y * Math.floor( Math.random() * 10));
				if(n_random_y > canvas_nimpurity.height) n_random_y = canvas_nimpurity.height;
				if(n_random_y < 0) n_random_y = 0;

				drawArc(ctx_nimpurity, n_random_x, n_random_y);
			} else {
				drawArc(ctx_nimpurity, x + 60, 150);
			}
		}
		ctx_nimpurity.strokeText(elem_name, x + 10, 110);
	}

	ctx_nimpurity.closePath();
	ctx_nimpurity.stroke();

	clearTimeout(timer_nimpurity);
	timer_nimpurity = setTimeout(nimpurityAnimation, 10);
}

function pimpurityAnimation() {
	ctx_pimpurity.clearRect(0, 0, canvas_pimpurity.width, canvas_pimpurity.height);

	// 原子の枠を描画
	ctx_pimpurity.beginPath();

	// 左側横線
	ctx_pimpurity.moveTo(15, 35);
	ctx_pimpurity.lineTo(30, 35);
	ctx_pimpurity.moveTo(15, 55);
	ctx_pimpurity.lineTo(30, 55);
	ctx_pimpurity.moveTo(15, 95);
	ctx_pimpurity.lineTo(30, 95);
	ctx_pimpurity.moveTo(15, 115);
	ctx_pimpurity.lineTo(30, 115);

	drawArc(ctx_pimpurity, 15, 35);
	drawArc(ctx_pimpurity, 15, 55);
	drawArc(ctx_pimpurity, 15, 95);
	drawArc(ctx_pimpurity, 15, 115);

	var x = 30;
	for(var i = 0; i < 3; i++, x+=60) {
		ctx_pimpurity.rect(x, 30, 30, 30);
		ctx_pimpurity.strokeText("Si", x + 10, 50);

		// 上側縦線
		ctx_pimpurity.moveTo(x + 5, 15);
		ctx_pimpurity.lineTo(x + 5, 30);
		ctx_pimpurity.moveTo(x + 25, 15);
		ctx_pimpurity.lineTo(x + 25, 30);

		drawArc(ctx_pimpurity, x + 5, 15);
		drawArc(ctx_pimpurity, x + 25, 15);

		// 上側横線（一番右は短め）
		var xx = x + 60;
		if(i >= 2) {
			xx = x + 45;
		}
		ctx_pimpurity.moveTo(x + 30, 35);
		ctx_pimpurity.lineTo(xx, 35);
		ctx_pimpurity.moveTo(x + 30, 55);
		ctx_pimpurity.lineTo(xx, 55);

		drawArc(ctx_pimpurity, x + 45, 35);
		drawArc(ctx_pimpurity, x + 45, 55);

		// 中央縦線
		ctx_pimpurity.moveTo(x + 5, 60);
		ctx_pimpurity.lineTo(x + 5, 90);
		ctx_pimpurity.moveTo(x + 25, 60);
		ctx_pimpurity.lineTo(x + 25, 90);

		drawArc(ctx_pimpurity, x + 5, 75);
		drawArc(ctx_pimpurity, x + 25, 75);

		// 下側横線（一番右は短め）
		ctx_pimpurity.moveTo(x + 30, 95);
		ctx_pimpurity.lineTo(xx, 95);
		ctx_pimpurity.moveTo(x + 30, 115);
		ctx_pimpurity.lineTo(xx, 115);

		if(i == 1) {
			drawArc(ctx_pimpurity, x + 45, 95, "#ffffff");
		} else {
			drawArc(ctx_pimpurity, x + 45, 95);
		}
		drawArc(ctx_pimpurity, x + 45, 115);

		// 下側縦線
		ctx_pimpurity.moveTo(x + 5, 120);
		ctx_pimpurity.lineTo(x + 5, 135);
		ctx_pimpurity.moveTo(x + 25, 120);
		ctx_pimpurity.lineTo(x + 25, 135);

		drawArc(ctx_pimpurity, x + 5, 135);
		drawArc(ctx_pimpurity, x + 25, 135);

		ctx_pimpurity.rect(x, 90, 30, 30);
		var elem_name = "Si";
		if(i == 1 && x == 90) {
			elem_name = "In";
		}
		ctx_pimpurity.strokeText(elem_name, x + 10, 110);
	}

	ctx_pimpurity.closePath();
	ctx_pimpurity.stroke();

	clearTimeout(timer_pimpurity);
	timer_pimpurity = setTimeout(pimpurityAnimation, 10);
}

function drawArc(ctx, x, y, opt_color) {
	var color = (opt_color === undefined) ? "#0000ff" : opt_color;
	ctx.closePath();
	ctx.stroke();

	var style = ctx.fillStyle;

	ctx.beginPath();
	ctx.fillStyle = color;
	ctx.arc(x, y, 5, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();

	ctx.fillStyle = style;
}