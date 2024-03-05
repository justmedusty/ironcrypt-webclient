<script>
    import './styles.css';
    import MainHeader from "./MainHeader.svelte";
    import Notifications from "svelte-notifications";
</script>



    <div class="app">
        <Notifications>
        <MainHeader/>

        <main>
            <div class="content-box">
                <slot/>
            </div>

        </main>

        <footer>
            <p>Visit <a style="color: blue"
                        href="http://6v4gddjepi6gu6khtkheqkniza2p2u6lsmwa5acod4xq5jh3dkdyevad.onion/">My Onion Blog</a>
                to learn more about the app and my whys and hows</p>
        </footer>
        </Notifications>
    </div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 12px;
    }

    footer a {
        font-weight: bold;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }
</style>
