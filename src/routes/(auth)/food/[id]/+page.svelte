<script lang="ts">
    export let data;

    const { product } = data;
</script>

<h1>Product</h1>

<div>
    <span>{product.api_id} |</span>
    <span>{product.name} |</span>
    <span>{product.brand}</span>
</div>
