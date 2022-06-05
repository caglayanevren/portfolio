import "./modernizr";
import "../../src/styles/scss/bundle.scss";
import "../css/backgrounds.css";
import "bootstrap";

window.addEventListener("DOMContentLoaded", function () {
    /* let tableResponsive = document.querySelectorAll(".table-responsive");
    tableResponsive.forEach((t) => {
        t.setAttribute("id", "slideTable");
    }); */

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
        if (scrollY > window.innerHeight) {
            navbar.classList.add("scrolled");
            nav.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
            nav.classList.remove("scrolled");
        }
    });

    /* window.console.log(
        "%c▸ FİNAR %c https://www.finarkurumsal.com",
        "background:#00B3E3; color:#333; padding: 5px; line-height:30px; font-weight:bold;",
        "background:#000; color:#00B3E3; padding: 5px; line-height:30px;"
    ); */
    /* navigation scroll background */
    /*     let scrollpos = window.scrollY;
    const header = document.querySelector("nav");
    const header_height = header.offsetHeight;
    const add_class_on_scroll = () => header.classList.add("nav-back");
    const remove_class_on_scroll = () => header.classList.remove("nav-back");
    window.addEventListener("scroll", function () {
        scrollpos = window.scrollY;
        if (scrollpos + 79 >= header_height) {
            add_class_on_scroll();
        } else {
            remove_class_on_scroll();
        }
    }); */
    /* if (window.innerWidth < 768) {
        //navigasyon link section open
        let pageLink = window.location.href;
        let a = [];
        let slug;
        let dropItems = document.querySelectorAll(".dropdown-item");
        a.push(pageLink.split("/"));
        function hasDash(dash) {
            return dash.includes("-");
        }
        a.map((item) => {
            slug = item.filter(hasDash);
        });
        dropItems.forEach((e) => {
            if (e.getAttribute("href").includes(slug)) {
                e.parentNode.classList.add("show");
                e.closest(".dropdown-menu").previousElementSibling.classList.add("show");
                e.closest(".dropdown-menu").previousElementSibling.setAttribute("aria-expanded", "true");
            }
        });
    } */

    /*  if (window.innerWidth >= 992) {
        document.querySelectorAll(".navbar .nav-item").forEach((everyitem) => {
            everyitem.addEventListener("mouseover", function (e) {
                let el_link = this.querySelector("a[data-bs-toggle]");

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.add("show");
                    nextEl.classList.add("show");
                }
            });
            everyitem.addEventListener("mouseleave", function (e) {
                let el_link = this.querySelector("a[data-bs-toggle]");

                if (el_link != null) {
                    let nextEl = el_link.nextElementSibling;
                    el_link.classList.remove("show");
                    nextEl.classList.remove("show");
                }
            });
        });
    } */
});

let width = window.innerWidth;
window.addEventListener("resize", function () {
    let newwidth = window.innerWidth;
    if (width != newwidth) {
        window.location.href = window.location.href;
    }
});
