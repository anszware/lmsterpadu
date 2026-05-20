<template>
    <div class="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <h1 class="text-lg font-semibold text-slate-800 dark:text-white capitalize">
            {{ $route.name || 'Dashboard' }}
        </h1>
        <nav class="flex items-center space-x-2 text-sm">
            <NuxtLink to="/admin" class="text-blue-500 hover:underline">Admin</NuxtLink>
            <Icon name="ph:caret-right-bold" class="text-slate-400" size="12" />
            <span class="text-slate-500 dark:text-slate-400 capitalize">{{ $route.name }}</span>
        </nav>
    </div>
</template>