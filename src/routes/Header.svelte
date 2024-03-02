<script>
    import {page} from '$app/stores';
</script>

<header>

    <nav>

        <ul>
            <li aria-current={$page.url.pathname.startsWith('/login') ? 'page' : undefined}>
                <a href="/login">Login</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/signup')? 'page' : undefined}>
                <a href="/signup">Signup</a>
            </li>
            <li aria-current={$page.url.pathname.startsWith('/about') ? 'page' : undefined}>
                <a href="/about">About</a>
            </li>
        </ul>

    </nav>

    <div class="corner">
    </div>
</header>

<style>
    header {
        display: flex;
        justify-content: space-between;
        width: 100vw; /* Use viewport width */
        box-sizing: border-box; /* Include padding and border in the total width */
    }

    nav {
        display: flex;
        justify-content: center;
        --background: rgba(255, 0, 0, 0.7);
    }

    ul {
        position: relative;
        padding: 0;
        margin: 0;
        height: 3em;
        width: 60em;
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        background: var(--background);
        background-size: contain;
        background-color: navajowhite;
    }

    li {
        position: relative;
        height: 100%;
    }

    li[aria-current='page']::before {
        --size: 6px;
        content: '';
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: calc(50% - var(--size));
        border: var(--size) solid transparent;
        border-top: var(--size) solid var(--color-theme-1);
    }

    nav a {
        display: flex;
        height: 100%;
        align-items: center;
        padding: 0 0.5rem;
        color: var(--color-text);
        font-weight: 700;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-decoration: none;
        transition: color 0.2s linear;
    }

    a:hover {
        color: var(--color-theme-1);
    }
</style>
