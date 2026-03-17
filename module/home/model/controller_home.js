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
                
        }
        new Swiper(".mySwiperCategories", {

                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 1,
                loop: true,

                navigation: {
                    nextEl: ".btn-next-cat",
                    prevEl: ".btn-prev-cat"
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
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 4
                    }
                }
            });
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
        $('#game-card').empty().html(`
            <div class="swiper main-game-swiper">
                <div class="swiper-wrapper" id="main-wrapper"></div>
                <div class="swiper-button-next btn-next-game main-nav"></div>
                <div class="swiper-button-prev btn-prev-game main-nav"></div>
                <div class="swiper-pagination main-pagination"></div>
            </div>
        `);
        for (let row = 0; row < data.length; row++) {
          
            let imagesArray = data[row].all_images ? data[row].all_images.split(',') : ['view/img/default.png'];
            let slidesHTML = imagesArray.map(img => `
                <div class="swiper-slide">
                    <img src="${img}" class="game-card-img" alt="${data[row].game_name}">
                </div>
            `).join('');

            let $currentCard = $("<div/>")
                .addClass("game-card swiper-slide") 
                .attr('id', data[row].id_game) 
                .appendTo('#main-wrapper') 
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
                        <button class="game-card-btn">Mas Información</button>
                    </div>
                `);

                new Swiper($currentCard.find(".inner-game-swiper")[0], {
                nested: true, 
                loop: true,
                // pagination: { el: $currentCard.find(".mini-dots")[0], clickable: true },
                navigation: {
                    nextEl: $currentCard.find(".swiper-button-next")[0],
                    prevEl: $currentCard.find(".swiper-button-prev")[0],
                },
                autoplay: { delay: 2000, disableOnInteraction: false },
            });        
        }
        new Swiper(".main-game-swiper", {
            slidesPerView: 3,
            spaceBetween: 20,
             loop: true,
            navigation: {
                nextEl: ".btn-next-game",
                prevEl: ".btn-prev-game",
            },
            
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            autoplay: { delay: 4000, disableOnInteraction: false },
        });
        
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadCity() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCity','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        $('#containerCities').empty();

        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("swiper-slide") 
                .appendTo('#containerCities') 
                .html(`
                    <div class="city-card" id="${data[row].id_city}">
                        <div class="city-card-img-wrapper">
                            <img src="${data[row].city_img}" alt="${data[row].city_name}" class="city-card-img">
                        </div>
                        <div class="city-card-content">
                            <h3 class="city-card-name">${data[row].city_name}</h3>
                            <p class="city-card-info">${data[row].venue_name}</p>
                            <div class="city-card-footer">
                                <span class="city-card-tag">${data[row].address}</span>
                            </div>
                        </div>
                    </div>
                `);
    
        }
        new Swiper(".mySwiperCity", {

                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,

                navigation: {
                    nextEl: ".btn-next-city",
                    prevEl: ".btn-prev-city"
                },
                autoplay: { 
                    delay: 3000,
                    disableOnInteraction: false
                },

                breakpoints: {
                    320: {slidesPerView: 1},
                    768: {slidesPerView: 2 },
                    1024: {slidesPerView: 3}
                }
            });
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadType() {

    ajaxPromise('module/home/controller/controller_home.php?op=homePageType','GET', 'JSON')
    .then(function(data) {
        console.log(data);

        $('#containerType').empty();

        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("swiper-slide") 
                .appendTo('#containerType')
                .html(`
                    <div class="card-vertical-type" id="${data[row].id_type}">
                        <div class="card-img-container-type">
                            <img src="${data[row].type_img}" alt="${data[row].type_name}" class="card-img-type">
                        </div>
                    </div> 
                `);   
        }
         new Swiper(".mySwiperType", {

                slidesPerView: 3,
                spaceBetween: 20,
                loop: true,

                navigation: {
                    nextEl: ".btn-next-type",
                    prevEl: ".btn-prev-type"
                },
                autoplay: { 
                    delay: 3000,
                    disableOnInteraction: false
                },

                breakpoints: {
                    320: {slidesPerView: 1},
                    768: {slidesPerView: 2 },
                    1024: {slidesPerView: 3}
                }
            });
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

$(document).ready(function () {
    loadCategories();
    loadPlataform();
    loadGames();
    loadCity();
    loadType();
    
});
