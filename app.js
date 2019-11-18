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
			amount:0
		},
		upgrade2:{
			a27:1.1,
			price:500,
			perInterval:10,
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
			price:250,
			multiplier:10,
			amount:0
		},
		upgrade3:{
			a27:5,
			price:500,
			multiplier:2,
			amount:0
		}
	},
	clickUp1 = clickUp.upgrade1,
	clickUp2 = clickUp.upgrade2,
	clickUp3 = clickUp.upgrade3,
	autoUp1 = autoUp.upgrade1,
	autoUp2 = autoUp.upgrade2,
	newUpPrice = function(who){Math.floor(who.price*=(who.a27)); who.a27*=1.15;};
	// DOM variables
var statsMoney = document.getElementById('money'),
	statsClick = document.getElementById('perClick'),
	statsAuto = document.getElementById('perSecond'),
	upgBtnClick1 = document.getElementById('clickUpgrade1'),
	upgBtnClick1Count = document.getElementById('countC1'),
	upgBtnClick2 = document.getElementById('clickUpgrade2'),
	upgBtnClick2Count = document.getElementById('countC2'),
	upgBtnClick3 = document.getElementById('clickUpgrade3'),
	upgBtnClick3Count = document.getElementById('countC3'),
	upgBtnAuto1 = document.getElementById('autoUpgrade1'),
	upgBtnAuto1Count = document.getElementById('countA1'),
	upgBtnAuto2 = document.getElementById('autoUpgrade2'),
	upgBtnAuto2Count = document.getElementById('countA2');

	// Auto upgrade
	window.setInterval((x=>{money.current+=autoRate;money.total+=autoRate;draw();}), 2500);

///////////////
// Functions //
///////////////

/* Primary */
function draw (){
	priceCheck();
	autoRate = Math.floor((autoUp1.amount*autoUp1.perInterval)+(autoUp2.amount*autoUp2.perInterval));
	if(clickUp3.amount>0){clickRate = Math.floor(((clickUp1.amount*clickUp1.multiplier)+(clickUp2.amount*clickUp2.multiplier))*(clickUp3.multiplier*clickUp3.amount));}
		else{clickRate = Math.floor((clickUp1.amount*clickUp1.multiplier)+(clickUp2.amount*clickUp2.multiplier));}
	// Drawing Stats
	statsMoney.innerHTML = `${Math.floor(money.current)}`;
	statsAuto.innerHTML = `${Math.floor(autoRate)}`;
	statsClick.innerHTML = `${Math.floor(clickRate)}`;
	upgBtnClick1Count.innerHTML = clickUp1.amount;
	upgBtnClick2Count.innerHTML = clickUp2.amount;
	upgBtnClick3Count.innerHTML = clickUp3.amount;
	upgBtnAuto1Count.innerHTML = autoUp1.amount;
	upgBtnAuto2Count.innerHTML = autoUp2.amount;
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
	// Click Upgrade 3
	if(money.current>=clickUp3.price){
		upgBtnClick3.disabled = false;
	}else{
		upgBtnClick3.disabled = true;
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
function clickAction3(){
	money.current-=clickUp3.price;
	clickUp3.amount++;
	newUpPrice(clickUp3);
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
