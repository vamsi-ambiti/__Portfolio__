document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) current = section.getAttribute("id");
        });
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current);
        });
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e){
            const target = document.querySelector(this.getAttribute("href"));
            if(target){
                e.preventDefault();
                target.scrollIntoView({ behavior:"smooth", block:"start" });
            }
        });
    });

    // Desktop-only 3D tilt. Disabled on phones/tablets so cards never jump or overlap.
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (canHover) {
        document.querySelectorAll(".card").forEach(card => {
            card.addEventListener("mousemove", e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 8;
                const rotateX = ((y / rect.height) - 0.5) * -8;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            card.addEventListener("mouseleave", () => {
                card.style.transform = "";
            });
        });
    }

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold:0.15 });
    document.querySelectorAll(".card,.hero-left,.hero-right").forEach(item => observer.observe(item));

    const image = document.querySelector(".image-box");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(image && !reducedMotion && canHover){
        let direction = 1;
        setInterval(() => {
            image.style.transform = `translateY(${direction * 8}px)`;
            direction *= -1;
        }, 2000);
    }

    if (canHover) {
        const glow = document.createElement("div");
        glow.className = "cursor-glow";
        document.body.appendChild(glow);
        window.addEventListener("mousemove", e => {
            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";
        }, { passive:true });
    }

    const text = ["Python Developer", "Full Stack Learner", "MCA Student"];
    const title = document.querySelector(".hero h3");
    if(title && !reducedMotion){
        let i=0, j=0, deleting=false;
        function typing(){
            title.textContent = text[i].substring(0,j);
            if(!deleting){
                j++;
                if(j > text[i].length){ deleting=true; setTimeout(typing,1200); return; }
            } else {
                j--;
                if(j === 0){ deleting=false; i=(i+1)%text.length; }
            }
            setTimeout(typing, deleting ? 50 : 120);
        }
        typing();
    }
});
