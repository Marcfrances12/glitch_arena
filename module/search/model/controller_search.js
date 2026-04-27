function load_category() {
    ajaxPromise('module/search/controller/controller_search.php?op=search_category', 'POST', 'JSON')
        .then(function (data) {
            $('<option>Categorias</option>').attr('selected', true).attr('disabled', true).appendTo('.search_category')
            for (row in data) {
                $('<option value="' + data[row].id_category + '">' + data[row].cat_name + '</option>').appendTo('.search_category')
            }
        }).catch(function () {
            window.location.href = "index.php?modules=exception&op=503&error=fail_load_brands&type=503";
        });
}