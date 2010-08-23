/*
    js1k Submission - Alex Michael.
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


    Copyright 2010 (c) Alex Michael.
*/


var c = document.getElementById("c");
c.width = c.height = 500;
var ctx = c.getContext('2d'),
	bs	= [],
	M	= Math,
	rnd = M.random,
	f	= M.floor,
	pw = M.pow,
	cs = M.cos,
	sn = M.sin,
	i,j,
	N	= 100,
	V	= 4,
	J	= 0,
	H	= 500;
	
var P = function(){
	var B = this;
	B.x	 = rn(500); 
	B.y	 = rn(500);
	B.r	 = rn(8);
	B.dx = rn(3,1);
	B.dy = rn(3,1);
	B.c	 = 'rgb(' + rn(255) + "," + rn(255) + "," + rn(255) + ")";
	B.dl = 0;
	
	B.d = function(b){
		var dx = b.x - B.x, dy = b.y - B.y;
		var a = M.atan(dx / dy);
		return M.sqrt(pw((B.x + B.r * cs(a)) - (b.x + b.r * cs(M.PI/2 - a)) , 2) 
					+ pw((B.y + B.r * sn(a)) - (b.y + b.r * sn(M.PI/2 - a)) , 2));
	};
	
	function rn(l,p){
		return ((p)? (rnd() > 0.5)? -1 : 1 : 1) * f(rnd() * l);
	}
	
	B.u = function(){
		for (var i = 0; i < N;i++){
			var b = bs[i];
			if (b && b !== B){
				var d = B.d(b);
				if ((d < B.r - b.r) && (B.r > b.r)){
					B.r += b.r / 4;
					b.dl = 1;
				}
				else if (d < 30 && B.r < b.r){
					B.dx *= -1.2;
					B.dy *= -1.2; 
				}
				else{
					B.dx += rn(4,1) / 10;
					B.dy += rn(4,1) / 10;
				}
			}
		};
		B.dx = (B.dx > V)? V : B.dx;
		B.dy = (B.dy > V)? V : B.dy;
		B.x += B.dx;
		B.y += B.dy;
		B.x = (B.x < 0)? B.x + H: B.x % H; 
		B.y = (B.y < 0)? B.y + H: B.y % H;
		ctx.fillStyle = B.c;
		ctx.beginPath();
		ctx.arc(B.x, B.y, B.r, 0, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	};
};

//reset()
function r(){
	ctx.fillStyle = 'rgba(34, 34, 34, 0.3)';
	ctx.fillRect(0,0,H,H);
}

//animate()
function a(){
	r();
	for (var i = 0; i < N;i++){
		var p = bs[i];
		if (p){
			if (p.dl == 1){
				bs[i] = null;
				J++;
			}
			else{
				p.u();
			}
		}
	}
	if (J < N - 1){
		setTimeout(a,35);
	}
}
r();
for (var i = 0; i < N;i++){
	bs.push(new P());
}
a();