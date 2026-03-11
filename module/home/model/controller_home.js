function loadCategories() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCategory','GET', 'JSON')
    .then(function(data) {
        console.log(data);
//  <h3 class="evento-name card-title">${data[row].nombre_evento}</h3> 
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("user_card card") 
                .attr('id', data[row].id_torn)
                .appendTo('#containerCategories')
                .html(`
                    <span class="material-symbols-outlined card-icon">sports_esports</span>
                    <div class="item-main">
                        
                        <p class="card-category">
                            <strong></strong> ${data[row].categoria}
                        </p>
                    </div>
                `);
                
        }
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

$(document).ready(function () {
    //console.log('controller_home.js loaded');

    loadCategories();
});
