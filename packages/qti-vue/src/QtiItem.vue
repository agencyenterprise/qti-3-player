<template>
  <div ref="containerRef" class="qti-item-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { QtiRenderer } from '@qti-renderer/core';
import type { QtiItemProps } from './types';

const props = defineProps<QtiItemProps>();

const containerRef = ref<HTMLElement | null>(null);
const rendererRef = ref<QtiRenderer | null>(null);

const mountRenderer = () => {
  if (!containerRef.value) {
    return;
  }

  try {
    // Create new renderer instance with feedback enabled
    const renderer = new QtiRenderer(props.xml, {
      debug: false,
      showFeedback: true,
    });
    rendererRef.value = renderer;

    // Mount to container
    renderer.mount(containerRef.value);
  } catch (error) {
    console.error('Failed to render QTI item:', error);
    if (containerRef.value) {
      containerRef.value.innerHTML = `<div style="color: red; padding: 1rem;">
        Error rendering QTI item: ${error instanceof Error ? error.message : 'Unknown error'}
      </div>`;
    }
  }
};

onMounted(() => {
  mountRenderer();
});

onBeforeUnmount(() => {
  if (rendererRef.value) {
    rendererRef.value = null;
  }
});

watch(() => props.xml, () => {
  if (containerRef.value) {
    containerRef.value.innerHTML = '';
    mountRenderer();
  }
});
</script>
