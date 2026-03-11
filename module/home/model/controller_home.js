function loadCategories() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCategory','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass(" card") 
                .attr('id', data[row].id_category)
                .appendTo('#containerCategories')
                .html(`
                
                    <img class="card-icon" src="${data[row].cat_img}" alt="" />
                    <div class="item-main">
                    
                        <p class="card-category">
                            <strong></strong> ${data[row].cat_name}
                            
                        </p>
                    </div>
                `);
                
        }
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadPlataform() {

    ajaxPromise('module/home/controller/controller_home.php?op=homePagePlataform','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("user_card card-vertical") 
                .attr('id', data[row].id_platform)
                .appendTo('#containerPlatform')
                .html(`
                    <div class="card-img-container">
                        <img src="${data[row].platform_logo}" alt="${data[row].platform_name}" class="card-img">
                    </div>
                    <div class="card-body">
                        <h3 class="card-name">${data[row].platform_name}</h3>
                    </div>
                `);
                
        }
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

$(document).ready(function () {
    loadCategories();
    loadPlataform();
    
});
