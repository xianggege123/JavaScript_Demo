function getStyle(obj,name){//因为offset存在bug，所以用这个函数来获取非行间样式
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
	}
	function startMove(obj,attr,iTarget,fnEnd){//传3个参数
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var cur = 0;
			if(attr == 'opacity'){//因为透明度属性跟其他属性的值类型不太一样，所以要分开来写
				cur=Math.round(parseFloat(getStyle(obj,attr))*100);//Math.round();四舍五入
			}
			else{
				cur = parseInt(getStyle(obj,attr));
			}
			var speed = (iTarget-cur)/6;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			if(iTarget == cur){
				clearInterval(obj.timer);
				if(fnEnd)fnEnd();//判断有没有传函数过来
			}
			else{
				if(attr=='opacity'){//因为透明度属性跟其他属性的值类型不太一样，所以要分开来写
					obj.style.filter = 'alpha(opacity:'+(cur+speed)+')';
					obj.style.opacity = (cur+speed)/100;
				}
				else{
					obj.style[attr] = cur+speed+'px';
				}
			}
		},30)
	}