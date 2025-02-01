<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Treasure } from '../treasures/Index.vue';

const loading = ref<boolean>(false);
const route = useRoute();

const selectedTreasures = ref<Treasure[]>([]);

const treasures = ref<Treasure[]>([
    { name: 'Cofre de oro', showDropRate: true, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, },
    { name: 'Cofre de plata', showDropRate: false, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, },
    { name: 'Cofre de bronce', showDropRate: true, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'xp', moneyValue: 100000, enabled: true, },
    { name: 'Cofre de diamante', showDropRate: false, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, },
    { name: 'Cofre de esmeralda', showDropRate: true, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, },
    { name: 'Cofre de carbón', showDropRate: false, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'xp', moneyValue: 10000000, enabled: true, },
    { name: 'Cofre de piedra', showDropRate: true, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, },
    { name: 'Cofre de madera', showDropRate: true, bagroundImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/img_300x300.png', contentImageUrl: 'https://cdnhell.com/hellcase/img/case/bane_of_the_deathstalkers/secondary_300x300.png', moneyType: 'latamcoin', moneyValue: 100, enabled: true, }
])

const id = computed(() => {
    return route.params.id;
});


const onSelectedTreasure = (treasure: Treasure) => {
    const index = treasures.value.findIndex((t) => t.name === treasure.name);

    if (index === -1) {
        treasures.value.push(treasure);
    } else {
        treasures.value.splice(index, 1);
    }

    selectedTreasures.value = selectedTreasures.value.filter((t) => t.name !== treasure.name);
}

const onTreasure = (treasure: Treasure) => {
    const index = selectedTreasures.value.findIndex((t) => t.name === treasure.name);

    if (index === -1) {
        selectedTreasures.value.push(treasure);
    } else {
        selectedTreasures.value.splice(index, 1);
    }

    treasures.value = treasures.value.filter((t) => t.name !== treasure.name);
}

</script>

<template>
    <div class="w-full pt-40 h-100" v-loading="loading">
        <div class="container text-gris-latam">
            <div class="d-flex justify-space-between align-center w-full mb-20">
                <h2>Grupo de tesoros {{ id }}</h2>
                <button class="btn submit">Guardar</button>
            </div>

            <div class="p-20 border-gris-latam rounded-lg h-80 mb-40">
                <h4>Grupo ??</h4>
                <div class="d-grid grid-cols-8">
                    <div v-for="treasure in selectedTreasures" @click="onSelectedTreasure(treasure)" class="border-rojo-latam p-10 rounded-lg pointer">
                        {{ treasure.name }}
                    </div>
                </div>
            </div>

            <div class="p-20 border-gris-latam rounded-lg h-80">
                <div class="d-grid grid-cols-8">
                    <div v-for="treasure in treasures" @click="onTreasure(treasure)" class="border-rojo-latam p-10 rounded-lg pointer">
                        {{ treasure.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>