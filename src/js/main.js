import Swiper from "swiper";
import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "./modernizr";
import "../../src/styles/scss/bundle.scss";
import "../css/backgrounds.css";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap";

window.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".swiper", {
        modules: [Navigation, Pagination, Scrollbar, Autoplay],
        // Default parameters
        slidesPerView: 1,
        spaceBetween: 20,
        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 1200px
            1200: {
                slidesPerView: 2,
                spaceBetween: 60,
            },
            // when window width is >= 1440px
            1440: {
                slidesPerView: 2,
                spaceBetween: 100,
            },
        },
        autoplay: {
            enabled: true,
            delay: 3000,
        },
        on: {
            init: function () {
                console.log("swiper initialized");
            },
        },
        pagination: {
            enabled: true,
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
    });

    var myOffcanvas = document.getElementById("navbarsDefault");
    var fa = document.querySelector(".fa-solid");
    myOffcanvas.addEventListener("hidden.bs.offcanvas", function () {
        fa.classList.remove("fa-xmark");
        fa.classList.add("fa-bars");
    });
    myOffcanvas.addEventListener("shown.bs.offcanvas", function () {
        fa.classList.remove("fa-bars");
        fa.classList.add("fa-xmark");
    });
    var nav = document.querySelector("nav");
    var navbar = document.querySelector(".navbar-nav");
    document.addEventListener("scroll", function () {
        if (scrollY > window.innerHeight / 2) {
            navbar.classList.add("scrolled");
            nav.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
            nav.classList.remove("scrolled");
        }
        if (scrollY > window.innerHeight) {
            navbar.classList.add("scrolled2");
            nav.classList.add("scrolled2");
        } else {
            navbar.classList.remove("scrolled2");
            nav.classList.remove("scrolled2");
        }
    });
});

/* let width = window.innerWidth;
window.addEventListener("resize", function () {
    let newwidth = window.innerWidth;
    if (width != newwidth) {
        window.location.href = window.location.href;
    }
}); */
