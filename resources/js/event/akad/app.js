import countdown from "../../countdown.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import "particles.js";
import "select2";
import "slick-carousel";

/** @type {import("../../../../app/http/presenters/EventPresenter.js").ViewData} */
// eslint-disable-next-line no-undef
const data = viewData;

countdown(new Date(data.date));

$(function () {
  $(".instagram-effects").slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $.ajax({
    type: "GET",
    url: data.message_url.display,
    dataType: "html",
    success: function (response) {
      $(".block-data-message").append(response);
    },
  });

  $(".bank-title").on("click", function (event) {
    navigator.clipboard.writeText(event.currentTarget.textContent);
    // eslint-disable-next-line no-undef
    ohSnap("Tersalin.", {
      color: "green",
      "container-id": $(event.currentTarget).attr("data-target"),
      duration: 2000,
      "fade-duration": 500,
    });
  });

  $("#submit").css("cursor", "pointer");

  $(document).on("click", "#submit", function (event) {
    event.preventDefault();

    let presence_status;
    if ($("#hadir").prop("checked")) presence_status = "yes";
    if ($("#mungkin-hadir").prop("checked")) presence_status = "maybe";
    if ($("#tidak-hadir").prop("checked")) presence_status = "no";

    const content = $("#ucapan").val();

    /* eslint-disable no-undef */
    if (!presence_status) {
      ohSnap("Kehadiran harus diisi.", { color: "yellow" });
    } else if (content == "") {
      ohSnap("Ucapan harus diisi.", { color: "yellow" });
    } else {
      $("#submit").prop("disabled", true);
      $("#submit").addClass("button--loading");

      $.ajax({
        type: "POST",
        url: data.message_url.insert,
        headers: {
          "CSRF-Token": $('meta[name="csrf-token"]').attr("value"),
        },
        data: { presence_status, content },
        dataType: "json",
        // eslint-disable-next-line no-unused-vars
        success: function (responseData, textStatus, jqXHR) {
          ohSnap(responseData.message, {
            color: responseData.color,
          });

          $.ajax({
            type: "GET",
            url: data.message_url.display,
            dataType: "html",
            success: function (response) {
              $(".block-data-message").empty();
              $(".block-data-message").append(response);
              let scroll_to_bottom = document.getElementById("block-message");
              scroll_to_bottom.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest",
              });

              $("#ucapan").val("");
            },
          });
        },
        // eslint-disable-next-line no-unused-vars
        error: function (jqXHR, textStatus, errorThrown) {
          ohSnap("Maaf, telah terjadi kesalahan teknis.", {
            color: "red",
          });
        },
        complete() {
          $("#submit").removeClass("button--loading");
          $("#submit").prop("disabled", false);
        },
      });
    }
    /* eslint-enable */
  });

  let mql = window.matchMedia("(min-width: 992px)");

  if (mql.matches == false) {
    $("#id02").hide();
  } else {
    $("#id02").show();
  }

  $(".select2").select2();
});

$("#quran-button").on("click", function () {
  document.getElementById("quran-id").scrollIntoView();
});

$("#date-button").on("click", function () {
  document.getElementById("date-id").scrollIntoView();
});

$("#bride-button").on("click", function () {
  document.getElementById("bride-id").scrollIntoView();
});

$(".maps-button").on("click", function () {
  document.getElementById("maps-id").scrollIntoView();
});

$("#instagram-button").on("click", function () {
  document.getElementById("instagram-id").scrollIntoView();
});

$("#gift-button").on("click", function () {
  document.getElementById("gift-id").scrollIntoView();
});

$("#message-button").on("click", function () {
  document.getElementById("message-id").scrollIntoView();
});

$("#pay").on("click", function () {
  $("#id01").fadeIn("slow");
  gsap.from(".aniModal", {
    scale: 0,
    duration: 1.25,
    opacity: 0,
    ease: "circ.inOut",
  });
});

$("#close-01").on("click", function () {
  $("#id01").fadeOut("slow");
});

$(".gift-button-open").on("click", function (event) {
  $(`#${$(event.currentTarget).attr("data-target")}`).fadeIn("slow");
  gsap.from(".aniModal", {
    scale: 0,
    duration: 1.25,
    opacity: 0,
    ease: "circ.inOut",
  });
});

$(".gift-button-close").on("click", function (event) {
  $(`#${$(event.currentTarget).attr("data-target")}`).fadeOut("slow");
});

$("#okay").on("click", function () {
  $("#id02").hide();
});

$(".wedding-open").on("click", function () {
  $(".main-title").fadeOut("slow");
  $(".main-img").fadeOut("slow");
  $("#pay").show();
  $(".desktop-bar").show();
  $(".separator").css("position", "absolute");
  $(".mobile-separator").css("visibility", "visible");
});

gsap.from(".animated-title", {
  delay: 0.3,
  scale: 0,
  duration: 1.25,
  opacity: 0,
  ease: "circ.inOut",
});

// WITH Timelines (cleaner, more versatile)
var tl = gsap.timeline({ repeat: -1 });
tl.to(".wedding-open", { autoAlpha: 1, duration: 1 }),
  tl.to(".wedding-open", { autoAlpha: 0, duration: 1 }),
  tl.to(".wedding-open", { autoAlpha: 1, duration: 1 }),
  tl.to(".wedding-open", { autoAlpha: 0, duration: 1 });

function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
    y = direction * 100;
  if (elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(
    elem,
    { x: x, y: y, autoAlpha: 0 },
    {
      duration: 2.75,
      x: 0,
      y: 0,
      autoAlpha: 1,
      ease: "expo",
      overwrite: "auto",
    },
  );
}

function hide(elem) {
  gsap.set(elem, { autoAlpha: 0 });
}

async function changeBackground(elemId, activeClass) {
  $(elemId).removeClass("active").addClass(activeClass);
}

document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
    hide(elem); // assure that the element is hidden when scrolled into view

    ScrollTrigger.create({
      trigger: elem,
      scroller: "#mobile-scroll",
      onEnter: function () {
        animateFrom(elem);
      },
      onEnterBack: function () {
        animateFrom(elem, -1);
      },
      onLeave: function () {
        hide(elem);
      }, // assure that the element is hidden when scrolled into view
    });
  });

  ScrollTrigger.create({
    trigger: "#date-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-date", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-date", "active");
    },
    onLeave: function () {
      changeBackground(".icon-date", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-date", "");
    },
  });

  ScrollTrigger.create({
    trigger: "#bride-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-bride", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-bride", "active");
    },
    onLeave: function () {
      changeBackground(".icon-bride", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-bride", "");
    },
  });

  ScrollTrigger.create({
    trigger: "#maps-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-location", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-location", "active");
    },
    onLeave: function () {
      changeBackground(".icon-location", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-location", "");
    },
  });

  // ScrollTrigger.create({
  //   trigger: "#instagram-id",
  //   scroller: "#mobile-scroll",
  //   onEnter: function () {
  //     changeBackground(".icon-instagram", "active");
  //   },
  //   onEnterBack: function () {
  //     changeBackground(".icon-instagram", "active");
  //   },
  //   onLeave: function () {
  //     changeBackground(".icon-instagram", "");
  //   },
  //   onLeaveBack: function () {
  //     changeBackground(".icon-instagram", "");
  //   },
  // });

  ScrollTrigger.create({
    trigger: "#gift-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-gift", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-gift", "active");
    },
    onLeave: function () {
      changeBackground(".icon-gift", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-gift", "");
    },
  });

  ScrollTrigger.create({
    trigger: "#message-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-message", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-message", "active");
    },
    onLeave: function () {
      changeBackground(".icon-message", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-message", "");
    },
  });
});

// eslint-disable-next-line no-undef
particlesJS("particles-js", {
  particles: {
    number: { value: 160, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 1,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 600 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "bubble" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: {
        distance: 250,
        size: 0,
        duration: 2,
        opacity: 0,
        speed: 3,
      },
      repulse: { distance: 400, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
