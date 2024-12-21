<script setup lang="ts">
const rarities = [
    { name: 'Común', value: 0 },
    { name: 'Poco Común', value: 1 },
    { name: 'Raro', value: 2 },
    { name: 'Mítico', value: 3 },
    { name: 'Legendario', value: 4 },
    { name: 'Inmortal', value: 5 },
];

const types = [
    { name: 'Facil', value: 0 },
    { name: 'Dificil', value: 1 },
    { name: 'Extremadamente dificil', value: 2 },
]

const columns = [
    { label: 'Nombre', name: 'name' },
    { label: 'Rareza', name: 'rarity' },
    { label: 'URL', name: 'url' },
    { label: 'Stock', name: 'stock' },
    { label: 'Precio', name: 'price' },
    { label: 'Tipo', name: 'type' },
];

</script>

<template>
    <div class="content">
        <div class="register">
            <div class="form-control mb-10">
                <input name="name" type="text" placeholder="Nombre">
            </div>
            <div class="form-control mb-10">
                <select name="rarity">
                    <option v-for="rarity in rarities" :value="rarity.value">{{ rarity.name }}</option>
                </select>
            </div>
            <div class="form-control mb-10">
                <input name="url" type="text" placeholder="URL">
            </div>

            <div class="form-control mb-10">
                <input name="stock" type="number" placeholder="Cantidad">
            </div>

            <div class="form-control mb-10">
                <input name="price" type="number" placeholder="Precio">
            </div>

            <div class="form-control mb-10">
                <select name="rarity">
                    <option v-for="type in types" :value="type.value">{{ type.name }}</option>
                </select>
            </div>


            <button class="btn submit mb-16">registrar Item</button>
        </div>
        <table class="table" style="width: 700px">
            <thead>
                <tr>
                    <th v-for=" column in columns">{{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>
                <tr>
                    <td>Jugger Sworld</td>
                    <td>Mitico</td>
                    <td>https://imagen.ewewewewmeikwmi</td>
                    <td>2</td>
                    <td>12.5</td>
                    <td>Facil</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>

<style lang="scss">
.content {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100vh;
}
</style>