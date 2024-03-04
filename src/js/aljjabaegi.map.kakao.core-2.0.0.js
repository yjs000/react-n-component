/**
 * GEON LEE (http://aljjabaegi.tistory.com)
 * 2022.03.18 GEONLEE 2.0.0 CLASS 구조 변경, 코드 및 기능 개선
 *
 */
"use strict";
(function(){
	class AG_KAKAO_MAP{
		constructor(){}
		////////////////////////////////marker method///////////////////////////////////
		/*마커 데이터를 세팅한다.*/
		setMarker(name, data, callback){
			try{
				const opt = this.option.marker[name];
				if(opt !== "undefined"){
					const akm = this, size = opt.size || new kakao.maps.Size(24,24),
						  errorPos = [], xColNm = opt.posColNm.x, yColNm = opt.posColNm.y,
						  titleColNm = opt.title;
					let clickable = false, draggable = false, position = null, keyNm = opt.key;
					if(typeof xColNm === "undefined" || typeof yColNm === "undefined"){
						alert("마커 좌표 컬럼 옵션이 존재하지 않습니다!");
						return false;
					}
					if(typeof opt.click === "function" || typeof opt.co === "function"
						|| typeof opt.iw === "function") clickable = true;
					if(typeof opt.drag === "function" || typeof opt.dragstart === "function"
						|| typeof opt.dragend === "function") draggable = true;
					for(let d of data){
						const key = d[keyNm]+"", keys = Object.keys(this.marker[name]);
						if(typeof key === "undefined"){
							alert("마커 데이터에 Key 컬럼이 존재하지 않습니다!");
							break;
						}
						if(keys.indexOf(key) === -1){
							const posX = d[xColNm], posY = d[yColNm], title = d[titleColNm] || "";
							if(typeof posX === "undefined" || typeof posY === "undefined"){
								errorPos.push(d[keyNm]);
							}else{
								position = new kakao.maps.LatLng(posY, posX);
							}
							
							let imgSrc = null, size = null;
							if(typeof opt.image === "function"){
								imgSrc = opt.image(d);
							}else if(typeof opt.image === "string"){
								imgSrc = opt.image;
							}
							imgSrc = imgSrc || null;
							if(typeof opt.size === "function"){
								size = opt.size(d);
							}else if(typeof opt.size === "object"){
								size = opt.size;
							}
							
							this.marker[name][key] = new kakao.maps.Marker({
								position: position,
								clickable: clickable,
								draggable: draggable,
								image: new kakao.maps.MarkerImage(imgSrc, size),
								title: title
							});
							/*bounds 기능 처리*/
							if(typeof this.bounds === "object" && this.bounds !== null){
								this.bounds.extend(position);
							}
							/*infowindow 기능 처리*/
							if(typeof opt.iw === "function"){
								this.iw[name][key] = new kakao.maps.InfoWindow({
									position: position,
									content: opt.iw.call(this.iw[name][key], d, key)
								});
							}
							/*custom overlay 기능 처리*/
							if(typeof opt.co === "function"){
								this.co[name][key] = new kakao.maps.CustomOverlay({
									position: position,
									content: opt.co.call(this.co[name][key], d, key)
								});
							}
							this.marker[name][key].key = key;
							this.dataset.marker[name][key] = d;
							if(clickable){
								if(typeof opt.click === "function"){
									kakao.maps.event.addListener(this.marker[name][key], "click", function(e){
										opt.click.call(this, name, this.key);
										if(typeof this.iw !== "undefined"
											&& this.iw[name] !== "undefined"){
											this.iw[name][key].open(this.map);
										}
										if(typeof this.co !== "undefined"
											&& this.co[name] !== "undefined"){
											this.co[name][key].open(this.map);
										}
									});
								}
							}
							if(draggable){
								if(typeof opt.drag === "function" || typeof opt.dragstart === "function"
									|| typeof opt.dragend === "function"){
									["drag", "dragstart", "dragend"].forEach(function(evtNm){
										if(typeof opt[evtNm] === "function"){
											kakao.maps.event.addListener(akm.marker[name][key], evtNm, function(e){
												opt[evtNm].call(this);
											});
										}
									});
								}
							}
						}
					}
					if(this.display[name]) this.show("marker", name);
				}
				if(typeof callback === "function") callback();
			}catch(e){
				alert("마커 객체를 생성하는데 실패하였습니다!");
				console.error("setMarker Method Error", e);
				return false;
			}
		}
		////////////////////////////////polyline method///////////////////////////////////
		setPolyline(name, data, callback){
			try{
				const akm = this, opt = this.option.polyline[name];
				let clickable = false;
				if(opt !== "undefined"){
					if(typeof opt.click === "function") clickable = true;
					const getPolylineOpt = function(linePath){
						return {
							path: linePath,
							strokeWeight: opt.strokeWeight || 2,
							strokeColor: opt.strokeColor || "#FF00F",
							strokeOpacity: opt.strokeOpacity || 0.8,
							strokeStyle: opt.strokeStyle || "solid",
							fillColor: opt.fillColor || "00EEEE",
							fillOpacity: opt.fillOpacity || 0.5,
							clickable: clickable || false,
							zIndex: opt.zIndex || 1
						}
					}
					const setPolylineToMap = function(polylineOpt, key){
						const evt = [];
						akm.polyline[name][key] = new kakao.maps.Polyline(polylineOpt);
						akm.polyline[name][key].key = key;
						if(clickable) evt.push("click");
						if(opt.mouseover) evt.push("mouseover");
						if(opt.mouseout) evt.push("mouseout");
						evt.forEach(function(evtNm){
							kakao.maps.event.addListener(akm.polyline[name][key], evtNm,
									opt[evtNm].bind(akm.polyline[name][key]));
						});
					}
					const keys = Object.keys(this.polyline[name]);
					let linePath = [], size = data.length, polyOpt = null;
					for(let i=0, n=size; i<n; i++){
						const d = data[i], key = d[opt.key]+"",
							  posX = d[opt.posColNm.x], posY = d[opt.posColNm.y];
						if(keys.indexOf(key) === -1){
							if(typeof key === "undefined" && key == null){
								alert("폴리라인 데이터에 키 컬럼이 존재하지 않는 데이터가 있습니다!");
								console.error(d);
								break;
							}
							if(typeof posX !== "undefined" && typeof posX !== null
								&& typeof posY !== "undefined" && typeof posY !== null){
								linePath.push(new kakao.maps.LatLng(posY, posX));
								if(typeof this.dataset["polyline"][name][key] === "undefined"){
									this.dataset["polyline"][name][key] = [];
								}
								this.dataset["polyline"][name][key].push(data[i]);
								if(i == size-1){
									polyOpt = getPolylineOpt(linePath);
									setPolylineToMap(polyOpt, key);
									linePath = [];
								}else{
									if(d[opt.key] !== data[i+1][opt.key]){
										polyOpt = getPolylineOpt(linePath);
										setPolylineToMap(polyOpt, key);
										linePath = [];
									}
								}
							}
						}
					}
					if(this.display[name]) this.show("polyline", name);
					if(typeof callback === "function") callback();
				}
			}catch(e){
				alert("폴리라인 객체를 생성하는데 실패하였습니다!");
				console.log("setpolyline Method Error", e);
			}
		}
		////////////////////////////////polygon method///////////////////////////////////
		setPolygon(name, data, callback){
			try{
				const akm = this, opt = this.option.polygon[name];
				if(opt !== "undefined"){
					const clickable = opt.clickable || false;
					const getPolygonOpt = function(linePath){
						return {
							path: linePath,
							strokeWeight: opt.strokeWeight || 2,
							strokeColor: opt.strokeColor || "#FF00F",
							strokeOpacity: opt.strokeOpacity || 0.8,
							strokeStyle: opt.strokeStyle || "solid",
							fillColor: opt.fillColor || "00EEEE",
							fillOpacity: opt.fillOpacity || 0.5,
							clickable: clickable || false,
							zIndex: opt.zIndex || 1
						}
					}
					const setPolygonToMap = function(polygonOpt){
						const evt = [];
						akm.polygon[name] = new kakao.maps.Polygon(polygonOpt);
						akm.polygon[name].key = name;
						if(clickable) evt.push("click");
						if(opt.mouseover) evt.push("mouseover");
						if(opt.mouseout) evt.push("mouseout");
						evt.forEach(function(evtNm){
							kakao.maps.event.addListener(akm.polygon[name], evtNm,
									opt[evtNm].bind(akm.polygon[name]));
						});
					}
					this.dataset["polygon"][name] = data;
					const linePath = [], size = data.length;
					for(let d of data){
						const key = d[opt.key]+"";
						if(typeof key === "undefined" && key == null){
							alert("폴리곤 데이터에 키 컬럼이 존재하지 않는 데이터가 있습니다!");
							console.error(d);
							break;
						}
						const posX = d[opt.posColNm.x], posY = d[opt.posColNm.y];
						if(typeof posX !== "undefined" && typeof posX !== null
							&& typeof posY !== "undefined" && typeof posY !== null){
							linePath.push(new kakao.maps.LatLng(posY, posX));
						}
					}
					const polyOpt = getPolygonOpt(linePath);
					setPolygonToMap(polyOpt);
					if(this.display[name]) this.show("polygon", name);
					if(typeof callback === "function") callback();
				}
			}catch(e){
				alert("폴리곤 객체를 생성하는데 실패하였습니다!");
				console.log("setPolygon Method Error", e);
			}
		}
		////////////////////////////////common method///////////////////////////////////
		/*객체를 지도에 표출한다.*/
		show(type, name){
			try{
				if(arguments.length == 2){
					const obj = this[type][name];
					if(typeof obj !== "undefined"){
						this.display[name] = true;
						if(type === "marker" || type === "polyline"){
							for(let mapObj of Object.values(obj)){
								mapObj.setMap(this.map);
							}
						}else if(type === "polygon"){
							obj.setMap(this.map);
						}
					}
				}else if(arguments.length == 1){
					const obj = this[type], mapObj = Object.entries(obj);
					if(type === "marker" || type === "polyline"){
						for(let [name, obj] of mapObj){
							this.display[name] = true;
							for(let o of Object.values(obj)){
								o.setMap(this.map);
							}
						}
					}else if(type === "polygon"){
						for(let [name, polygon] of mapObj){
							this.display[name] = true;
							polygon.setMap(this.map);
						}
					}
				}else if(arguments.length == 0){
					console.error("showMarker 메소드는 파라메터가 있어야합니다! " +
							"arg1*: [marker, polyline, polygon], arg2: [객체의 옵션명칭]");
					return false;
				}
				if(this.bounds !== null && !this.bounds.isEmpty()){
					this.map.setBounds(this.bounds);
					this.clearBounds();
				}
				return true;
			}catch(e){
				alert("지도 객체를 표출하는데 실패하였습니다!");
				console.error(e);
				return false;
			}
		}
		/*객체를 지도에서 숨긴다.*/
		hide(type, name){
			try{
				if(arguments.length == 2){
					let obj = this[type];
					if(typeof obj !== "undefined"){
						obj = obj[name];
						this.display[name] = false;
						if(type === "marker" || type === "polyline"){
							for(let [key, o] of Object.entries(obj)){
								o.setMap(null);
								if(type === "marker"){
									if(this.hasOwnProperty("iw")) this["iw"][name][key].setMap(null);
									if(this.hasOwnProperty("co")) this["co"][name][key].setMap(null);
								}
							}
						}else if(type === "polygon"){
							console.log(obj);
							if(typeof obj !== "undefined") obj.setMap(null);
						}
					}else{
						console.error("[hide method] 숨길 객체 타입이 존재하지 않습니다!");
					}
				}else if(arguments.length == 1){
					const obj = this[type], mapObj = Object.entries(obj);
					if(typeof obj !== "undefined"){
						if(type === "marker" || type === "polyline"){
							for(let [name, obj] of mapObj){
								this.display[name] = false;
								for(let [key, o] of Object.entries(obj)){
									if(type === "marker"){
										if(this.hasOwnProperty("iw")) this["iw"][name][key].setMap(null);
										if(this.hasOwnProperty("co")) this["co"][name][key].setMap(null);
									}
									o.setMap(null);
								}
							}
						}else if(type === "polygon"){
							for(let [name, polygon] of mapObj){
								this.display[name] = false;
								polygon.setMap(null);
							}
						}
					}else{
						console.error("[hide method] 숨길 객체 타입이 존재하지 않습니다!");
					}
				}else if(arguments.length == 0){
					console.error("hideMarker 메소드는 파라메터가 있어야합니다! " +
							"arg1*: [marker, polyline, polygon], arg2: [객체의 옵션명칭]");
					return false;
				}
				return true;
			}catch(e){
				alert("지도 객체를 숨기는데 실패하였습니다!");
				console.error(e);
				return false;
			}
		}
		/*지도 내 객체를 초기화한다.*/
		clear(type, name){
			const akm = this;
			try{
				if(arguments.length == 2){
					if(this.hasOwnProperty(type) && this[type].hasOwnProperty(name)){
						this.hide(type, name);
						this.dataset[type][name] = {};
						this.display[name] = true;
						this[type][name] = {};
						if(type === "marker"){
							 if(this.hasOwnProperty("iw")) this.iw[name] = {};
							 if(this.hasOwnProperty("co")) this.co[name] = {};
						}
					}
				}else if(arguments.length == 1){
					if(this.hasOwnProperty(type)){
						this.hide(type);
						for(let name of Object.keys(this[type])){
							this.dataset[type][name] = {};
							this.display[name] = true;
							this[type][name] = {};
							if(type === "marker"){
								 if(this.hasOwnProperty("iw")) this.iw[name] = {};
								 if(this.hasOwnProperty("co")) this.co[name] = {};
							}
						}
					}
				}else if(arguments.length == 0){
					["marker", "polyline", "polygon"].forEach(function(objNm){
						if(akm.hasOwnProperty(objNm)){
							for(let name of Object.keys(akm[objNm])){
								akm.hide(objNm, name);
								akm[objNm][name] = {};
								akm.dataset[objNm][name] = {};
								akm.display[name] = true;
								if(objNm == "marker"){
									if(akm.hasOwnProperty("iw")) akm["iw"][name] = {};
									if(akm.hasOwnProperty("co")) akm["co"][name] = {};
								}
							}
						}
					});
				}
				return true;
			}catch(e){
				alert("마커 데이터 초기화에 실패하였습니다!");
				console.error("clearMarker Method Error", e);
				return false;
			}
		}
		/*지도 내 객체정보를 삭제한다.*/
		del(type, name, key){
			const ds = this.dataset;
			if(ds.hasOwnProperty(type) && ds[type].hasOwnProperty(name)
					&& ds[type][name].hasOwnProperty(key)){
				this[type][name][key].setMap(null);
				if(this.hasOwnProperty("co")){
					this["co"][name][key].setMap(null);
				}
				delete ds[type][name][key];
				delete this[type][name][key];
				return true;
			}else{
				alert("삭제할 객체 정보가 올바르지 않습니다.[ "+type+", "+name+", "+key+" ]");
				return false;
			}
		}
		/*지도 내 객체를 토글한다.*/
		toggle(type, name){
			if(this.display[name]){
				this.hide(type, name);
			}else{
				this.show(type, name);
			}
		}
		/*카카오 지도에서 제공하는 교통정보를 토글한다.*/
		toggleTraffic(){
			if(this.traffic){
				this.map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				this.traffic = false;
			}else{
				this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
				this.traffic = true;
			}
		}
		/*bounds: 좌표의 중심점, 레벨을 표출 좌표에 맞게 설정*/
		setBounds(){
			this.bounds = new kakao.maps.LatLngBounds();
		}
		clearBounds(){
			this.bounds = null;
		}
		/*객체의 데이터를 리턴한다.*/
		getDataByKey(type, name, key){
			return this.dataset[type][name][key] || null;
		}
	}
	window.AKM = function(option){
		class LOCAL_MAP extends AG_KAKAO_MAP{
			constructor(option){
				super(option);
				if(typeof option !== "undefined"){
					const excepOption = ["id", "center", "minLevel", "maxLevel", "draggable",
						"displayBusSymbol","markerOpt", "polylineOpt", "polygonOpt", "zoomable",
						"control", "level", "bounds"];
					for(let opt in option){
						if(excepOption.indexOf(opt) == -1 && option.hasOwnProperty(opt)){
							this[opt] = option[opt];
						}
					}
					this.container = document.getElementById(option.id);
					const mapOption = {
						center: option.center || new kakao.maps.LatLng(37.494990, 127.122424),
						level: option.level || 10,
						minLevel: option.minLevel || 0,
						maxLevel: option.maxLevel || 14,
					}
					this.option = {
						marker: option.markerOpt || null,
						polyline: option.polylineOpt || null,
						polygon: option.polygonOpt || null,
					}
					this.bounds = option.bounds || null;
					if(option.displayBusSymbol === false) kakao.maps.disableBusSymbol();
					this.map = new kakao.maps.Map(this.container, mapOption);
//					if(option.draggable === false) this.map.setDraggable(false);
					if(option.zoomable === false) this.map.setZoomable(option.zoomable);
					if(option.traffic === true) this.map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
					if(typeof option.control !== "undefined"){
						const optionPos = option.control.position.toUpperCase() || "TOPRIGHT";
						if(typeof option.control.type !== "undefined"){
							const mapTypeControl = new kakao.maps.MapTypeControl();
							/* ControlPosition
							 * TOP, TOPLEFT, TOPRIGHT, LEFT, RIGHT, BOTTOMLEFT, BOTTM, BOTTMRIGHT
							 * */
							this.map.addControl(mapTypeControl, kakao.maps.ControlPosition[optionPos]);
						}
						if(typeof option.control.zoom !== "undefined"){
							const zoomControl = new kakao.maps.ZoomControl();
							if(["TOPLEFT", "BOTTMLEFT"].indexOf(optionPos) !== -1){
								position = kakao.maps.ControlPosition.LEFT;
							}
							this.map.addControl(zoomControl, optionPos);
						}
					}
					this.dataset = {};
					this.display = {};
					const akm = this;
					["marker", "polyline", "polygon"].forEach(function(mapObj){
						const opt = option[mapObj+"Opt"];
						if(typeof opt !== "undefined"){
							akm[mapObj] = {};
							akm.dataset[mapObj] = {};
							for(let key of Object.keys(opt)){
								akm[mapObj][key] = {};
								akm.dataset[mapObj][key] = {};
								akm.display[key] = true;
								if(mapObj == "marker"){
									if(typeof opt[key].iw === "function"){
										if(typeof akm["iw"] === "undefined") akm["iw"] = {};
										akm["iw"][key] = {};
									}
									if(typeof opt[key].co === "function"){
										if(typeof akm["co"] === "undefined") akm["co"] = {};
										akm["co"][key] = {};
									}
								}
							}
						}
					});
				}
			}
		}
		return new LOCAL_MAP(option);
	}
})();