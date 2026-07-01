export function createApp() {
    const root = document.createElement("div");
    root.className = "page";

    root.innerHTML = `
    <div class="crt"></div>

    <div class="particles" id="particles"></div>

    <div class="scene">
      <div class="card-wrapper">

        <div class="idle-float">

            <div class="bubble-wrapper" id="bubble">

                <div class="card" id="card">

                    <!-- BACK -->
                    <div class="face back">

                        <img
                        src="${import.meta.env.BASE_URL}assets/back/frame.png"
                        class="layer"
                        data-depth="10"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/back/bg.png"
                        class="layer"
                        data-depth="12.5"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/back/detail.png"
                        class="layer"
                        data-depth="15"
                        />            

                    </div>

                    <!-- FRONT -->
                    <div class="face front">

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/frame.png"
                        class="layer"
                        data-depth="10"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/bg.png"
                        class="layer"
                        data-depth="12.5"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/title.png"
                        class="layer"
                        data-depth="15"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/time.png"
                        class="layer"
                        data-depth="15"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/place.png"
                        class="layer"
                        data-depth="15"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/contact.png"
                        class="layer"
                        data-depth="15"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/in_bg.png"
                        class="layer"
                        data-depth="17.5"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/cert.png"
                        class="layer"
                        data-depth="20"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/thesis.png"
                        class="layer"
                        data-depth="20"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/laptop.png"
                        class="layer"
                        data-depth="20"
                        />

                        <img
                        src="${import.meta.env.BASE_URL}assets/front/top.png"
                        class="layer"
                        data-depth="20"
                        />

                    </div>

                </div>
            
            </div>

        </div>
      </div>
    </div>
  `;

    const card = root.querySelector("#card");
    const wrapper = root.querySelector(".card-wrapper");
    const bubble = root.querySelector("#bubble");
    const layers = root.querySelectorAll(".layer");
    const particles = root.querySelector("#particles");

    let flipped = false;

    let currentRotateX = 0;
    let currentRotateY = 0;

    function updateCardTransform() {
        card.style.transform = `
    rotateY(${currentRotateY + (flipped ? 180 : 0)}deg)
    rotateX(${currentRotateX}deg)
  `;
    }

    /* ========================= 
        PIXEL PARTICLES 
    ========================= */

    for (let i = 0; i < 45; i++) {
        const p = document.createElement("div");

        p.className = "pixel-particle";

        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;

        p.style.animationDuration = ` ${6 + Math.random() * 10}s `;

        p.style.animationDelay = ` ${Math.random() * 8}s `;

        p.style.opacity = 0.2 + Math.random() * 0.5;

        particles.appendChild(p);
    }

    /* =========================
       CLICK/FLIP
    ========================= */

    wrapper.addEventListener("click", () => {
        flipped = !flipped;
        updateCardTransform(); // bubble effect
        bubble.classList.remove("bubble");
        void bubble.offsetWidth;
        bubble.classList.add("bubble");
    });

    /* =========================
       PARALLAX
    ========================= */

    wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = (x / rect.width - 0.5) * 2;
        const py = (y / rect.height - 0.5) * 2;

        currentRotateY = px * 10;
        currentRotateX = py * -10;

        updateCardTransform();

        // layers
        layers.forEach((layer) => {
            const depth = Number(layer.dataset.depth);

            const tx = px * depth;
            const ty = py * depth;

            layer.style.transform = `
      translate(${tx}px, ${ty}px)
    `;
        });
    });

    wrapper.addEventListener("mouseleave", () => {
        currentRotateX = 0;
        currentRotateY = 0;

        updateCardTransform();

        layers.forEach((layer) => {
            layer.style.transform = `translate(0px, 0px)`;
        });
    });

    return root;
}
