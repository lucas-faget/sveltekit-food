<script lang="ts">
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
    import logo from "$lib/images/flowbite-svelte-icon-logo.svg";
</script>

<Navbar>
    <NavBrand href="/">
        <img src={logo} class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Flowbite
        </span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
        <NavLi href="/">Home</NavLi>
        <NavLi href="/food">Food</NavLi>
        <NavLi href="/basket">Basket</NavLi>
        <NavLi href="/intakes">Intakes</NavLi>
    </NavUl>
</Navbar>
