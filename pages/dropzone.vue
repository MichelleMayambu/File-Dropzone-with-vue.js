<template>
    <div>
        <h1> Dropzone Page</h1>
        <component :is="dropZoneComponent" />
    </div>
</template>

<script>
import dropZoneComponent from "~/components/dropZoneComponent.vue";
export default {
    components: {
      dropZoneComponent
    },
    data() {
        return {
         dropZoneComponent
        
        }
    }
}
</script>
