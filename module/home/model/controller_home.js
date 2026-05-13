function loadCarousel() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCarousel','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
            .addClass("swiper-slide hero-slide")
            .appendTo('#containerCarousel') 
            .attr('data-carou_id', data[row].id_torn)
            .html(`
                <div class="hero-card" style="background-image: linear-gradient(to right, rgba(16, 22, 34, 0.9) 0%, rgba(16, 22, 34, 0.2) 100%), url('${data[row].image_url}');">
                    <div class="hero-content">
                        <div class="hero-badge">
                            <span class="pulse-container">
                                <span class="pulse-ring"></span>
                                <span class="pulse-dot"></span>
                            </span>
                            FEATURED EVENT
                        </div>

                        <h1 class="hero-title">
                            ${data[row].title} <br/>
                            <span class="text-primary">EDICIÓN 2026</span>
                        </h1>

                        <p class="hero-description">
                            Vive la mejor experiencia del torneo. Únete a la competición ahora.
                        </p>

                        <div class="hero-buttons">
                            <button class="btn-main" id="${data[row].id_torn}">
                                <span class="material-symbols-outlined">confirmation_number</span>
                                Ver en vivo
                            </button>
                            <button class="btn-secondary">Ver mas</button>
                        </div>

                    </div>
                </div>
            `);
        }
        new Swiper(".mySwiperCarousel", {

                slidesPerView: 1,
                slidesPerGroup: 1,
                loop: true,
                effect: "fade", // Opcional: añade esto para un efecto pro de desvanecimiento
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: ".btn-next-carou",
                    prevEl: ".btn-prev-carou"
                },
                autoplay: { 
                    delay: 3500,
                    disableOnInteraction: false
                },

                breakpoints: {
                    320: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 1
                    },
                    1024: {
                        slidesPerView: 1
                    }
                }
            });
    }).catch(function() {
        //window.location.href = "index.php?module=ctrl_exceptions&op=503&type=503&lugar=Type_Categories HOME";
    });
}

function loadCategories() {
    //console.log('loadCategories() called');

    ajaxPromise('module/home/controller/controller_home.php?op=homePageCategory','GET', 'JSON')
    .then(function(data) {
        console.log(data);
        for (let row = 0; row < data.length; row++) {
            $("<div/>")
                .addClass("swiper-slide card") 
                .attr('id', data[row].id_category)
                .attr('data-cat_name', data[row].cat_name)
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
                .addClass("swiper-slide user_card card-vertical") 
                .attr('id', data[row].id_platform)
                .attr('data-plataform_name', data[row].platform_name)
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
        new Swiper(".mySwiperPlat", {

                slidesPerView: 3,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                loopedSlides: 5,

                navigation: {
                    nextEl: ".btn-next-plat",
                    prevEl: ".btn-prev-plat"
                },
                autoplay: { 
                    delay: 3000,
                    disableOnInteraction: false
                },

                breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 20
                }
            }
            });
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
                .attr('data-game_name', data[row].game_name)
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
                .attr('data-city_name', data[row].city_name)
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
                .attr('data-type_name', data[row].type_name)
                .html(`
                    <div class="card-vertical-type" id="${data[row].id_type}">
                        <div class="card-img-container-type">
                            <img src="${data[row].type_img}" alt="${data[row].type_name}" class="card-img-type">
                        </div>
                    </div> 
                `);   
        }
         new Swiper(".mySwiperType", {

                slidesPerView: 4,
                spaceBetween: 15,
                slidesPerGroup: 1,
                loop: true,
                centeredSlides: false,

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

function loadPopularEventos() {
    ajaxPromise('module/home/controller/controller_home.php?op=popular_eventos', 'GET', 'JSON')
    .then(function(data) {
        // console.log(data);
        $('#containerPopular').empty();

        for (let row = 0; row < data.length; row++) {
            let images = data[row].tournament_images 
                ? data[row].tournament_images.split(', ') 
                : [];

            $("<div/>")
                .addClass("swiper-slide popular-card")
                .attr('id', data[row].id_torn)
                .appendTo('#containerPopular')
                .html(`
                    <div class="popular-card-img-wrapper">
                        <img src="${images[0] || 'view/img/default.png'}" alt="${data[row].title}" class="popular-card-img">
                        <div class="popular-card-badge">
                            <span class="material-symbols-outlined" style="font-size:0.9rem">trending_up</span>
                            ${data[row].visits} visitas
                        </div>
                    </div>
                    <div class="popular-card-body">
                        <h3 class="popular-card-title">${data[row].title}</h3>
                        <div class="popular-card-info">
                            <span class="material-symbols-outlined" style="font-size:1rem">location_on</span>
                            <span>${data[row].venue_name}, ${data[row].city_name}</span>
                        </div>
                        <div class="popular-card-footer">
                            <span class="popular-card-price">${data[row].price}€</span>
                            <button class="popular-card-btn">Ver evento</button>
                        </div>
                    </div>
                `);
        }

        new Swiper(".mySwiperPopular", {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: false,
            navigation: {
                nextEl: ".btn-next-popular",
                prevEl: ".btn-prev-popular"
            },
            breakpoints: {
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    });
}

function clicks(){

    $(document).on("click",'#containerCategories > div', function (){
      var nameCat = $(this).attr('data-cat_name');

        if (nameCat) {
        var filtros = [];
        
        filtros.push(["cat_name", nameCat]);

        localStorage.removeItem('filtros');
        localStorage.setItem('filtros', JSON.stringify(filtros));

        console.log("Redirigiendo con filtro:", nameCat);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500); 
        }
       
    });

     $(document).on("click",'#containerPlatform > div', function (){
      var nameplat = $(this).attr('data-plataform_name');

        if (nameplat) {
        var filtros = [];
        
        filtros.push(["platform_name", nameplat]);

        localStorage.removeItem('filtros');
        localStorage.setItem('filtros', JSON.stringify(filtros));

        console.log("Redirigiendo con filtro:", nameplat);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500); 
        }
       
    });


    $(document).on("click",'.game-card', function (){
      var nameGame = $(this).attr('data-game_name');

        if (nameGame) {
        var filtros = [];
        
        filtros.push(["game_name", nameGame]);

        localStorage.removeItem('filtros');
        localStorage.setItem('filtros', JSON.stringify(filtros));

        console.log("Redirigiendo con filtro:", nameGame);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500); 
        }
       
    });

    $(document).on("click",'#containerType > div', function (){
      var nameType = $(this).attr('data-type_name');

        if (nameType) {
        var filtros = [];
        
        filtros.push(["type_name", nameType]);

        localStorage.removeItem('filtros');
        localStorage.setItem('filtros', JSON.stringify(filtros));

        console.log("Redirigiendo con filtro:", nameType);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500); 
        }
       
    });

    $(document).on("click",'#containerCities > div', function (){
      var nameCity = $(this).attr('data-city_name');

        if (nameCity) {
        var filtros = [];
        
        filtros.push(["city_name", nameCity]);

        localStorage.removeItem('filtros');
        localStorage.setItem('filtros', JSON.stringify(filtros));

        console.log("Redirigiendo con filtro:", nameCity);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list';
            }, 500); 
        }
       
    });
    
     $(document).on("click",'#containerCarousel > div', function (){
      var id = $(this).attr('data-carou_id');

        if (id) {
            console.log("Redirigiendo con id:", id);

            setTimeout(function () {
                window.location.href = 'index.php?page=controller_shop&op=list&detalle=' + id;
            }, 500); 
        }
       
    });

    $(document).on("click", '#containerPopular > div', function() {
    var id = $(this).attr('id');
    if (id) {
        
        ajaxPromise('module/shop/controller/controller_shop.php?op=update_visits', 'POST', 'JSON', { 'id_torn': id });
        
        setTimeout(function() {
            window.location.href = 'index.php?page=controller_shop&op=list&detalle=' + id;
        }, 300);
    }
});
}

$(document).ready(function () {
    loadCarousel();
    loadCategories();
    loadPlataform();
    loadGames();
    loadCity();
    loadType();
    loadPopularEventos();
    clicks();
    
});
