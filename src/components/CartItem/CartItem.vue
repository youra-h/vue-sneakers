<template>
    <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
        <img :src="imageUrl" alt="Sneakers" class="w-16 h-16">

        <div class="flex flex-col w-full">
            <p>Кросовки Nike</p>

            <div class="flex justify-between mt-2">
                <b>12990 руб</b>
                <img class="opacity-40 hover:opacity-100 transition cursor-pointer" src="/close.svg" alt="Remove" />
            </div>
        </div>
    </div>
</template>

<script src="./cart-item.ts" lang="ts"></script>