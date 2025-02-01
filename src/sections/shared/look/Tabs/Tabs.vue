<template>
    <div class="tabs">
        <!-- Navegación -->
        <div class="tabs-nav" role="tablist" aria-label="Content sections" ref="tabsNav">
            <div class="tabs-indicator" ref="indicator"></div>
            <button v-for="(tab, index) in tabs" :key="tab.id" class="tab-button" :role="'tab'"
                :aria-selected="selectedTab === tab.id" :aria-controls="tab.panelId" :id="tab.id"
                @click="selectTab(tab.id)" @keydown="handleKeydown(index, $event)">
                {{ tab.label }}
            </button>
        </div>

        <!-- Contenido -->
        <div v-for="(tab, index) in tabs" :key="tab.panelId" class="tab-panel" :role="'tabpanel'" :id="tab.panelId"
            :aria-labelledby="tab.id" :aria-hidden="selectedTab !== tab.id">
            <slot :name="tab.slotName" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, defineProps, defineEmits } from "vue";

// Props
interface Tab {
    id: string;
    panelId: string;
    label: string;
    slotName: string;
}

const props = defineProps<{
    tabs: Tab[];
    defaultTabId?: string;
}>();

// Eventos emitidos
const emit = defineEmits<{
    (e: "change", selectedTab: string): void;
}>();

// Refs
const selectedTab = ref(props.defaultTabId || props.tabs[0].id);
const tabsNav = ref<HTMLElement | null>(null);
const indicator = ref<HTMLElement | null>(null);

// Métodos
const setIndicatorPosition = () => {
    const currentTab = tabsNav.value?.querySelector(
        `.tab-button[aria-selected="true"]`
    ) as HTMLElement;

    if (currentTab && indicator.value) {
        indicator.value.style.transform = `translateX(${currentTab.offsetLeft}px)`;
        indicator.value.style.width = `${currentTab.offsetWidth}px`;
    }
};

const selectTab = async (tabId: string) => {
    selectedTab.value = tabId;
    await nextTick();
    setIndicatorPosition();
    emit("change", tabId); // Emitir el evento de cambio
};

const handleKeydown = (index: number, event: KeyboardEvent) => {
    if (!tabsNav.value) return;

    const buttons = tabsNav.value.querySelectorAll(".tab-button");
    if (event.key === "ArrowLeft" && index > 0) {
        (buttons[index - 1] as HTMLElement).focus();
        selectTab(props.tabs[index - 1].id);
    }
    if (event.key === "ArrowRight" && index < props.tabs.length - 1) {
        (buttons[index + 1] as HTMLElement).focus();
        selectTab(props.tabs[index + 1].id);
    }
};

// Montar el componente
onMounted(() => {
    setIndicatorPosition();
    window.addEventListener("resize", setIndicatorPosition);
});
</script>

<style scoped lang="scss">
/* Tabs Container */
.tabs {
    width: 100%;
    max-width: 600px;
}

/* Tabs Navigation */
.tabs-nav {
    position: relative;
    display: flex;
    gap: var(--tabs-gap);
    background: var(--highlight-color);
    padding: var(--tabs-nav-padding);
    border-radius: var(--tab-border-radius);
    margin-bottom: 2rem;
    isolation: isolate;
    width: max-content;
    /* Create new stacking context */
}

/* Tab Buttons */
.tab-button {
    flex: 1;
    all: unset;
    position: relative;
    padding: var(--tab-padding);
    font-size: var(--tab-font-size);
    font-weight: var(--tab-font-weight);
    color: var(--text-color);
    border-radius: var(--tab-border-radius);
    cursor: pointer;
    transition: color var(--transition-duration) var(--transition-timing);
    text-align: center;
    white-space: nowrap;
    z-index: 1;
}

.tab-button:hover {
    color: var(--mitico-plus-40);
}

.tab-button[aria-selected="true"] {
    color: var(--mitico-plus-40);
}

/* Moving Indicator */
.tabs-indicator {
    position: absolute;
    top: var(--tabs-nav-padding);
    bottom: var(--tabs-nav-padding);
    left: 0;
    border-radius: calc(var(--tab-border-radius) - 2px);
    background: var(--highlight-color);
    transition:
        transform var(--transition-duration) var(--transition-timing),
        width var(--transition-duration) var(--transition-timing);
    pointer-events: none;
    z-index: 0;
    box-shadow:
        0 0 0 1px var(--border-color),
        0 4px 12px rgba(0, 0, 0, 0.1);
    will-change: transform, width;
}

/* Tab Panels */
.tab-panel {
    background: transparent;
    border-radius: var(--tab-border-radius);
    display: none;
    transform-origin: top;
    animation: slideIn var(--transition-duration) var(--transition-timing);
}

.tab-panel[aria-hidden="false"] {
    display: block;
}

/* Animations */
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Focus styles */
.tab-button:focus-visible {
    outline: 2px solid var(--mitico-plus-40);
    outline-offset: 2px;
}

/* Content styling */
.tab-panel h2 {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: var(--mitico-plus-40);
}

.tab-panel p {
    line-height: 1.6;
    opacity: 0.9;
}
</style>