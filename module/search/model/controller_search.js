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
    $("#autocom").on("keyup", function () {
        let sdata = { complete: $(this).val() };
        if (($('.search_category').val() != 0)) {
            sdata.cat_name = $('.search_category').val();
            if (($('.search_category').val() != 0) && ($('.search_plataforma').val() != 0)) {
                sdata.platform_name = $('.search_plataforma').val();
            }
        }
        if (($('.search_category').val() == undefined) && ($('.search_plataforma').val() != 0)) {
            sdata.platform_name = $('.search_plataforma').val();
        }
        ajaxPromise('module/search/controller/controller_search.php?op=autocomplete', 'POST', 'JSON', sdata)
            .then(function (data) {
                console.log(data);
                $('#search_auto').empty();
                $('#search_auto').fadeIn(10000000);
                for (row in data) {
                    $('<div></div>').appendTo('#search_auto').html(data[row].city_name).attr({ 'class': 'searchElement', 'id': data[row].id_city });
                }
                $(document).on('click', '.searchElement', function () {
                    $('#autocom').val(this.getAttribute('id'));
                    $('#search_auto').fadeOut(1000);
                });
                $(document).on('click scroll', function (event) {
                    if (event.target.id !== 'autocom') {
                        $('#search_auto').fadeOut(1000);
                    }
                });
            }).catch(function () {
                $('#search_auto').fadeOut(500);
            });
    });
}

$(document).ready(function () {
   launch_search();
   autocomplete();
});