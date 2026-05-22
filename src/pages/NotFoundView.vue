<template>
  <div
    class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-10"
  >
    <div
      class="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-black md:p-12"
    >
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.12),transparent_35%)]"
      ></div>
      <div
        class="relative mx-auto mb-8 flex h-36 w-36 items-center justify-center rounded-full bg-linear-to-br from-slate-50 to-slate-100 shadow-inner dark:from-slate-900 dark:to-slate-800"
      >
        <div
          class="relative h-24 w-24 rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-950"
        >
          <div
            class="absolute left-4 top-4 h-3 w-14 rounded-full bg-slate-200 dark:bg-slate-700"
          ></div>
          <div
            class="absolute left-4 top-10 h-3 w-10 rounded-full bg-slate-200 dark:bg-slate-700"
          ></div>
          <div
            class="absolute left-4 top-16 h-3 w-16 rounded-full bg-slate-200 dark:bg-slate-700"
          ></div>
          <div class="absolute right-3 top-4 text-3xl">🛠️</div>
        </div>
      </div>

      <p
        class="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-blue-600 dark:text-blue-400"
      >
        En préparation
      </p>
      <h1
        class="text-3xl font-bold tracking-tight text-slate-950 dark:text-white md:text-4xl"
      >
        Cette page n'existe pas encore
      </h1>
      <p
        class="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300"
      >
        La page Settings est en cours de conception. Elle sera disponible
        prochainement avec les réglages de l'application et les préférences du
        compte.
      </p>

      <div
        class="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400"
      >
        <span
          class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900"
          >Options à venir</span
        >
        <span
          class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900"
          >Préférences</span
        >
        <span
          class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-900"
          >Paramètres du compte</span
        >
      </div>
    </div>
  </div>
</template>
