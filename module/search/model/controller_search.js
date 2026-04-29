function load_category() {
    ajaxPromise('module/search/controller/controller_search.php?op=search_category', 'POST', 'JSON')
        .then(function (data) {
            console.log(data);
            $('<option>Categorias</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
            for (row in data) {
                $('<option value="' + data[row].id_category + '">' + data[row].cat_name + '</option>').appendTo('.search_category')
            }
        }).catch(function () {
            window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}

function load_plataform(category) {
    $('.search_plataforma').empty();
    console.log(category);
    if (category == undefined) {
        ajaxPromise('module/search/controller/controller_search.php?op=search_plataforma_null', 'POST', 'JSON')
            .then(function (data) {
                $('<option>Plataforma</option>').attr('selected', true).attr('disabled', true).appendTo('.search_plataforma')
                for (row in data) {
                    $('<option value="' + data[row].id_platform + '">' + data[row].platform_name + '</option>').appendTo('.search_plataforma')
                }
            }).catch(function () {
                window.location.href = "index.php?modules=exception&op=503&error=fail_load_category&type=503";
            });
    }
    else {
        ajaxPromise('module/search/controller/controller_search.php?op=search_plataforma', 'POST', 'JSON', category)
            .then(function (data) {
                console.log(data);
                $('<option value="0">Plataforma</option>').attr('selected', true).attr('disabled', true).appendTo('.search_plataforma');
                for (row in data) {
                    $('<option value="' + data[row].id_platform + '">' + data[row].platform_name + '</option>').appendTo('.search_plataforma')
                }

              
            }).catch(function () {
                window.location.href = "index.php?modules=exception&op=503&error=fail_loas_category_2&type=503";
            });
    }
}

function launch_search() {
    load_category();
    load_plataform();
    $(document).on('change', '.search_category', function () {
        let category = $(this).val();
        if (category === 0) {
            load_plataform();
        } else {
            load_plataform({category});
        }
    });
}

function autocomplete() {
    const buscar_ciudades = () => {
        let sdata = { 
            complete: $("#autocom").val(), 
            category: $('.search_category').val() != "0" ? $('.search_category').val() : null,
            id_platform: $('.search_plataforma').val() != "0" ? $('.search_plataforma').val() : null
        };

        ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', sdata)
            .then(function (data) {
                $('#search_auto').empty().show(); 
                
                if (data == "error" || data.length === 0) {
                    $('#search_auto').append('<div class="searchElement">No hay sedes disponibles</div>');
                } else {
                    for (row in data) {
                        $('<div></div>').appendTo('#search_auto')
                            .html(data[row].city_name)
                            .attr({ 'class': 'searchElement', 'id': data[row].city_name });
                    }
                }
            }).catch(function () {
                $('#search_auto').fadeOut(200);
            });
    };

   
    $("#autocom").on("keyup", buscar_ciudades);

    
    // $(document).on('change', '.search_category, .search_plataforma', function() {
    //     buscar_ciudades();
    // });

    // $("#autocom").on("focus", buscar_ciudades);

    $(document).on('click', '.searchElement', function () {
        let city = $(this).text();
        if (city !== "No hay sedes disponibles") {
            $('#autocom').val(city);
        }
        $('#search_auto').fadeOut(200);
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('#autocom, #search_auto').length) {
            $('#search_auto').fadeOut(200);
        }
    });
}

function button_search() {
    $('#search-btn').on('click', function () {
        var filtros = [];

        if ($('.search_category').val() != undefined && $('.search_category').val() != "0") {
            var namecat = $('.search_category option:selected').text(); 
            filtros.push(["cat_name", namecat]);
        }

        if ($('.search_plataforma').val() != undefined && $('.search_plataforma').val() != "0") {
            var nameplat = $('.search_plataforma option:selected').text();
            filtros.push(["platform_name", nameplat]);
        }

        if ($('#autocom').val() != undefined && $('#autocom').val() != "") {
            var city = $('#autocom').val();
            filtros.push(["city_name", city]);
        }

        localStorage.removeItem('filtros');

        if (filtros.length != 0) {
            localStorage.setItem('filtros', JSON.stringify(filtros));
        }

        window.location.href = 'index.php?page=controller_shop&op=list';
    });
}

$(document).ready(function () {
   launch_search();
   autocomplete();
   button_search();
});