function validate(op) {
    let hayErrores = false;

    // Resetear clases y textos de error
    $(".error").removeClass("error");
    $(".error-text").text("");

    const nombre = $("#nombre_evento").val() || "";
    const descripcion = $("#descripcion").val() || "";
    const precio = $("#precio").val()|| "";
    const fechaIni = $("#fecha_ini").val()|| "";
    const fechaFin = $("#fecha_fin").val()|| "";
    const horario = $("#horario").val()|| "";
    const recinto = $("#recinto").val()|| "";
    const ubicacion = $("#ubicacion").val()|| "";
    const organizador = $("#organizador").val()|| "";
    const capacidad = $("#capacidad").val()|| "";

    /* ===== Nombre ===== */
    const nameReg = /^.*$/;
    if (!nombre) {
      $("#nombre_evento").addClass("error");
      $("#error_nombre").text("❌ El nombre es obligatorio JS.");
      hayErrores = true;
    } else if (!nameReg.test(nombre)) {
      $("#nombre_evento").addClass("error");
      $("#error_nombre").text("❌ Nombre no valido JS.");
      hayErrores = true;
    }

    /* ===== DESCRIPCION ===== */
    if (descripcion === "") {
        $("#descripcion").addClass("error");
        $("#error_descripcion").text("❌ La descripción es obligatoria JS.");
        hayErrores = true;
    } else if (descripcion.length < 10 || descripcion.length > 500) {
        $("#descripcion").addClass("error");
        $("#error_descripcion").text("❌ Debe tener entre 10 y 500 caracteres JS.");
        hayErrores = true;
    }

    // --- CATEGORIA ---
    if ($("#categoria").val() === "") {
        $("#categoria").addClass("error");
        $("#error_categoria").text("❌ Selecciona una categoría JS.");
        hayErrores = true;
    }

    // --- JUEGO ---
    if ($("#juego").val() === "") {
        $("#juego").addClass("error");
        $("#error_juego").text("❌ El juego es obligatorio JS.");
        hayErrores = true;
    }

    // --- PLATAFORMA (Checkboxes ) ---
    if ($("input[name='plataforma_juego[]']:checked").length === 0) {
        $("#error_plataforma").text("❌ Selecciona al menos una plataforma JS.");
        hayErrores = true;
    }

    // --- PRECIO ---
    const precioReg = /^\d+(\.\d{1,2})?$/;
    if (precio === "") {
        $("#precio").addClass("error");
        $("#error_precio").text("❌ El precio es obligatorio JS.");
        hayErrores = true;
    } else if (!precioReg.test(precio)) {
        $("#precio").addClass("error");
        $("#error_precio").text("❌ Solo números enteros JS.");
        hayErrores = true;
    }

    // --- ESTADO (Radio) ---
    if (!$("input[name='estado']:checked").val()) {
        $("#error_estado").text("❌ Selecciona un estado JS.");
        hayErrores = true;
    }

     // --- PREMIOS ---
    if ($("#premios").val() === "") {
        $("#premios").addClass("error");
        $("#error_premios").text("❌ Los premios son obligatorios JS.");
        hayErrores = true;
    }

    //FECHAS
    const fechaRegEx = /^\d{2}\/\d{2}\/\d{4}$/;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    let fechaIniObj, fechaFinObj;
   
    if (!fechaIni) {
        $("#fecha_ini").addClass("error");
        $("#error_fecha_ini").text("❌ La fecha inicial es obligatoria.");
        hayErrores = true;
   } 
    else if (!fechaRegEx.test(fechaIni)) {
        $("#fecha_ini").addClass("error");
        $("#error_fecha_ini").text("❌ Formato incorrecto. Usa DD/MM/YYYY.");
        hayErrores = true;
    } else {
        const [d, m, y] = fechaIni.split("/").map(Number);
        fechaIniObj = new Date(y, m - 1, d);

        if (fechaIniObj < hoy) {
            $("#fecha_ini").addClass("error");
            $("#error_fecha_ini").text("❌ No puede ser anterior a hoy.");
            hayErrores = true;
        }
    }
    if (!fechaFin) {
        $("#fecha_fin").addClass("error");
        $("#error_fecha_fin").text("❌ La fecha final es obligatoria.");
        hayErrores = true;
    } else if (!fechaRegEx.test(fechaFin)) {
        $("#fecha_fin").addClass("error");
        $("#error_fecha_fin").text("❌ Formato incorrecto. Usa DD/MM/YYYY.");
        hayErrores = true;
    } else {
        const [df, mf, yf] = fechaFin.split("/").map(Number);
        fechaFinObj = new Date(yf, mf - 1, df);

        if (fechaIniObj && fechaFinObj < fechaIniObj) {
            
            $("#fecha_fin").addClass("error");
            $("#error_fecha_fin").text("❌ La fecha final debe ser posterior a la inicial.");
            hayErrores = true;
        }
   }

    // --- HORARIO ---

    if (!horario) {
        $("#horario").addClass("error");
        $("#error_horario").text("❌ El horario es obligatorio.");
        hayErrores = true;
   } 
//     const h_inicio = $("#horario_inicio").val().trim();

//     const h_fin = $("#horario_fin").val().trim();
//     const horarioUnido = (h_inicio && h_fin) ? `${h_inicio} - ${h_fin}` : "";


//     $("#horario").val(horarioUnido);

//     const horReg = /^(?:[01]\d|2[0-3]):[0-5]\d\s-\s(?:[01]\d|2[0-3]):[0-5]\d$/;

//     if (h_inicio === "" || h_fin === "") {
//         $("#horario_inicio, #horario_fin").addClass("error");
//         $("#error-horario").text("❌ El horario es obligatorio (selecciona inicio y fin).");
//         hayErrores = true;
//     } else if (!horReg.test(horarioUnido)) {
//         $("#horario_inicio, #horario_fin").addClass("error");
//         $("#error-horario").text("❌ Formato de rango no válido.");
//         hayErrores = true;
//     } else {
  
//         $("#horario_inicio, #horario_fin").removeClass("error");
//         $("#error-horario").text("");
// }  
   

        // --- RECINTO ---
    
    const regRecinto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/;
    if (recinto === "") {
        $("#recinto").addClass("error");
        $("#error_recinto").text("❌ El recinto es obligatorio JS.");
        hayErrores = true;
    } else if (!regRecinto.test(recinto)) {
        $("#recinto").addClass("error");
        $("#error_recinto").text("❌ El recinto contiene caracteres no válidos JS.");
        hayErrores = true;
    }

    // --- UBICACIÓN ---
    
    const regUbicacion = /^.*$/;
    if (ubicacion === "") {
        $("#ubicacion").addClass("error");
        $("#error_ubicacion").text("❌ La ubicación es obligatoria JS.");
        hayErrores = true;
    } else if (!regUbicacion.test(ubicacion)) {
        $("#ubicacion").addClass("error");
        $("#error_ubicacion").text("❌ La ubicación contiene caracteres no válidos JS.");
        hayErrores = true;
    }

    // --- ORGANIZADOR ---
  
    const regOrganizador = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ' ]*$/;
    if (organizador === "") {
        $("#organizador").addClass("error");
        $("#error_organizador").text("❌ El organizador es obligatorio JS.");
        hayErrores = true;
    } else if (!regOrganizador.test(organizador)) {
        $("#organizador").addClass("error");
        $("#error_organizador").text("❌ El organizador contiene caracteres no válidos JS.");
        hayErrores = true;
    }

    // --- CAPACIDAD ---
    if (capacidad === "" || parseInt(capacidad) <= 0) {
        $("#capacidad").addClass("error");
        $("#error_capacidad").text("❌ Capacidad debe ser mayor a 0 JS.");
        hayErrores = true;
    }

    if (!hayErrores){
        if (op == 'create'){
            document.form_evento.submit();
            document.form_evento.action = "index.php?page=controller_evento&op=create";
        }
        if (op == 'update'){
            document.form_evento.submit();
            document.form_evento.action = "index.php?page=controller_evento&op=update&id=<?= htmlspecialchars($_GET['id'] ?? '')?>";
        }
    }

    if (op === 'delete'){
        document.delete.submit();
        document.delete.action = "index.php?page=controller_evento&op=delete&id=<?= htmlspecialchars($_GET['id'] ?? '')?>";
    }
    if (op === 'delete_all'){
        document.delete_all_evento.submit();
        document.delete_all_evento.action = "index.php?page=controller_evento&op=delete_all";
    }
    if (op === 'dummies'){
        document.dummies_evento.submit();
        document.dummies_evento.action = "index.php?page=controller_evento&op=dummies";
    }


   // return !hayErrores; // Retorna false impidiendo la subida si hayErrores es true
}

function showModal(title_evento, id) {
    $("#details_evento").show();
    $("#evento_modal").dialog({
        title: title_evento,
        width : 850,
        height: 500,
        resizable: "false",
        modal: "true",
        hide: {
            effect: "explode",
            duration: 1000
        },
        show: "fold",
        buttons : {
            Update: function() {
                        window.location.href = 'index.php?page=controller_evento&op=update&id=' + id;
                    },
            Delete: function() {
                        window.location.href = 'index.php?page=controller_evento&op=delete&id=' + id;
                    },
            Ok: function () {
                        $(this).dialog("close");
                        $(this).dialog("destroy");
                        $(this).hide();
                   }
        }
    });
}

function loadContentModal() {
    $('.evento').click(function () {
        var id = this.getAttribute('id');
         console.log(id);

        ajaxPromise('module/evento/controller/controller_evento.php?op=read_modal&modal=' + id, 'GET', 'JSON')
        .then(function(data) {
            console.log(data);
            

            $('<div></div>').attr('id', 'details_evento', 'type', 'hidden').appendTo('#evento_modal');
            $('<div></div>').attr('id', 'container').appendTo('#details_evento');
            $('#container').empty();
            $('<div></div>').attr('id', 'evento_content').appendTo('#container');
            $('#evento_content').html(function() {
                var content = "";
                for (row in data) {
                    content += '<br><span>' + row + ': <span id =' + row + '>' + data[row] + '</span></span>';
                }
                return content;
                });
                showModal(title_evento = data.nombre_evento, id = data.id_torn);
        })
        .catch(function(error) {
            //console.error("El error real es:", error);
            // window.location.href = 'index.php?page=503';
        });
    });
}

$(document).ready(function () {
    loadContentModal();
});


// $(document).ready(function () {
    
//         $('.evento').click(function () {
//             var id = this.getAttribute('id');
//              console.log(id);

//         $.ajax({
//             url: "module/evento/controller/controller_evento.php?op=read_modal&modal=" + id,
//             type: "GET",
//             dataType: "json",
//             success: function(response) {
//                  console.log(response);  
//                 if(response === 'error') {
//     			  window.location.href='index.php?page=503';
//                 }

//                 // console.log(response.user);
//                 $("#nombre_evento").html(response.nombre_evento);
//                 $("#descripcion").html(response.descripcion);
//                 $("#categoria").html(response.categoria);
//                 $("#juego").html(response.juego);
//                 $("#plataforma_juego").html(response.plataforma_juego);
//                 $("#precio").html(response.precio);
//                 $("#estado").html(response.estado);
//                 $("#premios").html(response.premios);
//                 $("#fecha_inicio").html(response.fecha_inicio);
//                 $("#fecha_fin").html(response.fecha_fin);
//                 $("#horario").html(response.horario);
//                 $("#recinto").html(response.recinto);
//                 $("#ubicacion").html(response.ubicacion);
//                 $("#organizador").html(response.organizador);
//                 $("#capacidad").html(response.capacidad);
         
//                 $("#details_evento").show();
//                 $("#evento_modal").dialog({
//                         width: 850, //<!-- ------------- ancho de la ventana -->
//                         height: 500, //<!--  ------------- altura de la ventana -->
//                         //show: "scale", <!-- ----------- animación de la ventana al aparecer -->
//                         //hide: "scale", <!-- ----------- animación al cerrar la ventana -->
//                         resizable: false, //<!-- ------ fija o redimensionable si ponemos este valor a "true" -->
//                         //position: "down",<!--  ------ posicion de la ventana en la pantalla (left, top, right...) -->
//                         modal: true, //<!-- ------------ si esta en true bloquea el contenido de la web mientras la ventana esta activa (muy elegante) -->
//                         buttons: {
//                             Ok: function () {
//                                 $(this).dialog("close");
//                                 $(this).dialog("destroy");
//                                 $(this).hide();
//                             }
//                         },
//                         show: {
//                             effect: "blind",
//                             duration: 1000
//                         },
//                         hide: {
//                             effect: "explode",
//                             duration: 1000
//                         },
                        
                        
                        
//                     });

//             },

            
//             error: function(error) {
//                 window.location.href='index.php?page=503';
//             }
//         });

//         });
// 	});