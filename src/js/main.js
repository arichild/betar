$( document ).ready(function() {
  // select2
  $location =  $('.ui-select-location').select2({
    minimumResultsForSearch: -1,
    dropdownAutoWidth : true,
    width: 'auto',
  });
  $location.data('select2').$dropdown.addClass('select-location');


  $('.ui-select').select2({
    minimumResultsForSearch: -1,
  });

  $('.ui-select.sort').select2({
    minimumResultsForSearch: -1,
    placeholder: "Сортировать по",
  });

  // popup
  $(document).on("click", ".mfp-link", function () {
    var a = $(this);

    $.magnificPopup.open({
      items: { src: a.attr("data-href") },
      type: "ajax",
      overflowY: "scroll",
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in',
      ajax: {
        tError: "Error. Not valid url",
      },
      callbacks: {
        open: function () {
          setTimeout(function(){
            $('.mfp-wrap').addClass('not_delay');
            $('.mfp-popup').addClass('not_delay');
          },700);
        }
      },

      callbacks: {
        open: function() {
          document.documentElement.style.overflow = 'hidden'
        },

        close: function() {
          document.documentElement.style.overflow = ''
        }
      }
    });
    return false;
  });


  // validate
  $.validator.messages.required = 'Пожалуйста, введите данные';

  jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^([а-яё ]+|[a-z ]+)$/i.test(value);
  }, "Поле может состоять из букв и пробелов, без цифр");

  jQuery.validator.addMethod("phone", function (value, element) {
    if (value.startsWith('+375')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12}(\s*)?$/i.test(value);
    } else if (value.startsWith('+7')) {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/i.test(value);
    } else {
      return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/i.test(value);
    }
  }, "Введите полный номер");



  // imask
  let phone = document.querySelectorAll('.phone-mask')

  if(phone.length) {
    phone.forEach(element => {
      IMask(element, {
        mask: [
          {
            mask: '+{375} (00) 000 00 00',
            startsWith: '375',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+{7} (000) 000 00 00',
            startsWith: '7',
            overwrite: true,
            lazy: false,
            placeholderChar: '_',
          },
          {
            mask: '+0000000000000',
            startsWith: '',
            country: 'unknown'
          }
        ],

        dispatch: function (appended, dynamicMasked) {
          var number = (dynamicMasked.value + appended).replace(/\D/g, '');

          return dynamicMasked.compiledMasks.find(function (m) {
            return number.indexOf(m.startsWith) === 0;
          });
        }
      })
    });
  }

  // burger
  $('.header-middle-burger, .burger .close').on('click', () => {
    $('.burger-wrapper').toggleClass('active')
    $('html').toggleClass('active')
  });

  // filter
  $('.ui-btn.filter, .category-filter-close').on('click', () => {
    $('.category-filter').toggleClass('active')
    $('html').toggleClass('active')
  });

  const moreButton = $(".category-filter-more");
  const items = $(".category-filter-list a");
  const categoryList = $(".category-filter-list");
  moreButton.on("click", function (e) {
    items.each(function (index) {
      if (index >= 7) {
        $(this).toggleClass("hidden")
      }
    });

    categoryList.toggleClass("active");
    moreButton.text(moreButton.text() === "Показать еще" ? "Скрыть" : "Показать еще")
  });

  // search
  const btn = $('.search-icon .close')
  const search = $('.header-middle-search input')

  search.on('input', function() {
    let value = $(this).val()

    if (value === '') {
      btn.removeClass('active')
    } else {
      btn.addClass('active')
    }
  });

  btn.on('click', (e) => {
    e.preventDefault();

    search.val('')

    if (search.val() === '') {
      btn.removeClass('active')
    } else {
      btn.addClass('active')
    }
  });

  // splide
  const bransSlider = document.querySelector('.brands-splide')
  const certificateSlider = document.querySelector('.certificate-splide')
  const newsSlider = document.querySelector('.news-splide')
  const catalogSlider = document.querySelectorAll('.catalog-splide')
  const mainSlider = document.querySelector('.main-splide')

  if(bransSlider) {
    new Splide( '.brands-splide', {
      arrows: false,
      pagination: false,
      gap: 20,
      perPage: 3,
      drag   : 'free',
      type: 'loop',
      autoScroll: {
        speed: 1,
        pauseOnFocus: false
      },

      breakpoints: {
        1024: {
          perPage: 2,
          gap: 10,
        },
        576: {
          perPage: 1,
        },
      }
    }).mount(window.splide.Extensions);
  }

  if(certificateSlider) {
    new Splide(certificateSlider).mount();
  }

  if(catalogSlider) {
    catalogSlider.forEach(el => {
      new Splide(el, {
        perPage: 4,
        gap: 20,

        breakpoints: {
          1200: {
            perPage: 3,
            // gap: 10,
          },
          1024: {
            gap: 10,
          },
          768: {
            perPage: 2,
            arrows: false
          },
          576: {
            destroy: true,
          },
        }
      }).mount();
    })
  }

  if(newsSlider) {
    new Splide(newsSlider, {
      perPage: 3,
      gap: 20,
      arrows: false,

      breakpoints: {
        1024: {
          gap: 10,
          perPage: 2,
        },
        768: {
          perPage: 1,
        },
        576: {
          destroy: true,
        },
      }
    }).mount();
  }

  if(mainSlider) {
    new Splide(mainSlider, {
      perPage: 1,
      autoplay: true,
      type: 'loop',
      interval: 4500,
    }).mount();
  }

  // faq details
  const faqBtns = document.querySelectorAll('.faq-summary')

  faqBtns.forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = e.target.closest('.faq-details')

      parent.classList.toggle('active')
    })
  })


  // video
  function setupVideoPlayer() {
    const playPauseButton = document.querySelectorAll('.play');
    const videoPlayers = document.querySelectorAll('.info-video');

    if (window.innerWidth > 1024) {
      videoPlayers.forEach(item => {
        const video = item.querySelector('video');

        video.addEventListener('play', () => {
          const btn = item.querySelector('.info-video-control')
          btn.classList.add('active')

          video.setAttribute("controls","controls")
        });
        video.addEventListener('pause', () => {
          const btn = item.querySelector('.info-video-control')
          btn.classList.remove('active')

          video.removeAttribute("controls")
        });
      });

      playPauseButton.forEach(item => {
        const parent = item.closest('.info-video');
        const video = parent.querySelector('video');
        const control = item.closest('.info-video-control')

        item.addEventListener('click', () => {
          if (video.paused) {
            video.play();
            video.setAttribute("controls","controls")

            control.classList.add('active');
          } else {
            video.pause();
            video.removeAttribute("controls")

            control.classList.remove('active');
          }

          video.addEventListener('ended', () => {
            video.load();
            video.removeAttribute("controls")

            control.classList.remove('active');
          }, false);
        });
      });
    } else {
      videoPlayers.forEach(item => {
        const btn = item.querySelector('.info-video-control');
        const video = item.querySelector('video');

        // Добавляем обработчики событий только один раз
        video.addEventListener('play', () => {
          btn.classList.add('active');
          video.setAttribute("controls", "controls");
        });

        video.addEventListener('pause', () => {
          btn.classList.remove('active');
          video.removeAttribute("controls");
        });

        item.addEventListener('click', () => {
          // Включаем/выключаем видео по состоянию
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
        });
      });
    }
  }

  setupVideoPlayer()

  let originalParent, nextSibling
  function resizeElement() {
    const element = document.querySelector(".info-statistics");
    const childElement = document.querySelector('.info-certificate-left');

    if(element) {
      if (window.innerWidth <= 576.99) {
        if (!originalParent) {
          originalParent = element.parentNode
          nextSibling = element.nextSibling
        }
        childElement.append(element)
      } else {
        if (originalParent) {
          originalParent.insertBefore(element, nextSibling)
        }
      }
    }
  }

  window.addEventListener("load", resizeElement)
  window.addEventListener("resize", resizeElement)

  // more cards
  const btnShowMore = document.querySelectorAll('.show-more')
  btnShowMore.forEach(el => {
    el.addEventListener('click', (e) => {
      const parent = e.target.closest('.show-list')
      const cards = parent.querySelectorAll('.splide__slide')
      const hiddenCards = parent.querySelectorAll('.splide__slide.hidden')

      if (hiddenCards.length > 0) {
        hiddenCards.forEach((card, index) => {
          if (index < 4) card.classList.remove('hidden')
        })

        if (parent.querySelectorAll('.splide__slide.hidden').length === 0) {
          e.target.textContent = 'Скрыть'
        }
      } else {
        cards.forEach((card, index) => {
          if (index >= 4) card.classList.add('hidden')
        })
        e.target.textContent = 'Показать ещё'
      }
    })
  })

  // fav more cards
  // const btnShowFav = document.querySelectorAll('.show-fav')

  // if(btnShowFav.length) {
  //   btnShowFav.forEach(el => {
  //     el.addEventListener('click', (e) => {
  //       const parent = e.target.closest('.show-list')
  //       const cards = parent.querySelectorAll('.ui-card')
  //       const hiddenCards = parent.querySelectorAll('.show-list .hidden')

  //       if (hiddenCards.length > 0) {
  //         hiddenCards.forEach((card, index) => {
  //           if (index < 16) card.classList.remove('hidden')
  //         })

  //         if (parent.querySelectorAll('.show-list .hidden').length === 0) {
  //           e.target.textContent = 'Скрыть'
  //         }
  //       } else {
  //         cards.forEach((card, index) => {
  //           if (index >= 16) card.parentElement.classList.add('hidden')
  //         })
  //         e.target.textContent = 'Показать ещё'
  //       }
  //     })
  //   })
  // }

  // header sticky
  const header = document.querySelector(".header")
  const headerMiddle = document.querySelector(".header-sticky")
  const headerTop = document.querySelector(".header-top")
  const headerBottom = document.querySelector(".header-bottom")
  const body = document.body
  let lastScrollY = window.scrollY;
  let headerHeight;

  function getHeightHeader() {
    headerHeight = header.offsetHeight;
  }

  getHeightHeader();
  window.addEventListener("resize", getHeightHeader);

  window.addEventListener("scroll", function () {
    if (window.scrollY > lastScrollY) {
      headerMiddle.classList.add("active")

      body.style.paddingTop = "92px"
      if(headerTop && headerBottom) {
        headerTop.classList.add('active')
        headerBottom.classList.add('active')

        body.style.paddingTop = headerHeight + 'px'
      }
    } else {
      headerMiddle.classList.remove("active")

      if(headerTop && headerBottom) {
        headerTop.classList.remove('active')
        headerBottom.classList.remove('active')
      }

      body.style.paddingTop = "0px"
    }
  });

  // function resizeCatalogMenu() {
  //   const screenWidth = window.innerWidth
  //   if (screenWidth >= 1600) return

  //   const menu = document.querySelector('.menu');
  //   const btnCatalog = document.querySelector('.header-middle-catalog')

  //   const left = btnCatalog.getBoundingClientRect().left

  //   const maxWidth = 1174
  //   const newWidth = Math.min(screenWidth - left, maxWidth)
  //   menu.style.width = (newWidth - 10) + 'px'
  // }

  // window.addEventListener('resize', resizeCatalogMenu)
  // resizeCatalogMenu()

  // menu
  const categories = document.querySelectorAll('.menu-category');
  const menu = document.querySelector('.menu');

  $(document).on('click', function (e) {
    const $menu = $('.menu')
    const $submenu = $('.menu-submenu')
    const $catalog = $('.header-middle-catalog')

    if (
      !$menu.is(e.target) && $menu.has(e.target).length === 0 &&
      !$submenu.is(e.target) && $submenu.has(e.target).length === 0 &&
      !$catalog.is(e.target) && $catalog.has(e.target).length === 0
    ) {
      $menu.removeClass('open');
    }
  });

  $('.header-middle-catalog').on('click', () => {
    $('.menu').toggleClass('open')
    // $('html').toggleClass('active')
  });

  function menuCategory () {
    categories.forEach(cat => {
      const hasSubmenu = cat.querySelector('.menu-submenu');
      const btn = cat.querySelector('.menu-category-btn')
      const screenWidth = window.innerWidth

      if (screenWidth <= 1024) {
        btn.addEventListener('click', () => {
          const isSameMenu = hasSubmenu.classList.contains('active');

          // Закрыть всё
          document.querySelectorAll('.menu-submenu.active').forEach(sub => sub.classList.remove('active'));
          menu.classList.remove('active')

          if (!isSameMenu && hasSubmenu) {
            // Открыть только текущее
            menu.classList.add('active');
            hasSubmenu.classList.add('active');
          }
        })
      } else {
        cat.addEventListener('mouseenter', () => {
          document.querySelectorAll('.menu-submenu.hovered').forEach(sub => sub.classList.remove('hovered'));


          if(hasSubmenu) {
            menu.classList.add('hovered')
            hasSubmenu.classList.add('hovered')
          }

          if(!hasSubmenu) {
            menu.classList.remove('hovered')
          }
        });

        // cat.addEventListener('mouseleave', () => {
        //   // hasSubmenu.classList.contains('hovered')
        //   console.log(cat)

        // });

        menu.addEventListener('mouseleave', () => {
          menu.classList.remove('hovered')

          // if(hasSubmenu) {
          //   hasSubmenu.classList.remove('hovered')
          // }
          document.querySelectorAll('.menu-submenu.hovered').forEach(sub => sub.classList.remove('hovered'));
        });
      }
    });
  }

  window.addEventListener('resize', menuCategory)
  menuCategory()


  // clipboard
  const button = document.querySelectorAll('.copy');

  if(button.length) {
    button.forEach(item => {
      item.addEventListener('click', (e) => {
        const parent = e.target.closest('.clipboard')
        const copyText = parent.querySelector('span').textContent

        navigator.clipboard.writeText(copyText);
      })
    })
  }
})

function showPopup() {
  $.magnificPopup.open({
    items: { src: './popup/ok.html' },
    type: 'ajax',
    overflowY: 'scroll',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in',
    ajax: {
      tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
    },
    callbacks: {
      open: function () {
        setTimeout(function () {
          $('.mfp-wrap').addClass('not_delay');
          $('.white-popup').addClass('not_delay');
        }, 700);
      }
    }
  });
}