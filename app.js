const log = console.log;
///////////////
// Variables //
///////////////

var money = {current:0,total:0},
	autoUp = {
		upgrade1:{
			a27:1.1,
			price:100,
			perInterval:2,
			multiplier:1.5,
			amount:0
		},
		upgrade2:{
			a27:1.1,
			price:500,
			perInterval:4,
			multiplier:1.5,
			amount:0
		}
	},
	clickUp = {
		upgrade1:{
			a27:1.1,
			price:50,
			multiplier:2,
			amount:0
		},
		upgrade2:{
			a27:1.1,
			price:500,
			multiplier:10,
			amount:0
		}
	},
	clickUp1 = clickUp.upgrade1,
	clickUp2 = clickUp.upgrade2,
	autoUp1 = autoUp.upgrade1,
	autoUp2 = autoUp.upgrade2,
	newUpPrice = function(who){Math.floor(who.price*=(who.a27)); who.a27*=1.05;};
	// DOM variables
var statsMoney = document.getElementById('money'),
	statsClick = document.getElementById('perClick'),
	statsAuto = document.getElementById('perSecond'),
	upgBtnClick1 = document.getElementById('clickUpgrade1'),
	upgBtnClick2 = document.getElementById('clickUpgrade2'),
	upgBtnAuto1 = document.getElementById('autoUpgrade1'),
	upgBtnAuto2 = document.getElementById('autoUpgrade2');

	// Auto upgrade
	window.setInterval((x=>{money.current+=autoRate;money.total+=autoRate;draw();}), 2500);

///////////////
// Functions //
///////////////

/* Primary */
function draw (){
	priceCheck();
	autoRate = Math.floor((autoUp1.amount*autoUp1.multiplier*autoUp1.perInterval)+(autoUp2.amount*autoUp2.multiplier*autoUp2.perInterval));
	clickRate = Math.floor((clickUp1.amount*clickUp1.multiplier)+(clickUp2.amount*clickUp2.multiplier));
	// Drawing Stats
	statsMoney.innerHTML = `${Math.floor(money.current)}`;
	statsAuto.innerHTML = `${Math.floor(autoRate)}`;
	statsClick.innerHTML = `${Math.floor(clickRate)}`;
}
function priceCheck (){
	// Click Upgrade 1
	if(money.current>=clickUp1.price){
		upgBtnClick1.disabled = false;
	}else{
		upgBtnClick1.disabled = true;
	}	
	// Click Upgrade 2
	if(money.current>=clickUp2.price){
		upgBtnClick2.disabled = false;
	}else{
		upgBtnClick2.disabled = true;
	}	
	// Auto Upgrade 1
	if(money.current>=autoUp1.price){
		upgBtnAuto1.disabled = false;
	}else{
		upgBtnAuto1.disabled = true;
	}	
	// Auto Upgrade 2
	if(money.current>=autoUp2.price){
		upgBtnAuto2.disabled = false;
	}else{
		upgBtnAuto2.disabled = true;
	}
}


/* Secondary */
function clickAction1(){
	money.current-=clickUp1.price;
	newUpPrice(clickUp1);
	clickUp1.amount++;
	draw();
}
function clickAction2(){
	money.current-=clickUp2.price;
	clickUp2.amount++;
	newUpPrice(clickUp2);
	draw();
}
function autoAction1(){
	money.current-=autoUp1.price;
	newUpPrice(autoUp1);
	autoUp1.amount++;
	draw();
}
function autoAction2(){
	money.current-=autoUp2.price;
	newUpPrice(autoUp2);
	autoUp2.amount++;
	draw();
}

function clickr () {
	if (clickUp1.amount>0||clickUp2.amount>0) {
		money.current += clickRate*1;
		money.total += clickRate*1;
	}else{money.current++;money.total++}
	draw();
}

/* Helper */
// Only on Startup!
!function startUp () {
	draw();
	priceCheck();
}();
