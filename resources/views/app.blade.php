<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'App Template') }}</title>

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
