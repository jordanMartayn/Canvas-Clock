function analogueClock(cnvs,drawClean,properties){
	const clock = {
		cnvs, //same as cnvs:cnvs
		ctx:cnvs.getContext("2d"),
		centre:{
			xpos:cnvs.width/2,
			ypos:cnvs.height/2,
		},
		hourSegmentAngle:(2 * Math.PI) / 12,
		minSecSegmentAngle:(2 * Math.PI) / 60,
		face:{
			radius:cnvs.width/3,
			color:"#ffffff", //white
			lineWidth:cnvs.width/300,
			lineColor:"#000000",	//black
		},
		numeral:{
			radius:cnvs.width/3.34,
			type:{
				roman:["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"],
				greek:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
			},
			font: (cnvs.width/30).toString() + "px" + " Arial",
			color:"#000000",
			offset:{
				x:cnvs.width/75,
				y:cnvs.width/80,
			},
		},
		hands:{
			hour:{
				radius:cnvs.width/4,
				color:"#c1ffc1",
				lineWidth:cnvs.width/75,
			},
			min:{
				radius:cnvs.width/3.53,
				color:"#c1ffc1",
				lineWidth:cnvs.width/150,
			},
			sec:{
				radius:cnvs.width/3.16,
				color:"#c1ffc1",
				lineWidth:cnvs.width/600,
			},
		},
		glass:{
			line:{
				radii:[ cnvs.width/3.34, cnvs.width/3.16, cnvs.width/4 ],
				offsets:{
					x:[ -cnvs.width/15, -cnvs.width/60, cnvs.width/15],
					y:[ -cnvs.width/6, -cnvs.width/30, cnvs.width/5.46],
				},
				widths:[ cnvs.width/15, cnvs.width/8.57, cnvs.width/6.67],
				color:"rgba(200,200,200,0.2)",
			},
		},
		border:{
			radius:cnvs.width/2.4,
			color:"#c1ffc1", //mintGreen
			lineWidth:cnvs.width/300,
			lineColor:"#000000",	//black
		},

	};
	if(properties === true){
		return clock;
	}
	function clearCnvs(){ //you can give this function clock.tcx and clock.cnv and {} alows you to access the properties of cnv
		clock.ctx.clearRect(0, 0, cnvs.width, cnvs.height);
	};

	let time = () => {
		const today = new Date();
		return{
				hours: today.getHours(),
				minutes: today.getMinutes(),
				seconds: today.getSeconds(),
		};
	};

	function drawFace(){
		clock.ctx.beginPath();
		clock.ctx.arc(clock.centre.xpos, clock.centre.ypos, clock.face.radius, 0, 2 * Math.PI);
		clock.ctx.strokeStyle = clock.face.lineColor; //Black
		clock.ctx.lineWidth = clock.face.lineWidth;
		clock.ctx.shadowOffsetX = 0;
		clock.ctx.shadowOffsetY = 0;
		clock.ctx.shadowBlur = 20;
		clock.ctx.shadowColor = "grey";
		clock.ctx.fillStyle = clock.face.color;
		clock.ctx.fill();
		clock.ctx.stroke();
		clock.ctx.closePath();
	};

	function drawNumerals(numeralType){
		const numeralStartAngle = -2 * clock.hourSegmentAngle;
		clock.ctx.shadowOffsetX = 0;
		clock.ctx.shadowOffsetY = 0;
		clock.ctx.shadowBlur = 0;
		clock.ctx.font = clock.numeral.font;
		clock.ctx.fillStyle = clock.numeral.color;

		for (let x=0; x<12; x++) {
			let numeralAngle = numeralStartAngle + (clock.hourSegmentAngle * x);
			let numeralXpos = (clock.centre.xpos + ( clock.numeral.radius * Math.cos(numeralAngle) ) ) - clock.numeral.offset.x;
			let numeralYpos = (clock.centre.ypos  + ( clock.numeral.radius * Math.sin(numeralAngle) ) ) + clock.numeral.offset.y;
			clock.ctx.fillText(numeralType[x],numeralXpos,numeralYpos);
		}

	};

	function drawHourHand(){
		const hourStartAngle = -3 * clock.hourSegmentAngle;
		const currentHourMinuteAngle = (clock.hourSegmentAngle / 60) * time().minutes;
		const hourValue = time().hours;
		const hourAngle = hourStartAngle + (clock.hourSegmentAngle * hourValue) + currentHourMinuteAngle;
		const hourHandX = clock.centre.xpos + ( clock.hands.hour.radius * Math.cos(hourAngle) );
	  const hourHandY = clock.centre.ypos  + ( clock.hands.hour.radius * Math.sin(hourAngle) );

		clock.ctx.beginPath();
		clock.ctx.moveTo(clock.centre.xpos , clock.centre.ypos);
		clock.ctx.lineTo(hourHandX , hourHandY);
		clock.ctx.strokeStyle = clock.hands.hour.color;
		clock.ctx.lineCap = "round";
		clock.ctx.lineWidth = clock.hands.hour.lineWidth;
		clock.ctx.shadowOffsetX = 5;
		clock.ctx.shadowOffsetY = 5;
		clock.ctx.shadowBlur = 5;
		clock.ctx.shadowColor = "grey";
		clock.ctx.stroke();
	};

	function drawMinuteHand(){
		const minuteStartAngle = -15 * clock.minSecSegmentAngle;
		const currentMinuteSecondAngle = ( (clock.minSecSegmentAngle / 60) * time().minutes);
		const minuteValue = time().minutes;
		const minuteAngle = minuteStartAngle + (clock.minSecSegmentAngle * minuteValue) + currentMinuteSecondAngle
		const minuteHandX = clock.centre.xpos + ( clock.hands.min.radius * Math.cos(minuteAngle) );
		const minuteHandY = clock.centre.ypos  + ( clock.hands.min.radius * Math.sin(minuteAngle) );

		clock.ctx.beginPath();
		clock.ctx.moveTo(clock.centre.xpos , clock.centre.ypos);
		clock.ctx.lineTo(minuteHandX,minuteHandY);
		clock.ctx.strokeStyle = clock.hands.min.color;
		clock.ctx.lineWidth = clock.hands.min.lineWidth;
		clock.ctx.lineCap = "round";
		clock.ctx.stroke();
	};

	function drawSecondHand(){
		const secondStartAngle = -15 * clock.minSecSegmentAngle;
		const secondAngle = secondStartAngle + (clock.minSecSegmentAngle * time().seconds);
		const secondHandX = clock.centre.xpos + ( clock.hands.sec.radius * Math.cos(secondAngle) );
		const secondHandY = clock.centre.ypos  + ( clock.hands.sec.radius * Math.sin(secondAngle) );

		clock.ctx.beginPath();
		clock.ctx.moveTo(clock.centre.xpos , clock.centre.ypos);
		clock.ctx.lineTo(secondHandX,secondHandY);
		clock.ctx.strokeStyle = clock.hands.sec.color;
		clock.ctx.lineCap = "round";
		clock.ctx.lineWidth = clock.hands.sec.lineWidth;
		clock.ctx.stroke();
	};

	function drawGlass(){

		for(let x = 0; x < 3; x++){
			const lineStartX = (clock.centre.xpos + ( clock.glass.line.radii[x] * Math.cos(0.4) ) + clock.glass.line.offsets.x[x] );
			const lineStartY = (clock.centre.ypos  + ( clock.glass.line.radii[x] * Math.sin(0.4) ) - clock.glass.line.offsets.y[x] );
			const lineEndX = (clock.centre.xpos + ( clock.glass.line.radii[x] * Math.cos(0.4+Math.PI) ) + clock.glass.line.offsets.x[x] );
			const lineEndY = (clock.centre.ypos  + ( clock.glass.line.radii[x] * Math.sin(0.4+Math.PI) ) - clock.glass.line.offsets.y[x] );

			clock.ctx.beginPath();
			clock.ctx.moveTo(lineStartX , lineStartY);
			clock.ctx.lineTo(lineEndX , lineEndY);
			clock.ctx.strokeStyle = clock.glass.line.color;
			clock.ctx.lineCap = "round";
			clock.ctx.lineWidth = clock.glass.line.widths[x]
			clock.ctx.shadowOffsetX = 0;
			clock.ctx.shadowOffsetY = 0;
			clock.ctx.shadowBlur = 0;
			clock.ctx.stroke();
	}
};

	function drawBorder(){

	  clock.ctx.beginPath();
	  clock.ctx.arc(clock.centre.xpos, clock.centre.ypos, clock.border.radius, 0, 2 * Math.PI);
    clock.ctx.moveTo(clock.centre.ypos + clock.face.radius, clock.centre.ypos);
    clock.ctx.arc(clock.centre.xpos, clock.centre.ypos, clock.face.radius, 0, 2 * Math.PI,true);
	  clock.ctx.strokeStyle = clock.border.lineColor;
	  clock.ctx.lineWidth = clock.border.lineWidth;
	  clock.ctx.shadowOffsetX = 0;
	  clock.ctx.shadowOffsetY = 0;
	  clock.ctx.shadowBlur = 20;
	  clock.ctx.shadowColor = "grey";
	  clock.ctx.fillStyle = clock.border.color;
	  clock.ctx.fill();
	  clock.ctx.stroke();
	  clock.ctx.closePath();
    clock.ctx.beginPath();
    clock.ctx.arc(clock.centre.xpos, clock.centre.ypos, clock.face.radius, 0, 2 * Math.PI)
    clock.ctx.lineWidth = clock.face.lineWidth;
    clock.ctx.shadowOffsetX = 0;
    clock.ctx.shadowOffsetY = 0;
    clock.ctx.shadowBlur = 20;
    clock.ctx.shadowColor = "grey";
    clock.ctx.stroke();
    clock.ctx.closePath();
	};

	function drawClock(){
		drawFace();
		drawNumerals(clock.numeral.type.greek);
		drawHourHand();
		drawMinuteHand();
		drawSecondHand();
		drawGlass();
		drawBorder();
	};

	switch (drawClean) {
		case "draw":
			drawClock();
			break;
		case "wipe":
			clearCnvs();
			break;
		default:
		console.log(`Error - AnalogueClockV2 $2 not recognized: ${drawClean}`)
			return;
	}
};
