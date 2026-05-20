<template>
    <aside
        class="fixed left-0 top-0 h-full bg-[#111c43] text-slate-300 transition-all duration-300 z-50 overflow-y-auto overflow-x-hidden"
        :class="[
            isCollapsed ? 'w-20' : 'w-64',
            isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        ]">
        <div class="h-16 flex items-center px-6 border-b border-slate-700/50">
            <div class="flex items-center gap-3">
                <img src="/logo-icon.png" class="w-8 h-8" alt="Logo">
                <span v-if="!isCollapsed" class="font-bold text-xl text-white tracking-tight">YNEX</span>
            </div>
        </div>

        <div class="py-4 px-3 space-y-1">
            <div v-for="group in menuGroups" :key="group.title">
                <p v-if="!isCollapsed"
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2 mt-4">
                    {{ group.title }}
                </p>

                <NuxtLink v-for="item in group.items" :key="item.name" :to="item.to"
                    class="flex items-center gap-4 px-3 py-2.5 rounded-lg transition-colors group" :class="[
                        $route.path === item.to ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
                    ]">
                    <Icon :name="item.icon" size="20" class="flex-shrink-0" />
                    <span v-if="!isCollapsed" class="text-sm font-medium whitespace-nowrap">{{ item.name }}</span>

                    <span v-if="!isCollapsed && item.badge"
                        class="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                        {{ item.badge }}
                    </span>
                </NuxtLink>
            </div>
        </div>
    </aside>
</template>

<script setup>
defineProps(['isOpen', 'isCollapsed'])

const menuGroups = [
    {
        title: 'Main',
        items: [
            { name: 'Dashboards', icon: 'ph:house-duotone', to: '/admin' },
            { name: 'User Management', icon: 'ph:users-duotone', to: '/admin/users' }
        ]
    },
    {
        title: 'Pages',
        items: [
            // { name: 'Pages', icon: 'ph:file-duotone', to: '/admin/pages', badge: 'New' },
            // { name: 'Task', icon: 'ph:check-square-duotone', to: '/admin/task', badge: 'New' }
        ]
    }
]
</script>