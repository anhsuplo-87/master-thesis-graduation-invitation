export function createApp() {
    const root = document.createElement("div");
    root.className = "page";

    const base = import.meta.env.BASE_URL;

    // event details used to build "Add to calendar" links for the time hotspot
    const EVENT = {
        title: "Lễ Tốt Nghiệp - Bá Lương",
        location: "Hội trường Nguyễn Văn Đạo, 144 Xuân Thuỷ, Cầu Giấy, Hà Nội",
        details: "Sự hiện diện của bạn là niềm hạnh phúc của tôi. Rất mong bạn có mặt trong buổi lễ tốt nghiệp này.",
        // assumes a 2-hour ceremony starting at the printed time; adjust if the actual end time differs
        startLocal: "20260705T093000",
        endLocal: "20260705T113000",
        startOffset: "2026-07-05T09:30:00+07:00",
        endOffset: "2026-07-05T11:30:00+07:00",
    };

    function buildCalendarLinks() {
        const google =
            "https://calendar.google.com/calendar/render?action=TEMPLATE" +
            `&text=${encodeURIComponent(EVENT.title)}` +
            `&dates=${EVENT.startLocal}/${EVENT.endLocal}` +
            `&details=${encodeURIComponent(EVENT.details)}` +
            `&location=${encodeURIComponent(EVENT.location)}` +
            "&ctz=Asia/Ho_Chi_Minh";

        const outlook =
            "https://outlook.office.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent" +
            `&subject=${encodeURIComponent(EVENT.title)}` +
            `&startdt=${encodeURIComponent(EVENT.startOffset)}` +
            `&enddt=${encodeURIComponent(EVENT.endOffset)}` +
            `&location=${encodeURIComponent(EVENT.location)}` +
            `&body=${encodeURIComponent(EVENT.details)}`;

        return { google, outlook };
    }

    // bounding box (as % of card size) of the visible art for each
    // hoverable/clickable layer, measured from the source PNGs
    const HOTSPOTS = [
        { name: "time", depth: 15, left: 7.6, top: 60.5, width: 84.8, height: 10.6, clickable: true, action: "calendar" },
        { name: "place", depth: 15, left: 7.6, top: 71.9, width: 84.8, height: 13.3, clickable: true, url: "https://maps.app.goo.gl/DykkSuYtAH812LDj8" },
        { name: "contact", depth: 15, left: 7.6, top: 85.9, width: 84.8, height: 10.2, clickable: true, url: "https://www.instagram.com/baluong.87/" },
        { name: "cert", depth: 20, left: 26.4, top: 41.4, width: 59.7, height: 14.8, clickable: false },
        { name: "thesis", depth: 20, left: 11.8, top: 14.1, width: 41.0, height: 27.7, clickable: true, url: "https://drive.google.com/file/d/1Kyrs-VM9R2ixIq7JDuiTPRZQJ5wuVgIa/view?usp=sharing" },
        { name: "laptop", depth: 20, left: 11.1, top: 18.8, width: 77.8, height: 31.2, clickable: false },
    ];

    root.innerHTML = `
    <div class="pack-intro" id="packIntro">
      <div class="pack-idle">
        <div class="pack-bubble" id="packBubble">
          <img class="pack-frame" id="packFrame" src="${base}assets/pack/pack_1.png" alt="" />
        </div>
      </div>
      <p class="pack-hint" id="packHint">CLICK TO OPEN ...</p>
    </div>

    <div class="crt"></div>

    <div class="particles" id="particles"></div>

    <audio id="packSfx" preload="auto">
      <source src="${base}audio/sfx.mp3" type="audio/mpeg" />
    </audio>

    <audio id="bgm" loop preload="auto">
      <source src="${base}audio/bgm.mp3" type="audio/mpeg" />
    </audio>

    <button class="music-toggle" id="musicToggle" type="button" aria-label="Bật/tắt nhạc nền">&#9834;</button>

    <section class="section-card">
      <div class="scene">
        <div class="card-wrapper">

          <div class="idle-float">

              <div class="bubble-wrapper" id="bubble">

                  <div class="card" id="card">

                      <!-- BACK -->
                      <div class="face back">

                          <img
                          src="${base}assets/back/frame.png"
                          class="layer"
                          data-depth="10"
                          />

                          <img
                          src="${base}assets/back/bg.png"
                          class="layer"
                          data-depth="12.5"
                          />

                          <img
                          src="${base}assets/back/detail.png"
                          class="layer"
                          data-depth="15"
                          />

                      </div>

                      <!-- FRONT -->
                      <div class="face front">

                          <img
                          src="${base}assets/front/frame.png"
                          class="layer"
                          data-depth="10"
                          />

                          <img
                          src="${base}assets/front/bg.png"
                          class="layer"
                          data-depth="12.5"
                          />

                          <img
                          src="${base}assets/front/title.png"
                          class="layer"
                          data-depth="15"
                          />

                          <img
                          src="${base}assets/front/time.png"
                          class="layer"
                          data-depth="15"
                          />

                          <img
                          src="${base}assets/front/place.png"
                          class="layer"
                          data-depth="15"
                          />

                          <img
                          src="${base}assets/front/contact.png"
                          class="layer"
                          data-depth="15"
                          />

                          <img
                          src="${base}assets/front/in_bg.png"
                          class="layer"
                          data-depth="17.5"
                          />

                          <img
                          src="${base}assets/front/cert.png"
                          class="layer"
                          data-depth="20"
                          />

                          <img
                          src="${base}assets/front/thesis.png"
                          class="layer"
                          data-depth="20"
                          />

                          <img
                          src="${base}assets/front/laptop.png"
                          class="layer"
                          data-depth="20"
                          />

                          <img
                          src="${base}assets/front/top.png"
                          class="layer"
                          data-depth="20"
                          />

                          ${HOTSPOTS.map(
        (h) => `
                          <img
                          src="${base}assets/front/${h.name}_hover.png"
                          class="layer hover-layer"
                          data-depth="${h.depth}"
                          data-hover-for="${h.name}"
                          />`
    ).join("")}

                          <div class="hotspots">
                              ${HOTSPOTS.map(
        (h) => `
                              <div
                              class="hotspot${h.clickable ? " is-clickable" : ""}"
                              data-target="${h.name}"
                              data-clickable="${h.clickable}"
                              data-action="${h.action ?? ""}"
                              data-url="${h.url ?? ""}"
                              style="left:${h.left}%; top:${h.top}%; width:${h.width}%; height:${h.height}%;"
                              ></div>`
    ).join("")}
                          </div>

                      </div>

                  </div>

              </div>

          </div>
        </div>
      </div>

      <button class="scroll-arrow scroll-arrow--down" id="scrollDown" type="button" aria-label="Cuộn xuống phần thư mời">&#9660;</button>
    </section>

    <div class="calendar-menu" id="calendarMenu">
      <a class="calendar-link" id="calendarGoogle" target="_blank" rel="noopener noreferrer">Google Calendar</a>
      <a class="calendar-link" id="calendarOutlook" target="_blank" rel="noopener noreferrer">Outlook</a>
    </div>

    <section class="section-invite">
      <div class="invite-content">
        <p class="invite-heading">Thư mời &bull; Tham dự</p>
        <h2 class="invite-title">LỄ TỐT NGHIỆP</h2>
        <p class="invite-heading">của</p>
        <h3 class="invite-name">Bá Lương</h3>

        <div class="invite-details">
          <p><strong>Thời gian:</strong> 09h30 &bull; Ngày 05/07/2026</p>
          <p><strong>Địa điểm:</strong> Hội trường Nguyễn Văn Đạo<br />(144 Xuân Thuỷ, Cầu Giấy, Hà Nội)</p>
        </div>

        <p class="invite-message">
          "Sự hiện diện của bạn là niềm hạnh phúc của tôi.<br />
          Rất mong bạn có mặt trong buổi lễ tốt nghiệp này."
        </p>

        <p class="invite-signoff">Thân ái.</p>
      </div>

      <button class="scroll-arrow scroll-arrow--up" id="scrollUp" type="button" aria-label="Cuộn lên phần thẻ mời">&#9650;</button>
    </section>

    <footer class="site-footer">
      <a href="https://github.com/anhsuplo-87" target="_blank" rel="noopener noreferrer">baluong.87</a>
    </footer>
  `;

    const card = root.querySelector("#card");
    const wrapper = root.querySelector(".card-wrapper");
    const bubble = root.querySelector("#bubble");
    const layers = root.querySelectorAll(".layer");
    const particles = root.querySelector("#particles");

    /* =========================
       PACK OPENING INTRO
    ========================= */

    const PACK_PEEL_FRAMES = 6;

    const packIntro = root.querySelector("#packIntro");
    const packFrame = root.querySelector("#packFrame");
    const packBubble = root.querySelector("#packBubble");
    const packHint = root.querySelector("#packHint");
    const packSfx = root.querySelector("#packSfx");

    document.body.classList.add("intro-lock");

    let packStep = 1;
    let packBusy = false;
    let packSfxAvailable = true;

    packSfx.addEventListener(
        "error",
        () => {
            packSfxAvailable = false;
        },
        { once: true }
    );

    function packFrameSrc(n) {
        return `${base}assets/pack/pack_${n}.png`;
    }

    function packHintText(step) {
        if (step <= 1) return "CLICK TO OPEN ...";
        if (step <= 3) return "AGAIN!";
        if (step <= 5) return "KEEP GOING!!";
        return "ALMOST THERE!!!";
    }

    // preload every frame up front so the flicker sequence never stalls waiting on the network
    for (let i = 1; i <= 8; i += 1) {
        new Image().src = packFrameSrc(i);
    }

    function playPackSfx() {
        if (!packSfxAvailable) return;

        packSfx.currentTime = 0;
        packSfx.play().catch(() => { });
    }

    function pressPack() {
        if (packBusy) return;

        packBubble.classList.remove("is-releasing");
        packBubble.classList.add("is-pressed");
    }

    function releasePack() {
        if (!packBubble.classList.contains("is-pressed")) return;

        packBubble.classList.remove("is-pressed");
        void packBubble.offsetWidth;
        packBubble.classList.add("is-releasing");
    }

    packIntro.addEventListener("pointerdown", pressPack);
    packIntro.addEventListener("pointerup", releasePack);
    packIntro.addEventListener("pointercancel", releasePack);
    packIntro.addEventListener("pointerleave", releasePack);

    function wobblePack() {
        const angle = (Math.random() * 2 - 1) * 6; // small random tilt, -6deg..6deg
        packFrame.style.rotate = `${angle.toFixed(2)}deg`;
    }

    function tearFeedback() {
        wobblePack();
        playPackSfx();

        if (navigator.vibrate) navigator.vibrate(40);
    }

    packIntro.addEventListener("click", () => {
        if (packBusy) return;

        if (packStep < PACK_PEEL_FRAMES) {
            packStep += 1;
            packFrame.src = packFrameSrc(packStep);
            packHint.textContent = packHintText(packStep);
            tearFeedback();
            return;
        }

        // last peel frame reached: flicker a few times, then reveal the card
        packBusy = true;
        packHint.style.opacity = "0";
        tearFeedback();

        let flickerCount = 0;
        const totalFlickers = 8;

        const flickerTimer = setInterval(() => {
            packFrame.src = packFrameSrc(flickerCount % 2 === 0 ? 7 : 8);
            flickerCount += 1;

            if (flickerCount >= totalFlickers) {
                clearInterval(flickerTimer);

                // snap to a solid white flash (matches pack_7) before revealing the CRT scene beneath,
                // instead of cross-fading two different textured backgrounds at once
                packIntro.classList.add("is-flash");

                setTimeout(() => {
                    packIntro.classList.add("is-done");
                    document.body.classList.remove("intro-lock");
                    playMusic();

                    setTimeout(() => packIntro.remove(), 800);
                }, 200);
            }
        }, 120);
    });

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

    for (let i = 0; i < 80; i++) {
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
       HOTSPOTS (hover / click layers)
    ========================= */

    const hoverLayers = new Map();

    root.querySelectorAll(".hover-layer").forEach((img) => {
        hoverLayers.set(img.dataset.hoverFor, img);

        img.addEventListener(
            "error",
            () => {
                img.dataset.missing = "true";
            },
            { once: true }
        );
    });

    root.querySelectorAll(".hotspot").forEach((hotspot) => {
        const hoverImg = hoverLayers.get(hotspot.dataset.target);

        hotspot.addEventListener("mouseenter", () => {
            if (hoverImg && hoverImg.dataset.missing !== "true") {
                hoverImg.style.opacity = "1";
            }
        });

        hotspot.addEventListener("mouseleave", () => {
            if (hoverImg) hoverImg.style.opacity = "0";
        });

        if (hotspot.dataset.clickable === "true") {
            hotspot.addEventListener("click", (e) => {
                e.stopPropagation();

                if (hotspot.dataset.action === "calendar") {
                    openCalendarMenu(hotspot);
                    return;
                }

                const url = hotspot.dataset.url;

                if (url && url !== "#") {
                    window.open(url, "_blank", "noopener,noreferrer");
                }
            });
        }
    });

    /* =========================
       ADD TO CALENDAR
    ========================= */

    const calendarMenu = root.querySelector("#calendarMenu");
    const calendarGoogle = root.querySelector("#calendarGoogle");
    const calendarOutlook = root.querySelector("#calendarOutlook");

    const calendarLinks = buildCalendarLinks();
    calendarGoogle.href = calendarLinks.google;
    calendarOutlook.href = calendarLinks.outlook;

    function openCalendarMenu(hotspot) {
        const rect = hotspot.getBoundingClientRect();

        calendarMenu.style.left = `${rect.left + rect.width / 2}px`;
        calendarMenu.style.top = `${rect.bottom + 8}px`;

        calendarMenu.classList.add("is-open");
    }

    function closeCalendarMenu() {
        calendarMenu.classList.remove("is-open");
    }

    document.addEventListener("click", (e) => {
        if (!calendarMenu.contains(e.target)) closeCalendarMenu();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeCalendarMenu();
    });

    calendarMenu.addEventListener("click", (e) => e.stopPropagation());

    /* =========================
       BACKGROUND MUSIC
    ========================= */

    const bgm = root.querySelector("#bgm");
    const musicToggle = root.querySelector("#musicToggle");

    let musicAvailable = true;

    bgm.addEventListener(
        "error",
        () => {
            musicAvailable = false;
            musicToggle.style.display = "none";
        },
        { once: true }
    );

    function playMusic() {
        if (!musicAvailable) return;

        bgm.play()
            .then(() => musicToggle.classList.add("is-playing"))
            .catch(() => { });
    }

    musicToggle.addEventListener("click", (e) => {
        e.stopPropagation();

        if (bgm.paused) {
            playMusic();
        } else {
            bgm.pause();
            musicToggle.classList.remove("is-playing");
        }
    });

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

    function applyParallax(px, py) {
        currentRotateY = px * 10;
        currentRotateX = py * -10;

        updateCardTransform();

        layers.forEach((layer) => {
            const depth = Number(layer.dataset.depth);

            const tx = px * depth;
            const ty = py * depth;

            layer.style.transform = `
      translate(${tx}px, ${ty}px)
    `;
        });
    }

    function resetParallax() {
        applyParallax(0, 0);
    }

    wrapper.addEventListener("mousemove", (e) => {
        const rect = wrapper.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const px = (x / rect.width - 0.5) * 2;
        const py = (y / rect.height - 0.5) * 2;

        applyParallax(px, py);
    });

    wrapper.addEventListener("mouseleave", resetParallax);

    /* =========================
       PARALLAX (mobile tilt)
    ========================= */

    let tiltBaseline = null;

    function handleDeviceOrientation(e) {
        if (e.beta === null || e.gamma === null) return;

        if (!tiltBaseline) {
            tiltBaseline = { beta: e.beta, gamma: e.gamma };
        }

        const clamp = (v, limit) => Math.max(-limit, Math.min(limit, v));

        const px = clamp(e.gamma - tiltBaseline.gamma, 15) / 15;
        const py = clamp(e.beta - tiltBaseline.beta, 15) / 15;

        applyParallax(px, py);
    }

    function enableTilt() {
        window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    let tiltEnabled = false;

    function requestTiltPermission() {
        if (tiltEnabled) return;

        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
            // iOS 13+: must be requested directly inside a user-gesture handler;
            // if the user dismissed the prompt before, keep retrying on every
            // subsequent tap instead of giving up after the very first one
            DeviceOrientationEvent.requestPermission()
                .then((state) => {
                    if (state === "granted") {
                        tiltEnabled = true;
                        enableTilt();
                    }
                })
                .catch(() => { });
        } else if (typeof DeviceOrientationEvent !== "undefined") {
            tiltEnabled = true;
            enableTilt();
        }
    }

    // ask as early as the very first tap (while still tearing open the pack),
    // and keep asking on the card itself in case that first tap didn't grant it
    packIntro.addEventListener("pointerdown", requestTiltPermission);
    wrapper.addEventListener("touchstart", requestTiltPermission);
    wrapper.addEventListener("click", requestTiltPermission);

    /* =========================
       SECTION SCROLL ARROWS + SNAP
    ========================= */

    const scrollDown = root.querySelector("#scrollDown");
    const scrollUp = root.querySelector("#scrollUp");
    const sectionInvite = root.querySelector(".section-invite");
    const sectionCard = root.querySelector(".section-card");
    const siteFooter = root.querySelector(".site-footer");

    const snapTargets = [sectionCard, sectionInvite, siteFooter];

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const SNAP_DURATION = 900; // ms - slower, gentler than the browser's default smooth scroll

    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    let snapAnimationId = null;

    function animateScrollTo(targetY) {
        cancelAnimationFrame(snapAnimationId);

        if (prefersReducedMotion) {
            window.scrollTo(0, targetY);
            return;
        }

        const startY = window.scrollY;
        const distance = targetY - startY;

        if (Math.abs(distance) < 1) return;

        const startTime = performance.now();

        function step(now) {
            const progress = Math.min((now - startTime) / SNAP_DURATION, 1);

            window.scrollTo(0, startY + distance * easeInOutCubic(progress));

            if (progress < 1) {
                snapAnimationId = requestAnimationFrame(step);
            } else {
                snapAnimationId = null;
            }
        }

        snapAnimationId = requestAnimationFrame(step);
    }

    function nearestSnapTarget() {
        return snapTargets.reduce((closest, el) => {
            const dist = Math.abs(el.offsetTop - window.scrollY);
            const closestDist = Math.abs(closest.offsetTop - window.scrollY);
            return dist < closestDist ? el : closest;
        });
    }

    scrollDown.addEventListener("click", () => animateScrollTo(sectionInvite.offsetTop));
    scrollUp.addEventListener("click", () => animateScrollTo(sectionCard.offsetTop));

    // hand control straight back to the user the moment they scroll again,
    // instead of fighting our own in-flight snap animation
    function cancelSnapAnimation() {
        if (snapAnimationId !== null) {
            cancelAnimationFrame(snapAnimationId);
            snapAnimationId = null;
        }
    }

    window.addEventListener("wheel", cancelSnapAnimation, { passive: true });
    window.addEventListener("touchstart", cancelSnapAnimation, { passive: true });

    // custom scroll-snap: replaces the native CSS scroll-snap-type so the
    // settle animation can use a slower, gentler duration/easing than the
    // browser's built-in (and rather abrupt) snap behavior
    let scrollEndTimer = null;

    window.addEventListener(
        "scroll",
        () => {
            if (document.body.classList.contains("intro-lock")) return;
            if (snapAnimationId !== null) return; // don't fight our own animation

            clearTimeout(scrollEndTimer);
            scrollEndTimer = setTimeout(() => {
                animateScrollTo(nearestSnapTarget().offsetTop);
            }, 130);
        },
        { passive: true }
    );

    return root;
}
