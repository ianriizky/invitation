import countdown from "./countdown.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import $ from "jquery";
import "oh-snap-notifications";
import "particles.js";
import "slick-carousel";

/** @type {{
 *   date: string;
 * }} */
// eslint-disable-next-line no-undef
const data = viewData;

countdown(new Date(data.date));

$(function () {
  const queryString = window.location;
  const url = new URL(queryString);
  const to = url.searchParams.get("to");

  if (to) {
    $(".mobile-title").html(to);
    $("#nama").val(to);
  }

  $(".instagram-effects").slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  $.ajax({
    // create an ajax request to display.php
    type: "GET",
    url: "./php/display.php",
    dataType: "html", // expect html to be returned
    success: function (response) {
      $(".block-data-doa").append(response);
    },
  });

  $("#submit").css("cursor", "pointer");

  $(document).on("click", "#submit", function (event) {
    event.preventDefault();
    var kehadiran;
    if ($("#hadir").prop("checked")) kehadiran = "hadir";
    if ($("#mungkin-hadir").prop("checked")) kehadiran = "mungkin-hadir";
    if ($("#tidak-hadir").prop("checked")) kehadiran = "tidak-hadir";

    var nama = $("#nama").val();
    var lokasi = $("#lokasi").val();
    var ucapan = $("#ucapan").val();

    if (nama == "") {
      ohSnap("Nama harus diisi", { color: "red" });
    } else if (lokasi == "") {
      ohSnap("Lokasi harus diisi", { color: "red" });
    } else if (!kehadiran) {
      ohSnap("Kehadiran harus diisi", { color: "red" });
    } else if (ucapan == "") {
      ohSnap("Ucapan harus diisi", { color: "red" });
    } else {
      $("#submit").prop("disabled", true);
      $("#submit").addClass("button--loading");

      $.ajax({
        type: "POST",
        url: "./php/insert.php",
        data: {
          nama: $("#nama").val(),
          lokasi: $("#lokasi").val(),
          kehadiran: kehadiran,
          ucapan: $("#ucapan").val(),
          submit: "insert",
        },
        success: function (data) {
          //alert(data.trim());
          if (data == "success") {
            ohSnap("Terima Kasih atas doa dan ucapannya", {
              color: "green",
            });
            $.ajax({
              //create an ajax request to display.php
              type: "GET",
              url: "./php/display.php",
              dataType: "html", //expect html to be returned
              success: function (response) {
                $(".block-data-doa").empty();
                $(".block-data-doa").append(response);
                let scroll_to_bottom = document.getElementById("block-doa");
                scroll_to_bottom.scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });

                $("#nama").val("");
                $("#lokasi").val("");
                $("#ucapan").val("");
                $("#submit").removeClass("button--loading");
              },
            });
          }
          // window.location.reload();
        },
      });
    }
  });

  let mql = window.matchMedia("(min-width: 992px)");
  // console.log(mql)

  if (mql.matches == false) {
    $("#id02").hide();
  } else {
    $("#id02").show();
  }
});

$("#click-date").on("click", function () {
  let linkDate = document.getElementById("date-id");
  linkDate.scrollIntoView();
});

$("#click-love").on("click", function () {
  let linkDate = document.getElementById("love-id");
  linkDate.scrollIntoView();
});

$("#click-maps").on("click", function () {
  let linkDate = document.getElementById("maps-id");
  linkDate.scrollIntoView();
});

$("#click-instagram").on("click", function () {
  let linkDate = document.getElementById("instagram-id");
  linkDate.scrollIntoView();
});

$("#click-doa").on("click", function () {
  let linkDate = document.getElementById("doa-id");
  linkDate.scrollIntoView();
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

$("#okay").on("click", function () {
  $("#id02").hide();
  $(".music-control").show().removeClass("off");
  $(".sound-off").hide();
  $(".sound-on").show();
});

$(".wedding-open").on("click", function () {
  $(".main-title").hide();
  $(".main-img").hide();
  $("#pay").show();
  $(".desktop-bar").show();
  $(".separator").css("position", "absolute");
  $(".mobile-separator").css("visibility", "visible");
  $("#id02").show();
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
    trigger: "#love-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-love", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-love", "active");
    },
    onLeave: function () {
      changeBackground(".icon-love", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-love", "");
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

  ScrollTrigger.create({
    trigger: "#instagram-id",
    scroller: "#mobile-scroll",
    onEnter: function () {
      changeBackground(".icon-instagram", "active");
    },
    onEnterBack: function () {
      changeBackground(".icon-instagram", "active");
    },
    onLeave: function () {
      changeBackground(".icon-instagram", "");
    },
    onLeaveBack: function () {
      changeBackground(".icon-instagram", "");
    },
  });

  ScrollTrigger.create({
    trigger: "#doa-id",
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
