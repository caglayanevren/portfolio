import "./modernizr";
import "../../src/styles/scss/bundle.scss";
import "../css/backgrounds.css";
import "bootstrap";

window.addEventListener("DOMContentLoaded", function () {
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

let width = window.innerWidth;
window.addEventListener("resize", function () {
    let newwidth = window.innerWidth;
    if (width != newwidth) {
        window.location.href = window.location.href;
    }
});
