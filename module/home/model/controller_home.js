function loadCategories() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCategory','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("swiper-slide card") 
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

            new Swiper(".mySwiperCategories", {

                slidesPerView: 4,
                spaceBetween: 1,
                slidesPerGroup: 1,
                loop: true,

                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                },
                autoplay: { 
                    delay: 3000,
                    disableOnInteraction: false
                },

                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3 
                    },
                    1024: {
                        slidesPerView: 4
                    }
                }
            });
                
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

function loadGames() {

    ajaxPromise('module/home/controller/controller_home.php?op=homePageGame','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
          
            let imagesArray = data[row].all_images ? data[row].all_images.split(',') : ['view/img/default.png'];
            let slidesHTML = imagesArray.map(img => `
                <div class="swiper-slide">
                    <img src="${img}" class="game-card-img" alt="${data[row].game_name}">
                </div>
            `).join('');

            $("<div/>")
                .addClass("game-card ") 
                .attr('id', data[row].id_game) 
                .appendTo('#game-card') 
                .html(`
                    <div class="game-card-header">
                        <div class="swiper inner-game-swiper">
                            <div class="swiper-wrapper">
                                ${slidesHTML}
                            </div>
                            <div class="swiper-pagination mini-dots"></div>
                            <div class="swiper-button-next mini-nav"></div>
                            <div class="swiper-button-prev mini-nav"></div>
                        </div>
                        <div class="game-card-badge">${data[row].developer}</div>
                    </div>

                    <div class="game-card-body">
                        <div class="game-card-meta">
                            <span class="game-tag">${data[row].developer}</span>
                        </div>
                        <h4 class="game-card-title">${data[row].game_name}</h4>
                        <button class="game-card-btn">Ver Torneos</button>
                    </div>
                `);

                new Swiper(".inner-game-swiper", {
                    nested: true, 
                    loop: true,
                    pagination: {
                        el: ".mini-dots",
                        clickable: true,
                    },
                    navigation: {
                        nextEl: ".mini-nav",
                        prevEl: ".mini-nav",
                    },
                     autoplay: { 
                        delay: 3000,
                        disableOnInteraction: false
                    },
                });        
        }
        
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

$(document).ready(function () {
    loadCategories();
    loadPlataform();
    loadGames();
    
});
