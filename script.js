const { createApp, ref, computed, watch } = Vue;

// メインアプリ定義
const App = {
  template: `
    <div>
      <div class="search">
        <input type="text" v-model="filterText" placeholder="キーワードで検索…" />
      </div>
      <div class="grid">
        <div class="card" v-for="shop in pagedShops" :key="shop.id">
          <img :src="shop.image" :alt="shop.name" />
          <div class="content">
            <div class="title">{{ shop.name }}</div>
            <div class="desc">{{ shop.description }}</div>
            <a class="btn" :href="shop.url" target="_blank">Google マップを見る</a>
          </div>
        </div>
      </div>
      <div class="pagination" v-if="totalPages > 1">
        <button
          v-for="page in totalPages"
          :key="page"
          class="page-btn"
          :class="{active: page === currentPage}"
          @click="currentPage = page">
          {{ page }}
        </button>
      </div>
    </div>
  `,
  setup() {
    const perPage = 3;
    const currentPage = ref(1);
    const filterText = ref('');
    const shops = ref([
      { id:1, name:'お店1', image:'https://via.placeholder.com/400x300?text=Shop1', description:'お店1の紹介文', url:'https://maps.google.com' },
      { id:2, name:'お店2', image:'https://via.placeholder.com/400x300?text=Shop2', description:'お店2の紹介文', url:'https://maps.google.com' },
      { id:3, name:'お店3', image:'https://via.placeholder.com/400x300?text=Shop3', description:'お店3の紹介文', url:'https://maps.google.com' },
      { id:4, name:'カフェA', image:'https://via.placeholder.com/400x300?text=Shop4', description:'カフェAの紹介文', url:'https://maps.google.com' },
      { id:5, name:'レストランB', image:'https://via.placeholder.com/400x300?text=Shop5', description:'レストランBの紹介文', url:'https://maps.google.com' }
    ]);

    const filteredShops = computed(() => {
      if (!filterText.value) return shops.value;
      return shops.value.filter(s =>
        s.name.toLowerCase().includes(filterText.value.toLowerCase())
      );
    });

    const totalPages = computed(() => Math.ceil(filteredShops.value.length / perPage));
    const pagedShops = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      return filteredShops.value.slice(start, start + perPage);
    });

    watch(filterText, () => currentPage.value = 1);

    return { filterText, currentPage, perPage, totalPages, pagedShops };
  }
};

// アプリをマウント
createApp(App).mount('#app');
