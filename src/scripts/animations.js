document.addEventListener("DOMContentLoaded", () => {
    // 🎯 BOUNCE EFFECT PÅ KNAPPAR
    const listItems = document.querySelectorAll(".bounceBtn");

    listItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.transition = "transform 0.2s ease-out";
            item.style.transform = "translateY(-5px)";
        });

        item.addEventListener("mouseleave", () => {
            item.style.transition = "transform 0.3s ease-in";
            item.style.transform = "translateY(0)";
        });
    });

    const containers = document.querySelectorAll(".bounceContainer"); // Target the container class

    containers.forEach(container => {
        container.addEventListener("mouseenter", () => {
            container.style.transition = "transform 0.2s ease-out";
            container.style.transform = "scale(1.05)"; // Slightly bigger
        });

        container.addEventListener("mouseleave", () => {
            container.style.transition = "transform 0.3s ease-in";
            container.style.transform = "scale(1)"; // Back to normal size
        });
    });


    // 🎯 NAVIGATION - LÄGG TILL "ACTIVE" VID KLICK OCH SMOOTH SCROLL
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            const targetId = this.getAttribute("href").substring(1); // Ta bort "#" från id:t
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault(); // Förhindra standardlänkens beteende
                targetSection.scrollIntoView({ behavior: "smooth" }); // 🟢 SMOOTH SCROLLING TILL ALLA SEKTIONSLÄNKAR
                setActiveLink(targetId); // Markera aktuell sektion som aktiv
            }
        });
    });

    // 🎯 BÄTTRE METOD FÖR ATT MARKERA AKTIV SEKTIONSLÄNK VID SCROLL
    const sections = document.querySelectorAll("section");

    const observerOptions = {
        root: null, // Använder viewport som root
        threshold: 0.6, // När 60% av en sektion syns, markeras den som aktiv
    };

    function sectionObserverCallback(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute("id");
                setActiveLink(sectionId);
            }
        });
    }

    const observer = new IntersectionObserver(sectionObserverCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 🟢 FIX: Markera "Home" som aktiv när man är längst upp manuellt
    window.addEventListener("scroll", () => {
        if (window.scrollY < 420) {
            setActiveLink("home");
        }
    });

    // 🟢 SE TILL ATT "HOME" ÄR MARKERAT FRÅN START
    setTimeout(() => {
        setActiveLink("home");
    }, 10);

    // 🎯 Funktion för att markera aktuell länk
    function setActiveLink(sectionId) {
        navLinks.forEach(link => link.classList.remove("active"));
        let activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add("active");
        }
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let currentIndex = 0;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove("active", "prev", "next");

            if (index === currentIndex) {
                item.classList.add("active");
            } else if (index === (currentIndex - 1 + items.length) % items.length) {
                item.classList.add("prev");
            } else if (index === (currentIndex + 1) % items.length) {
                item.classList.add("next");
            }
        });
    }

    prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length; // Go back, loop around
        updateCarousel();
    });

    nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % items.length; // Go forward, loop around
        updateCarousel();
    });

    updateCarousel(); // Initialize first item
});
