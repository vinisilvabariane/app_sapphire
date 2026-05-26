<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>Sapphire OS</title>
    <meta name="application-name" content="Sapphire OS">
    <meta name="apple-mobile-web-app-title" content="Sapphire OS">
    <meta name="theme-color" content="#071326">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/icon.png">

    <script>
        (function () {
            var theme = 'system';
            try {
                theme = localStorage.getItem('app-theme') || 'system';
            } catch (e) {
                theme = 'system';
            }

            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            var resolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;
            document.documentElement.classList.remove('light', 'dark');
            document.documentElement.classList.add(resolvedTheme);
            document.documentElement.style.colorScheme = resolvedTheme;
        })();
    </script>

    @viteReactRefresh
    @vite('resources/ts/main.tsx')
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
