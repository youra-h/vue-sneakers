<template>
    <div class="grid grid-cols-2 h-screen">
        <div>
            <slot></slot>
        </div>
        <div class="bg-slate-700 flex justify-center items-center">
            <img width="600" src="/screensaver.png" alt="Auth background" class="object-cover" />
        </div>
    </div>
</template>