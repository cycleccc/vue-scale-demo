<template>
    <div id="app">
        <p>Vue3 wangEditor demo</p>
        <BasicEditor></BasicEditor>
    </div>
</template>

<script lang="ts">
import BasicEditor from './components/BasicEditor.vue';

export default {
    name: 'App',
    components: {
        BasicEditor,
    },
};
</script>

<style></style>
