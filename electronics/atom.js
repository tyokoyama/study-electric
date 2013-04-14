var timer;
var ctx;
var canvas;
var point = {x:0, y:0, theta:0};

var timer_multi;
var ctx_multi;
var canvas_multi;
var points = [];

function MainCtrl($scope) {
	canvas = document.getElementById('atom_canvas');

	if(!canvas || !canvas.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	canvas.width = 200;
	canvas.height = 200;

	ctx = canvas.getContext('2d');

	animation();
}

function MultiCtrl($scope) {
	canvas_multi = document.getElementById('multi_atom_canvas');

	if(!canvas_multi || !canvas_multi.getContext) {
		// 未対応のブラウザ
		$scope.nocanvas = "このブラウザでは表示できません。"
		return;
	}

	canvas_multi.width = 200;
	canvas_multi.height = 200;

	ctx_multi = canvas_multi.getContext('2d');

	// 初期値は価電子4個
	points.push({x: 0, y: 0, theta: 0});
	points.push({x: 0, y: 0, theta: 90});
	points.push({x: 0, y: 0, theta: 180});
	points.push({x: 0, y: 0, theta: 270});

	// 選択値も指定
	$scope.electron = 4;

	// 価電子の数の変更時は配列初期化して、作り直し。
	$scope.change = function() {
		angle = 360 / $scope.electron;
		points = [];
		theta_local = 0;
		for(var i = 0; i < $scope.electron; i++) {
			points.push({x: 0, y: 0, theta: theta_local});
			theta_local += angle;	
		}
	};

	multiAnimation();
}

function animation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.beginPath();
	ctx.fillStyle = "#ffff00";
	ctx.arc(canvas.width / 2, canvas.height / 2, 20, Math.PI * 2, false);
	ctx.fill();
	ctx.closePath();
	ctx.stroke();	

	ctx.beginPath();

	point.theta++;
	if(point.theta >= 360) point.theta = 0;

	point.x = 50 * Math.cos(point.theta * Math.PI/180) + (canvas.width / 2);
	point.y = 50 * Math.sin(point.theta * Math.PI/180) + (canvas.height / 2);

	ctx.fillStyle = "#0000ff";
	ctx.arc(point.x, point.y, 5, Math.PI * 2, false);
	ctx.fill();

	ctx.closePath();
	ctx.stroke();	

	clearTimeout(timer);
	timer = setTimeout(animation, 10);
}

function multiAnimation() {
	ctx_multi.clearRect(0, 0, canvas_multi.width, canvas_multi.height);

	ctx_multi.beginPath();
	ctx_multi.fillStyle = "#ffff00";
	ctx_multi.arc(canvas_multi.width / 2, canvas_multi.height / 2, 20, Math.PI * 2, false);
	ctx_multi.fill();
	ctx_multi.closePath();
	ctx_multi.stroke();	

	for(var i = 0; i < points.length; i++) {
		ctx_multi.beginPath();

		points[i].theta++;
		if(points[i].theta >= 360) points[i].theta = 0;

		points[i].x = 50 * Math.cos(points[i].theta * Math.PI/180) + (canvas.width / 2);
		points[i].y = 50 * Math.sin(points[i].theta * Math.PI/180) + (canvas.height / 2);

		ctx_multi.fillStyle = "#0000ff";
		ctx_multi.arc(points[i].x, points[i].y, 5, Math.PI * 2, false);
		ctx_multi.fill();

		ctx_multi.closePath();
		ctx_multi.stroke();
	}

	clearTimeout(timer_multi);
	timer_multi = setTimeout(multiAnimation, 10);
}