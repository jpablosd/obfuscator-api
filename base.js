/**
 * 
 * BASE
 * 
 * 
 */

	var div_general = ['resumen','solicitudes','ordenesDeTrabajo', 'bodega'];
	var buttonSubFunciones = [];
	var arrayDivSubFunciones = [];
	
	var user;

	var UXAPP = UXAPP || {};
	UXAPP.validador = {};


	UXAPP.validador.init = function () {
	    $("input[regexp]").each(function(){
            $(this).keypress(function(event){
                if ( event.which <= 32 ) 
                	return 0;
                var regexp = new RegExp( "^" + $(this).attr("regexp") + "$" , "g");
                if ( ! regexp.test( $(this).val() + String.fromCharCode(event.which) ) ) 
                	event.preventDefault();
            }); 
	    });
	}
	

	
	
	$( document ).ready(function(){
		rolMenu();
		getDataUser();
		$("#navbar").hide();
		$(".footerapp").hide();
		//$("#graphs").hide();
		google.charts.load('current', {'packages':['corechart']});
		

	});	

	function getDataUser(){
		var res = "";
		 $.ajax({
		        async: false,
		        type: "POST",
		        url: "rolServlet",
		        data:{
		        	opcion : "6"
				},
				dataType: "text",
		        success: function (responseText) {
		        	for(var i in responseText){ res += responseText[i].replace("'", '"'); }
					try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "46", e);}
		        },error: function(jqXHR, textStatus, errorThrown){
				    errorHandler("base.js", "47", errorThrown);
		        },complete: function(jqXHR, textStatus ){
		        	user = res;
		        	//console.log("user: "+user);
					$("#nombre_usuario_menu").text(res.nombre_usuario);
					toast("Bienvenido");
		        }
		    });
		
	}


	function rolMenu(){
		/*
		$.post('rolServlet', {
			opcion : "1",
			menu : "rol"
		}, function(responseText) {
			var array = responseText;
			var res = "";
			for(var i in array){ res += array[i].replace("'", '"');	}
			try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "31", e); }
			//console.log(res.length);
			var content = "";
			
			if(res.length == 1){ clickRol(res[0].id_rol); }
			
			for(var a in res){
				content += '<button id="'+res[a].id_rol+'" type="button" class="btn btn-outline-primary btn-lg btn-block btn-sm btnrol"><i class="black-text material-icons align-text-bottom">supervisor_account</i>'+res[a].nombre_rol+'</button>';
			}
			$(".rol_menu").append(content);	
			$(".btnrol").click(function(){ clickRol(this.id);} );	
		});
		*/
		
		
		 var res = "";
			var content = "";

		 $.ajax({
		        async: false,
		        type: "POST",
		        url: "rolServlet",
		        data:{
		        	opcion : "1",
					menu : "rol"
				},
				dataType: "text",
		        success: function (responseText) {
		        	var array = responseText;
					var res = "";
					for(var i in array){ res += array[i].replace("'", '"');	}
					try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "31", e); }
					//console.log(res.length);
					//console.log(res);
					//if(res.length == 1){ clickRol(res[0].id_rol); }
					for(var a in res){
						content += '<button id="'+res[a].id_rol+'" type="button" class="btn btn-outline-primary btn-lg btn-block btn-sm btnrol"><i class="black-text material-icons align-text-bottom">supervisor_account</i>'+res[a].nombre_rol+'</button>';
					}
					$(".rol_menu").append(content);	
					$(".btnrol").click(function(){ clickRol(this.id);} );	
		        },error: function(jqXHR, textStatus, errorThrown){
				    errorHandler("base.js", "240", errorThrown);
		        },complete: function(jqXHR, textStatus ){
		        	//console.log("user: "+user);
		        }
		    });
		
		
		
	}//rolMenu

	function clickRol(btn){
		//console.log(btn);
		$("#navbar").show();
		$(".footerapp").show();
		$("#rol_menu").hide();
		$("#graphs").show();

		/*
		$.post('rolServlet', {
			opcion : "2",
			rol : btn
		}, function(responseText) {
			//console.log(responseText);
			var res = "";
			for(var i in responseText){ res += responseText[i].replace("'", '"');	}
			try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "69", e); }
			
			var content = "";
			for(var a in res){				
				//console.log(res[a].id_funcion+', '+res[a].nombre_funcion+', '+res[a].clase+', '+res[a].icono+', '+res[a].id);
				content += '<li class="nav-item '+res[a].clase+'">';
					content += '<a class="nav-link" onclick="clickFuncion(this.id);" id="'+res[a].id_funcion+'" href="#">'+res[a].nombre_funcion+'</a>';
				content += '</li>';
			}
			clickFuncion(res[0].id_funcion);
			$(".barranav").append(content);
		});
		*/
		 var res = "";
		var content = "";
		 $.ajax({
		        async: false,
		        type: "POST",
		        url: "rolServlet",
		        data:{
		        	opcion : "2",
					rol : btn
				},
				dataType: "text",
		        success: function (responseText) {
		        	for(var i in responseText){ res += responseText[i].replace("'", '"');	}
					try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "69", e); }
		        },error: function(jqXHR, textStatus, errorThrown){
				    errorHandler("base.js", "69", errorThrown);
		        },complete: function(jqXHR, textStatus ){
		        	for(var a in res){				
						//console.log(res[a].id_funcion+', '+res[a].nombre_funcion+', '+res[a].clase+', '+res[a].icono+', '+res[a].id);
						content += '<li class="nav-item '+res[a].clase+'">';
							content += '<a class="nav-link" onclick="clickFuncion(this.id);" id="'+res[a].id_funcion+'" href="#">'+res[a].nombre_funcion+'</a>';
						content += '</li>';
					}
					clickFuncion(res[0].id_funcion);
					$(".barranav").append(content);
		        }
		    });
				
		user.id_rol = btn;
		//console.log(user);
	}//clickRol

	
	function clickFuncion(id){
		//console.log(id);
		if(id == 1){ //RESUMEN
			resumenFunction(id);
		}else if(id == 2){ //SOLICITUDES DE TRABAJO
			//console.log(id);
			solicitudesFunction(id);
		}else if(id == 3){//ORDENES DE TRABAJO
			//console.log(id);
			ordenesDeTrabajoFunction(id);
		}else if(id == 4){//BODEGA
			bodegaFunction(id);
			//toast("funionalidad no activa aun");
			//console.log(id);
		}
	}//clickFuncion

		
	function clickSubFuncion(id){
		var div = id+"_div";
		document.getElementById(id).classList.add('active');
		mantenedortest(id, div, arrayDivSubFunciones, buttonSubFunciones);

		if(id == "crear_solicitud_btn"){ crearSolicitud(); }
		else if(id == "listar_solicitud_btn"){ listarSolicitud(); }
		else if(id == "crear_ot_btn"){ crearOrdenDeTrabajo(); }
		else if(id == "listar_ot_btn"){ listarOrdenDeTrabajo(); }
		else if(id == "crear_solicitud_material_btn"){ crearSolicitudMaterial(); }
		else if(id == "listar_solicitud_material_btn"){ listarSolicitudMaterial(); }
		else{}
		
	}//clickSubFuncion

	

	// @param string (string) : Fecha en formato YYYY-MM-DD
	// @return (string)       : Fecha en formato DD/MM/YYYY
	function convertDateFormat(string) {
	  var info = string.split('-');
	  return info[2] + '/' + info[1] + '/' + info[0];
	}

	
	//botonera mantenedores y sub menues
	function mantenedortest(id, div, array_module, array_btn){
		var elementbtn = document.getElementById(id);
		for(var i = 0; i<elementbtn.classList.length; i++){
			if(elementbtn.classList[i] != "active"){
				document.getElementById(id).classList.add('active');
				for(var a in array_btn){
					if(id != array_btn[a]){
						document.getElementById(array_btn[a]).classList.remove('active');
						document.getElementById(div).style.display = 'block';
						for(var b in array_module){(div != array_module[b])?document.getElementById(array_module[b]).style.display = 'none' : null;}
					}
				}
			}
		}
	}//mantenedortest
	
	
	//botonera menu nav
	function botonera(id , array_module){	
		for(var i in array_module){
			var div = document.getElementById(array_module[i]);
			(id != array_module[i]) ? ((div.style.display != "none") ? div.style.display = 'none' : null) : div.style.display = 'block';
		}
	}//botonera
	
	
	
	//MENSAJE EN PANTALLA
	function toast(text) {
	    $("body").append("<div id='snackbar'>"+text+"</div>");
	    $("#snackbar").addClass('show');
	    setTimeout(function(){
	        $("#snackbar").removeClass('show');
	        $("#snackbar").remove();
	    }, 4000);
	}//toast

	
	
	/*
	function salir(){
		//window.location.href = '/';
		window.open('http://localhost:8080/Solicitudes/');
		//window.location.replace("http://localhost:8080/Solicitudes-0.0.1-SNAPSHOT/");
		//window.open('?','_self');
	}//salir
	*/
	
	function enviarCorreo(emisor, receptor, asunto, cuerpo, copiaa){
		$.post('rolServlet', {
			opcion : "16",
			emisor: emisor,
			receptor: receptor,
			asunto: asunto,
			cuerpo: cuerpo
		}, function(responseText) {
			//console.log(responseText);
			var res = "";
			for(var i in responseText){ res += responseText[i].replace("'", '"'); }
			try{res = JSON.parse(res);}catch(e){ errorHandler("base.js", "201", e);}
			//console.log(res);
		});
	}//enviarCorreo
	
	
	
	function abrirModal(content){
		$("#modal_content").empty();
		$("#modal_content").append(content);
		
		$('#modal').modal('show');
	}//abrirModal
	
	function cerrarModal(){
		$('#modal').modal('hide');
	}//cerrarModal
	
	
	
	function errorHandler(archivo, linea, message){
		//console.log("Error Handler: "+archivo + ", "+linea+", "+message);
		
		
		 var res2 = "";
		 $.ajax({
		        async: false,
		        type: "POST",
		        url: "rolServlet",
		        data:{
					opcion : "39",
					archivo: archivo,
					linea: linea,
					message: message
				},
				dataType: "text",
		        success: function (responseText) {
					for(var i in responseText){ res2 += responseText[i].replace("'", '"'); }
					try{res2 = JSON.parse(res2);}catch(e){ errorHandler("base.js", "238", e);}
		        },error: function(jqXHR, textStatus, errorThrown){
				    errorHandler("base.js", "240", errorThrown);
		        },complete: function(jqXHR, textStatus ){
		        	if(res2.result == "ok"){ 
		        		
		        	}
		        }
		    });
		
	}//errorHandler
	
	
	
	
	
	function cargando(){
	    $('#modalLoader').modal('show');
	    /*
	    setTimeout(function(){
	    	//$('#modalLoader').modal('hide');
	    	$('#modalLoader').modal('dispose');
	    }, 1000);
	    */
	}//cargando
	
	
	function cerrarModalCargando(){
    	$('#modalLoader').modal('hide');
	}
	
	function checkinput(id){
		if($("#"+id).val().length > 1){ if( ($("#"+id).val().split("/")[0] < 1) || ($("#"+id).val().split("/")[0] > 31) ) {
				toast("Revisar el DÍA.");
		} }
		
		if($("#"+id).val().length > 3){ if( ($("#"+id).val().split("/")[1] < 1) || ($("#"+id).val().split("/")[1] > 12) ) {
				toast("Revisar el MES."); 
		} }
		
		if($("#"+id).val().length > 6){ if( $("#"+id).val().split("/")[2].length == 4 ){ if( ( $("#"+id).val().split("/")[2] < 2017 ) || ( $("#"+id).val().split("/")[2] > 2018 ) ) {
			toast("Revisar el AÑO.");
		} } }
	}//checkinput
	
	
	
	
	
	
	
	