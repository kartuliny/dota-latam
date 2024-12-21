import { DirectiveBinding } from 'vue';

const loadingMap = new WeakMap<HTMLElement, { wrapper: HTMLElement, loadingElement: HTMLElement }>();
const showLoading = (el: HTMLElement) => {

    if (getComputedStyle(el).position === 'static') {
        el.style.position = 'relative';
    }

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '100%';
    wrapper.style.height = '100%';
    wrapper.style.opacity = '0.2';
    wrapper.style.pointerEvents = 'none';

    while (el.firstChild) {
        wrapper.appendChild(el.firstChild);
    }
    el.appendChild(wrapper);

    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading';
    loadingElement.style.position = 'absolute';
    loadingElement.style.top = '50%';
    loadingElement.style.left = '50%';
    loadingElement.style.transform = 'translate(-50%, -50%)';
    loadingElement.style.zIndex = '10000';
    el.appendChild(loadingElement);

    loadingMap.set(el, { wrapper, loadingElement });
};

const hideLoading = (el: HTMLElement) => {
    const elements = loadingMap.get(el);
    if (elements) {
        while (elements.wrapper.firstChild) {
            el.appendChild(elements.wrapper.firstChild);
        }
        el.removeChild(elements.wrapper);
        el.removeChild(elements.loadingElement);
        loadingMap.delete(el);
    }
};

const loadingDirective = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.value) {
            showLoading(el);
        }
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        if (binding.value !== binding.oldValue) {
            if (binding.value) {
                showLoading(el);
            } else {
                hideLoading(el);
            }
        }
    }
};

export default loadingDirective;