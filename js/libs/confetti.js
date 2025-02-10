/**
 * @returns {any}
 */
const heartShape = () => {
    return window.confetti.shapeFromPath({
        path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
        matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
    });
};

/**
 * @returns {void}
 */
export const basicAnimation = () => {
    window.confetti({
        origin: { y: 1 },
        zIndex: 1057
    });
};

/**
 * @param {number} [until=15]
 * @returns {void}
 */
export const openAnimation = (userStatus = true) => {
    const heart = heartShape();
    const colors = ['#FFC0CB', '#FF1493', '#C71585'];

    const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
    };

    if (userStatus) {  // Pastikan animasi hanya berjalan jika status pengguna aktif
        (function frame() {
            colors.forEach((color) => {
                window.confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: 100,  // Menambah waktu agar partikel turun lebih lama
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random()),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.3, 0.3),  // Mengurangi drift agar turun lebih stabil
                    gravity: randomInRange(0.2, 0.4),  // Gravitasi lebih kecil untuk gerakan lebih halus
                    scalar: randomInRange(0.5, 1),
                });
            });

            requestAnimationFrame(frame);  // Memanggil frame secara terus-menerus
        })();
    } else {
        // console.log('Pengguna tidak aktif. Animasi dihentikan.');
    }
};




/**
* @param {HTMLElement} div
* @returns {void}
*/
export const tapTapAnimation = (div) => {
    if (!window.confetti) {
        return;
    }

    const end = Date.now() + 25;
    const yPosition = Math.max(0.3, Math.min(1, (div.getBoundingClientRect().top / window.innerHeight) + 0.2));

    const heart = heartShape();
    const colors = ['#FF69B4', '#FF1493'];

    (function frame() {
        colors.forEach((color) => {
            window.confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                shapes: [heart],
                origin: { x: 0, y: yPosition },
                zIndex: 1057,
                colors: [color]
            });
            window.confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                shapes: [heart],
                origin: { x: 1, y: yPosition },
                zIndex: 1057,
                colors: [color]
            });
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
};
