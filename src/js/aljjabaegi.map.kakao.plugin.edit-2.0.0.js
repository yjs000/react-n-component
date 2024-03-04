/**
 * GEON LEE (http://aljjabaegi.tistory.com)
 *
 * 2021.06.01 GEONLEE 1.0.0 eidt plugin 개발
 * 2021.06.03 GEONLEE 1.0.0 EDIT 초기화 함수 추가 resetDraw
 *            GEONLEE 1.0.0 drawingMode, 각 옵션들 파라메터로 받아 처리하도록 변경
 * 2021.06.04 GEONLEE 1.0.0 undoEdit 편집중인 데이터 되돌리기 함수 구현
                            resetDraw 편집 초기화 함수 구현
   2022.03.18 GEONLEE 2.0.0 CORE 코드 개선에 따른 버전 업
 * 
*/
"use strict";
(function(){
	if(typeof AKM == "undefined") {
		console.error("Edit 기능을 사용하기 위해선 aljjabaegi.map.kakao.core 가 로드되어야 합니다!");
		return false;
	}else{
		try{
			const newAKM = AKM().__proto__.__proto__;
			newAKM.isUndefined = function(obj){
				if(typeof obj === "undefined"){
					return true;
				}else{
					return false;
				}
			}
			newAKM.drawingInit = function(userOption){
				this.newDrawing = {};
				const option = {
					map : this.map,
					guideTooltip: ['draw', 'drag', 'edit'],
					drawingMode: []
				}
				if(!this.isUndefined(userOption.marker)){
					option.drawingMode.push(kakao.maps.drawing.OverlayType.MARKER);
					option.markerOptions = userOption.marker;
				}
				if(!this.isUndefined(userOption.polyline)){
					option.drawingMode.push(kakao.maps.drawing.OverlayType.POLYLINE);
					option.polylineOptions = userOption.polyline;
				}
				this.drawingManager = new kakao.maps.drawing.DrawingManager(option);
				if(!this.isUndefined(userOption.event)){
					if(!this.isUndefined(userOption.event.remove)){
						this.drawingManager.addListener("remove", userOption.event.remove);
					}
					if(!this.isUndefined(userOption.event.cancel)){
						this.drawingManager.addListener("cancel", userOption.event.cancel);
					}
					if(!this.isUndefined(userOption.event.draw)){
						this.drawingManager.addListener("draw", userOption.event.draw);
					}
					if(!this.isUndefined(userOption.event.drawstart)){
						this.drawingManager.addListener("drawstart", userOption.event.drawstart);
					}
					if(!this.isUndefined(userOption.event.drawend)){
						this.drawingManager.addListener("drawend", userOption.event.drawend);
					}
					if(!this.isUndefined(userOption.event.state_changed)){
						this.drawingManager.addListener("state_changed", userOption.event.state_changed);
					}
				}
			},
			/*편집한 데이터를 초기화한다.*/
			newAKM.resetDraw = function(){
				while(this.drawingManager.undoable()){
					this.drawingManager.undo();
				}
			},
			/*편집한 데이터를 가져온다.*/
			newAKM.getAddedData = function(){
				return this.drawingManager.getData(); 
			}
		}catch(e){
			console.error("Edit Methods 생성에 실패하였습니다!");
		}
	}
})();