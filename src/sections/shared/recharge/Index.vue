<script setup lang="ts">
import { getCurrentInstance, inject, ref, watch } from 'vue';
import { SendRechargeUseCase } from '@/modules/shared/user/application/user/SendRechargeUseCase';
import { useRouter } from 'vue-router';
const { proxy } = getCurrentInstance()!;
const staticUrl = proxy?.$staticUrl;
const showToast = inject<any>('showToast');

const paymentMethodIndex = ref<number | undefined>(undefined);
const paymentMethods = [
    {
        name: 'Yape',
        image: staticUrl + '/images/yape.webp',
        qr: staticUrl + '/images/yape-qr.webp'
    },
    {
        name: 'Plin',
        image: staticUrl + '/images/plin.webp',
        qr: staticUrl + '/images/plin-qr.webp'
    }
]

const amounts = [5, 10, 20, 50, 100, 200];
const amountIndex = ref<number | undefined>(undefined);
const amountValue = ref<number | undefined>(undefined);
const currentStep = ref(1);
const operationValue = ref<number>();
const fullNameValue = ref<string>();
const router = useRouter();

watch(() => amountIndex.value, (value) => {
    if (value !== undefined) {
        amountValue.value = undefined
    }
})

watch(() => amountValue.value, (value) => {
    if (value !== undefined) {
        amountIndex.value = undefined
    }
})

const sendRecharge = async () => {
    try {
        await SendRechargeUseCase.invoke({
            paymentMethod: paymentMethods[paymentMethodIndex.value!].name,
            operationNumber: operationValue.value!,
            fullName: fullNameValue.value!,
            amount: amountIndex.value === undefined ? amountValue.value! : amounts[amountIndex.value!]
        });

        showToast({
            title: '',
            message: "La recarga se ha enviado correctamente",
            type: 'success',
            autoClose: true,
        });

        router.push({ name: 'profile' });

    } catch (error) {
        showToast({
            title: '',
            message: "Sobrepasaste la maxima cantidad de recargas pendientes",
            type: 'error',
            autoClose: true,
        });
        console.error(error);
    }
}

</script>

<template>
    <div class="recharge mt-80 lg:mt-120">
        <section class="section w-10/12" style="max-width: 500px;">
            <div
                class="px-10 py-10 md:py-16 rounded-lg bg-gris-latam-minus-60 d-block md:justify-center md:align-center mb-20 md:d-flex text-center">
                <h2 class="mb-10 md:mb-0">Recarga de</h2>
                <h3 class="text-amarillo-latam strong d-block text-center ml-10">LATAMCOIN</h3>
            </div>

            <div class="d-flex justify-center align-center mb-40">
                <i v-if="currentStep > 1" class="bi bi-chevron-left mr-10 text-lg pointer" @click="currentStep--"></i>
                <h4 class="text-center">Paso {{ currentStep }} / 2</h4>
            </div>

            <template v-if="currentStep === 1" class="w-full">
                <h5 class="text-center mb-20">Ingresar monto:</h5>
                <div class="d-grid gap-3 md:grid-cols-2 mb-30 text-sm md:text-base">
                    <div v-for="(amount, index) in amounts" @click="amountIndex = index"
                        class="border-gris-latam rounded-2xl text-blanco d-flex justify-space-between align-center pointer py-10 px-20"
                        :class="{ 'border-amarillo-latam': amountIndex === index }">
                        <div>
                            S/{{ amount }}
                        </div>

                        <div class="d-flex align-center mr-4"> {{ amount }}
                            <span class="text-amarillo-latam bold d-flex align-center text-sm">
                                <template v-if="amount >= 20"> + {{ Math.round(amount / 20) }}</template>
                            </span>
                            <img class="ml-4" width="20" :src="staticUrl + '/images/latam-coin.webp'" alt="latamcoin">
                        </div>
                    </div>
                </div>

                <h5 class="text-center mb-20">Otro monto:</h5>

                <div class="form-control mb-20">
                    <input type="number" v-model="amountValue" placeholder="Ingresar monto" />
                </div>

                <h5 class="text-center mb-20">Método de pago:</h5>
                <div class="d-flex justify-evenly mb-32">

                    <div v-for="(paymentMethod, index) in paymentMethods"
                        class="rounded-2xl border-gris-latam p-8 pointer" @click="paymentMethodIndex = index"
                        :class="{ 'border-amarillo-latam': paymentMethodIndex == index }">
                        <img :src="paymentMethod.image" width="60" :alt="paymentMethod.name">
                    </div>
                </div>
                <button v-if="paymentMethodIndex !== undefined && ((amountIndex !== undefined) || amountValue)"
                    @click="currentStep += 1"
                    class="btn text-center btn-fixed md:position-relative md:mx-auto md:w-48 text-blanco roboto">Continuar</button>

            </template>
            <template v-if="currentStep === 2">
                <!-- <div class=""> -->
                <img class="mx-auto" width="280" :src="paymentMethods[paymentMethodIndex!].qr"
                    :alt="paymentMethods[paymentMethodIndex!].name + '-QR'">

                <h5 class="text-center mb-10 mt-20">N° Operación:</h5>
                <div class="form-control">
                    <input type="number" v-model="operationValue" placeholder="Ingresar" />
                </div>

                <h5 class="text-center mb-10 mt-20">Nombre completo:</h5>
                <div class="form-control mb-100">
                    <input type="text" v-model="fullNameValue" placeholder="Ingresar" />
                </div>
                <button @click="sendRecharge"
                    class="btn text-center btn-fixed md:position-relative md:mx-auto md:w-48 text-blanco roboto lg:mt-20">Enviar</button>
                <!-- </div> -->
            </template>
        </section>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/utils' as *;

.recharge {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    object-fit: fill;
    background-repeat: no-repeat;
    height: 100%;
}
</style>