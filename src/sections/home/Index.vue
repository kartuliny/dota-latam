<script setup lang="ts">
import dotaWallpaper from '@/assets/images/dota-wallpaper-2.jpg';
import Footer from './Footer.vue';

interface BoosterItem {
    name: string;
    username: string;
    mmr: number;
    stars: number;
    avatar: string;
}

const boosters: BoosterItem[] = [
    {
        name: 'Everyone',
        username: 'everyone',
        mmr: 7800,
        stars: 5,
        avatar: "/images/booster_everyone.webp",
    },
    {
        name: 'Jhairsito',
        username: 'jhairsito',
        mmr: 10000,
        stars: 5,
        avatar: "/images/booster_jhairsito.webp",
    },
    {
        name: 'Luxus',
        username: 'luxus',
        mmr: 11000,
        stars: 5,
        avatar: "/images/booster_luxus.webp",
    },
    {
        name: 'Isoka',
        username: 'isoka',
        mmr: 7200,
        stars: 5,
        avatar: "/images/booster_isoka.webp",
    },
    {
        name: 'Novice',
        username: 'novice',
        mmr: 10000,
        stars: 5,
        avatar: "/images/booster_novice.webp",
    },
    {
        name: 'M i n n a',
        username: 'minna',
        mmr: 10000,
        stars: 5,
        avatar: "/images/booster_minna.webp",
    },
    {
        name: 'Bored',
        username: 'bored',
        mmr: 7700,
        stars: 5,
        avatar: "/images/booster_bored.webp",
    },
    {
        name: 'Cris',
        username: 'cris',
        mmr: 10700,
        stars: 5,
        avatar: "/images/booster_cris.webp",
    },
    {
        name: 'Henryrls',
        username: 'henryrls',
        mmr: 8500,
        stars: 5,
        avatar: "/images/booster_henryrls.webp",
    },
    {
        name: 'BernaBerna',
        username: 'bernaberna',
        mmr: 12400,
        stars: 5,
        avatar: "/images/booster_bernaberna.webp",
    },
]

</script>

<template>
    <div class="home">
        <nav class="front-page section red mh-80">
            <div :style="{ backgroundImage: 'url(' + dotaWallpaper + ')' }" class="dota-wallpaper-1"></div>
            <div class="gradient-bottom"></div>
            <img class="dota-profile-1" src="@/assets/images/roshan.webp" alt="dota-1" style="display: none;">
            <section class="section pt-48 w-10/12 text-center lg:text-left">
                <div class="d-flex align-center justify-center lg:justify-start">
                    <a href="https://discord.gg/dota-2-oficial" target="_blank">
                        <img src="@/assets/images/discord-white.webp" width="24" alt="Discord">
                    </a>
                    <img class="ml-20" src="@/assets/images/facebook-white.webp" width="24" alt="Discord">
                </div>

                <h1 class="text-rojo-latam my-16">Dota 2 Latam</h1>
                <h1 class="lh-1 fs-2 mb-10">Eleva tu experiencia a otro nivel</h1>
                <hr class="mb-32 w-10 d-inline-block mx-auto lg:ml-0">
                </hr>
                <!-- <img src="@/assets/images/discord.png" width="36" alt="Discord"> -->
                <!-- <a class="ml-10" href="https://discord.gg/dota-2-oficial" target="_blank"><h4>Discord</h4></a> -->

                <div class="d-flex md: align-center md:justify-center md:d-flex mb-40 lg:w-1/2">
                    <div class="d-block text-center py-4 px-4 border-radius-10 border-morado-latam w-1/2 mr-10">
                        <img class="d-block mx-auto object-fit-contain" src="@/assets/images/discord-partner.png" alt="partner" width="25">
                        <span class="fs-6 text-center">Discord Partner</span>
                    </div>

                    <div
                        class="d-block text-center py-4 px-4 border-radius-10 border-amarillo-latam w-1/2">
                        <span class="d-block fs-4 text-amarillo-latam lh-1 pt-4" style="height: 25px;">+17 000</span>
                        <span class="fs-6">Miembros</span>
                    </div>
                </div>

                <div class="d-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-40">
                    <div class="gaming-card purple w-full">
                        <img src="@/assets/images/tesoro-cache-1.png" alt="tesoro-cache">
                        <div class="title text-left">Set Caché</div>
                        <div class="button">Pronto</div>
                    </div>
                    <div class="gaming-card red w-full">
                        <img src="@/assets/images/tauro.png" alt="tauro">
                        <div class="title text-left">Intermediario</div>
                        <div class="button">Pronto</div>
                    </div>
                </div>
            </section>
        </nav>
        <section class="section mh-50">
            <h2 class="text-center mb-16">Boosters</h2>
            <hr class="hr-small mb-32 w-5 d-inline-block">
            <!-- <p class="fs-3 text-center mb-32">Te ofrecemos confianza y profesionalismo de la mano de nuestros Boosters Inmortals, capacitados para mejorar tu MMR, KDA y maestría, en el mejor tiempo, precio y calidad ✨</p> -->

            <div class="d-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 mb-40 w-10/12 mx-auto mt-20">
                <div class="card" v-for="booster in boosters">
                    <div class="avatar"><img :src="booster.avatar" alt="Profile 1" width="60"></div>
                    <div class="info">
                        <div class="mb-4 d-flex align-center justify-center">
                            <h5 class="text-comun">{{ booster.name }}</h5>
                            <img class="ml-10" src="@/assets/images/inmortal.webp" width="30" alt="inmortal">
                        </div>
                        <div class="bg-inmortal border-radius-10 width-max-content mx-auto">
                            <span class="fs-6 text-blanco-latam px-20">{{ booster.mmr }} MMR</span>
                        </div>
                        <!-- <div class="d-flex align-center justify-center">
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
        <section class="section mh-70 w-10/12">
            <h2 class="text-center mb-16">Experiencia</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">

            <div class="d-block mt-20 text-center">
                <div>
                    <img class="text-center" src="@/assets/images/tiny.png" alt="tiny" width="150px">
                </div>
                <div class="lh-2">
                    <h4 class="mb-40">¿Cómo funciona la <span
                            class="fs-1 bold text-rojo-latam-light text-shadow-rojo-latam">Experiencia</span>?</h4>

                    <div class="d-flex mb-12 text-justify">
                        <span style="width: 20px; height: 20px;"
                            class="d-flex fs-6 mr-20 bold justify-center align-center border-radius-50-percent bg-rojo-latam-light text-blanco">1</span>
                        <h5>Trata de subir experiencia de muchas maneras</h5>
                    </div>
                    <div class="d-flex mb-12 text-justify">
                        <span style="width: 20px; height: 20px;"
                            class="d-flex fs-6 mr-20 bold justify-center align-center border-radius-50-percent bg-rojo-latam-light text-blanco">2</span>
                        <h5>Realizando desafíos diariamente: <span class="fs-5 bold">+100M</span> <span
                                class="fs-5 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-12 text-justify">
                        <span style="width: 20px; height: 20px;"
                            class="d-flex fs-6 mr-20 bold justify-center align-center border-radius-50-percent bg-rojo-latam-light text-blanco">3</span>
                        <h5>Comparte pantalla de tu juego en el Discord: <span class="fs-5 bold">200M</span> <span
                                class="fs-5 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-12 text-justify">
                        <span style="width: 20px; height: 20px;"
                            class="d-flex fs-6 mr-20 bold justify-center align-center border-radius-50-percent bg-rojo-latam-light text-blanco">4</span>
                        <h5>Participando de Eventos en el Discord: <span class="fs-5 bold">100M</span> <span
                                class="fs-5 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-12 text-justify">
                        <span style="width: 20px; height: 20px;"
                            class="d-flex fs-6 mr-20 bold justify-center align-center border-radius-50-percent bg-rojo-latam-light text-blanco">5</span>
                        <h5>Invita a tus amigos: <span class="fs-5 bold">100M</span> <span
                                class="fs-5 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                </div>
            </div>
        </section>

        <section class="section mh-70" style="display: none;">
            <h2 class="text-center mb-16">Servicios</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">

            <div class="score">
                <div class="score-item">
                    <h3>+250</h3>
                    <span>Intermediarios</span>
                </div>
                <div class="score-item">
                    <h3>+120</h3>
                    <span>Clientes boost</span>
                </div>
                <div class="score-item">
                    <h3>+17500</h3>
                    <span>Miembros</span>
                </div>
                <div class="score-item">
                    <h3>100</h3>
                    <span>Clientes</span>
                </div>
                <div class="score-item">
                    <h3>100</h3>
                    <span>Clientes</span>
                </div>
                <div class="score-item">
                    <h3>100</h3>
                    <span>Clientes</span>
                </div>
            </div>
        </section>
        <section class="section mh-70" style="display: none;">
            <h2 class="text-center mb-16">Unete a nuestro Discord</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">
            <div class="d-flex justify-center">
                <iframe src="https://discord.com/widget?id=758765323444027434&theme=dark" id="discord-widget"
                    allowtransparency="true" frameborder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
        </section>
        <Footer style="display: none;" />
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/utils' as *;

.discord-widget {
    min-width: 320px;
    height: 500px;
}

.gaming-card {
    border-radius: 12px;
    height: 80px;
    position: relative;

    &.purple {
        box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        -webkit-box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        -moz-box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        background: linear-gradient(202deg, rgba(213, 176, 243, 1) 0%, rgba(201, 169, 242, 1) 26%, rgba(154, 141, 239, 1) 53%, rgba(105, 112, 235, 1) 100%);
    }

    &.red {
        box-shadow: -2px -3px 36px -7px rgba(232, 99, 17, 0.75);
        -webkit-box-shadow: -2px -3px 36px -7px rgba(232, 99, 17, 0.75);
        -moz-box-shadow: -2px -3px 36px -7px rgba(232, 99, 17, 0.75);
        background: rgb(255, 164, 0);
        background: linear-gradient(202deg, rgba(255, 164, 0, 1) 0%, rgba(232, 99, 17, 1) 19%, rgba(214, 74, 20, 1) 46%, rgba(199, 36, 36, 1) 100%);

    }

    img {
        position: absolute;
        top: 5px;
        right: 20px;
        object-fit: cover;
        width: 60px;

        @include breakpoints-down('medium') {
            width: 100px;
        }
    }

    .title {
        font-size: 15px;
        font-weight: bold;
        color: white;
        padding: 12px 12px;
    }

    .button {
        padding: 6px 12px;
        margin: 0px 12px;
        border: 1px solid var(--blanco);
        border-radius: 10px;
        color: var(--blanco);
        font-weight: bold;
        font-size: 12px;
        width: max-content;
        cursor: pointer;

        &:hover {
            background: var(--blanco);
            color: var(--rojo-latam);
        }
    }
}

.home {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    background: var(--main-background);
}

.front-page {
    padding-top: 20vh;

    @include breakpoints-down('medium') {
        padding-top: 10vh;
    }

    main {
        width: 70%;
        margin: 0 auto;
        position: relative;
    }
}

.dota-wallpaper-1 {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    opacity: 0.92;
    height: 100%;
    object-fit: cover;
    // background: url('src/assets/images/dota-wallpaper-2.jpg');

    background-size: cover;
    background-position: center bottom;
}

.score {
    display: grid;
    text-align: center;
    grid-template-columns: repeat(3, 1fr);
    gap: 4.5rem;
}

.dota-profile-1 {
    position: absolute;
    right: 0;
    bottom: -30px;
    width: 450px;
}

body {
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    margin: 0;
    padding: 0;
}

section {
    max-width: 1100px;
}

.section {
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0 auto;
}

.gradient-bottom {
    width: 100%;
    height: 200px;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 40%, white 100%);
    position: absolute;
    bottom: 0;
}

[latam-theme="dark"] {
    .dota-wallpaper-1 {
        opacity: 0.23;
    }

    .gradient-bottom {
        background: var(--main-background);
        box-shadow: var(--box-shadow-gradient);
    }
}
</style>