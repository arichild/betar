$( document ).ready(function() {
  // select2
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
  });

  // splide
  const bransSlider = document.querySelector('.brands-splide')
  const certificateSlider = document.querySelector('.certificate-splide')
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
  const headerMiddle = document.querySelector(".header-sticky");
  const headerTop = document.querySelector(".header-top");
  const headerBottom = document.querySelector(".header-bottom");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {

    if (window.scrollY > lastScrollY) {
      // Скролл вниз
      headerMiddle.classList.add("active");
      if(headerTop && headerBottom) {
        headerTop.classList.add('active')
        headerBottom.classList.add('active')
      }
    } else {
      // Скролл вверх
      headerMiddle.classList.remove("active");
      if(headerTop && headerBottom) {
        headerTop.classList.remove('active')
        headerBottom.classList.remove('active');
      }
    }
  });
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