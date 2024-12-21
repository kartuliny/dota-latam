<script setup lang="ts">
import dotaWallpaper from '@/assets/images/dota-wallpaper-2.jpg';
import Footer from './Footer.vue';


interface BoosterItem {
    name: string;
    mmr: number;
    stars: number;
    avatar: string;
}

const boosters: BoosterItem[] = [
    {
        name: 'Everyone',
        mmr: 7800,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/469675469172768768/6942909b7395ae2303d6b2c2dc3efcd2.webp?size=160'
    },
    {
        name: 'Jhairsito',
        mmr: 10000,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/651893979260125199/de1b577a222c7bba8e33952a56d4dbb8.webp?size=160'
    },
    {
        name: 'Luxus',
        mmr: 11000,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/259876109871611904/75de153627655e008de4c29efaafe4cf.webp?size=160'
    },
    {
        name: 'Isoka',
        mmr: 7200,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/744309267380568158/7f2ece5e80c8b4a955af13662c83442f.webp?size=160'
    },
    {
        name: 'Novice',
        mmr: 10000,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/710513967490924545/85f43e3a7a61ec80c801bad91e7e8c3f.webp?size=160'
    },
    {
        name: 'M i n n a',
        mmr: 10000,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/976352443908644875/a_e8aabf50d5959d5bba0fa8d329061f5d.webp?size=160'
    },
    {
        name: 'Bored',
        mmr: 7700,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/656307670386475029/a_f67d78d5333274a1c79e549b8d1d9884.webp?size=160'
    },
    {
        name: 'Cris',
        mmr: 10700,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/826759439045361676/4ce998b40e41fba584c9ad5be9204203.webp?size=160'
    },
    {
        name: 'Henryrls',
        mmr: 8500,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/755997957626658820/6acca2bb7f10eb39a90cf184bf859732.webp?size=160'
    },
    {
        name: 'BernaBerna',
        mmr: 12400,
        stars: 5,
        avatar: 'https://cdn.discordapp.com/avatars/294404049749540864/401a4a494f5094627c921df569a8ba4f.webp?size=160'
    },
]
</script>

<template>
    <div class="home">
        <nav class="front-page section red mh-80">
            <div :style="{ backgroundImage: 'url(' + dotaWallpaper + ')' }" class="dota-wallpaper-1"></div>
            <div class="gradient-bottom"></div>
            <img class="dota-profile-1" src="@/assets/images/roshan.webp" alt="dota-1">
            <section class="section">
                <div class="d-flex align-items-center">
                    <a href="https://discord.gg/dota-2-oficial">
                        <img src="@/assets/images/discord-white.webp" width="24" alt="Discord">
                    </a>
                    <img class="ml-20" src="@/assets/images/facebook-white.webp" width="24" alt="Discord">
                </div>

                <h1 class="text-rojo-latam mt-30 mb-30">Dota 2 Latam</h1>
                <h1 class="mb-30">Eleva tu experiencia a otro nivel</h1>
                <hr class="mb-32 w-10 d-inline-block">
                </hr>
                <!-- <img src="@/assets/images/discord.png" width="36" alt="Discord"> -->
                <!-- <a class="ml-10" href="https://discord.gg/dota-2-oficial" target="_blank"><h4>Discord</h4></a> -->

                <div class="d-flex mb-100">
                    <div class="align-items-center p-10 d-flex border-radius-10 border-morado-latam width-max-content">
                        <img src="@/assets/images/discord-partner.png" alt="partner" width="25">

                        <span class="ml-10 fs-4">Discord Partner</span>
                    </div>

                    <div
                        class="align-items-center ml-20 p-10 d-flex border-radius-10 border-amarillo-latam width-max-content">
                        <span class="fs-3 text-amarillo-latam">+17 000</span>
                        <span class="ml-10 fs-4">Miembros</span>
                    </div>
                </div>

                <div class="d-grid grid-template-1-1" style="width: 700px;">
                    <div class="gaming-card purple">
                        <img src="@/assets/images/tesoro-cache.png" width="120" height="120" alt="tesoro-cache">
                        <div class="title">Set Caché</div>
                        <div class="button">Pronto</div>
                    </div>
                    <div class="gaming-card red">
                        <img src="@/assets/images/tauro.png" width="100" height="100" alt="tesoro-cache">
                        <div class="title">Intermediario</div>
                        <div class="button">Pronto</div>
                    </div>
                </div>
            </section class="section">
        </nav>
        <section class="section mh-50">
            <h2 class="text-center mb-16">Boosters</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">
            <!-- <p class="fs-3 text-center mb-32">Te ofrecemos confianza y profesionalismo de la mano de nuestros Boosters Inmortals, capacitados para mejorar tu MMR, KDA y maestría, en el mejor tiempo, precio y calidad ✨</p> -->

            <div class="boosters mb-200">
                <div class="card" v-for="boooster in boosters">
                    <div class="avatar"><img :src="boooster.avatar" alt="Profile 1" width="80"></div>
                    <div class="info">
                        <div class="mb-4 d-flex align-items-center justify-content-center">
                            <h5 class="text-comun">{{ boooster.name }}</h5>
                            <img class="ml-10" src="@/assets/images/inmortal.webp" width="30" alt="inmortal">
                        </div>
                        <div class="bg-inmortal border-radius-10 width-max-content mx-auto">
                            <span class="fs-4 text-blanco-latam px-20">{{ boooster.mmr }} MMR</span>
                        </div>
                        <!-- <div class="d-flex align-items-center justify-content-center">
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                            <i class="ml-4 bi bi-star-fill text-amarillo-latam"></i>
                        </div> -->
                    </div>
                </div>
            </div>
        </section>
        <section class="section mh-70 mb-200">
            <h2 class="text-center mb-16">Experiencia</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">

            <div class="d-flex align-items-center justify-content-space-between">
                <div>
                    <img src="@/assets/images/tiny.png" alt="">
                </div>
                <div>
                    <h4 class="mb-40">¿Cómo funciona la <span class="fs-1 bold text-rojo-latam-light text-shadow-rojo-latam">Experiencia</span>?</h4>

                    <div class="d-flex mb-16">
                        <span style="width: 20px; height: 20px;" class="d-flex fs-6 mr-20 bold justify-content-center align-items-center border-radius-50-percent bg-rojo-latam-light text-blanco">1</span>
                        <h5>Trata de subir experiencia de muchas maneras</h5>
                    </div>
                    <div class="d-flex mb-16">
                        <span style="width: 20px; height: 20px;" class="d-flex fs-6 mr-20 bold justify-content-center align-items-center border-radius-50-percent bg-rojo-latam-light text-blanco">2</span>
                        <h5>Realizando desafíos diariamente: <span class="fs-4 bold">+100M</span>  <span class="fs-4 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-16">
                        <span style="width: 20px; height: 20px;" class="d-flex fs-6 mr-20 bold justify-content-center align-items-center border-radius-50-percent bg-rojo-latam-light text-blanco">3</span>
                        <h5>Comparte pantalla de tu juego en el Discord: <span class="fs-4 bold">200M</span>  <span class="fs-4 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-16">
                        <span style="width: 20px; height: 20px;" class="d-flex fs-6 mr-20 bold justify-content-center align-items-center border-radius-50-percent bg-rojo-latam-light text-blanco">4</span>
                        <h5>Participando de Eventos en el Discord: <span class="fs-4 bold">100M</span>  <span class="fs-4 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                    <div class="d-flex mb-16">
                        <span style="width: 20px; height: 20px;" class="d-flex fs-6 mr-20 bold justify-content-center align-items-center border-radius-50-percent bg-rojo-latam-light text-blanco">5</span>
                        <h5>Invita a tus amigos: <span class="fs-4 bold">100M</span>  <span class="fs-4 bold text-amarillo-latam text-shadow-rojo-latam">XP</span></h5>
                    </div>
                </div>
            </div>
        </section>

        <section class="section mh-70">
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
        <section class="section mh-70">
            <h2 class="text-center mb-16">Unete a nuestro Discord</h2>
            <hr class="hr-small mb-56 w-5 d-inline-block">
            <div class="d-flex justify-content-center">
                <iframe src="https://discord.com/widget?id=759240469615476827&theme=dark" width="350" height="500"
                    allowtransparency="true" frameborder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
        </section>
        <section class="section red mh-70">
            Luki
        </section>
        <Footer></Footer>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/utils' as *;

.gaming-card {
    width: 300px;
    border-radius: 27px;
    height: 110px;
    position: relative;

    &.purple {
        box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        -webkit-box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        -moz-box-shadow: -2px -3px 36px -7px rgba(201, 169, 242, 0.75);
        background: linear-gradient(202deg, rgba(213, 176, 243, 1) 0%, rgba(201, 169, 242, 1) 26%, rgba(154, 141, 239, 1) 53%, rgba(105, 112, 235, 1) 100%);
    }
    
    &.red {
        box-shadow: -2px -3px 36px -7px rgba(232,99,17, 0.75);
        -webkit-box-shadow: -2px -3px 36px -7px rgba(232,99,17, 0.75);
        -moz-box-shadow: -2px -3px 36px -7px rgba(232,99,17, 0.75);
        background: rgb(255,164,0);
        background: linear-gradient(202deg, rgba(255,164,0,1) 0%, rgba(232,99,17,1) 19%, rgba(214,74,20,1) 46%, rgba(199,36,36,1) 100%);

    }

    img {
        position: absolute;
        top: -30px;
        right: -33px;
        object-fit: cover;
    }

    .title {
        font-size: 32px;
        font-weight: bold;
        color: white;
        padding: 15px 20px;
    }

    .button {
        padding:6px 20px;
        margin: 0px 15px;
        border: 1px solid var(--blanco);
        border-radius: 10px;
        color: var(--blanco);
        font-weight: bold;
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

.boosters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 2rem;
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
    width: 1100px;
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