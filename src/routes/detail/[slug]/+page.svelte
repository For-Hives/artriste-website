<script>
  import { api_origin } from "/src/utils/const";

  /** @type {import("./$types").PageData} */
  export let data;

  const oeuvre = data.oeuvre;

</script>


<div class="bg-white w-screen">
  <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">

    <!-- Product image -->
    <div class="mt-10 lg:col-start-1 lg:row-span-2 lg:mt-0 lg:self-center">
      <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
        <img src={api_origin + oeuvre.collectionId + "/" + oeuvre.id + "/" + oeuvre.image} alt="image de l'oeuvre"
             class="h-full w-full object-cover object-center" />
      </div>
    </div>

    <!-- Product details -->
    <div class="lg:max-w-lg lg:self-end">
      <nav aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li v-for="(breadcrumb, breadcrumbIdx) in product.breadcrumbs" :key="breadcrumb.id">
            <div class="flex items-center text-sm">
              <a href="/"
                 class="font-medium text-gray-500 hover:text-gray-900">{oeuvre.name}</a>
              <svg v-if="breadcrumbIdx !== product.breadcrumbs.length - 1" viewBox="0 0 20 20"
                   fill="currentColor" aria-hidden="true"
                   class="ml-2 h-5 w-5 flex-shrink-0 text-gray-300">
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
            </div>
          </li>
        </ol>
      </nav>

      <div class="mt-4">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{oeuvre.name}</h1>
      </div>

      <section aria-labelledby="information-heading" class="mt-4">
        <h2 id="information-heading" class="sr-only">Product information</h2>


        <div class="mt-4 space-y-6">
          <p class="text-base text-gray-600">{ oeuvre.description}</p>
        </div>


        <div class="mt-6 flex items-center">
          <p class="ml-2 text-sm text-gray-500">En stock</p>
        </div>
      </section>
    </div>


    <!-- Product form -->
    <div class="mt-10 lg:col-start-2 lg:row-start-2 lg:max-w-lg lg:self-start">
      <section aria-labelledby="options-heading">
        <h2 id="options-heading" class="sr-only">Product options</h2>
        <form>
          <div class="mt-10">
            <button type="submit"
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
              Acheter
            </button>
          </div>

        </form>
      </section>
    </div>
  </div>
</div>