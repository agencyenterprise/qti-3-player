<template>
  <div ref="containerRef" class="qti-item-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { EventsEnum, QtiRenderer } from '@ae-studio/qti-renderer';
import type { QtiRendererParams } from '@ae-studio/qti-renderer/dist/types';

interface Props extends QtiRendererParams {
  onRender?: () => void;
  onValidate?: () => void;
}

const props = defineProps<Props>();

const containerRef = ref<HTMLElement | null>(null);
const rendererRef = ref<QtiRenderer | null>(null);

const mountRenderer = (onRender?: () => void, onValidate?: () => void) => {
  if (!containerRef.value) {
    return;
  }

  try {
    // Create new renderer instance with feedback and validation enabled
    const renderer = new QtiRenderer(props);
    rendererRef.value = renderer;

    if (onRender) {
      document.addEventListener(EventsEnum.AFTER_RENDER_EVENT, onRender);
    }
    if (onValidate) {
      document.addEventListener(EventsEnum.AFTER_VALIDATE_EVENT, onValidate);
    }

    // Render to container (async)
    renderer.render(containerRef.value).catch((error) => {
      console.error('Failed to render QTI item:', error);
      if (containerRef.value) {
        containerRef.value.innerHTML = `<div style="color: red; padding: 1rem;">
          Error rendering QTI item: ${error instanceof Error ? error.message : 'Unknown error'}
        </div>`;
      }
    });
  } catch (error) {
    console.error('Failed to render QTI item:', error);
    if (containerRef.value) {
      containerRef.value.innerHTML = `<div style="color: red; padding: 1rem;">
        Error rendering QTI item: ${error instanceof Error ? error.message : 'Unknown error'}
      </div>`;
    }
  }
};

const submit = () => {
  if (rendererRef.value) {
    rendererRef.value.submit();
  }
};

const getSubmissionCount = () => {
  if (rendererRef.value) {
    return rendererRef.value.getSubmissionCount();
  }
  return 0;
};

defineExpose({
  submit,
  getSubmissionCount,
});

onMounted(() => {
  mountRenderer(props.onRender, props.onValidate);
});

onBeforeUnmount(() => {
  if (rendererRef.value) {
    rendererRef.value = null;
  }
});

watch(() => props.xml, () => {
  if (containerRef.value) {
    containerRef.value.innerHTML = '';
    mountRenderer(props.onRender, props.onValidate);
  }
});
</script>
