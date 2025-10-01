## 学習したこと
- 構成
```
<template>...</template>
<script>...</script>
<style>...</style>
```
- Vuexを利用して状態管理を行なっている。
- Vuexのauthモジュールは `resource/js/store/mojules/auth.js` に定義されている
- マスタッシュ構文
Vueコンポーネントのテンプレート内で、`data`や`computed`などで定義した値をHTMLに埋め込むための記法
- `<router-link>`は内部的に`<a>`タグを生成するコンポーネント

## wip:コードリーディング
```vue
<template>
  <div>
    <div class="top-right links">
      <template v-if="authenticated">
        <router-link :to="{ name: 'home' }">
          {{ $t('home') }}
          <!-- $tは多言語に対応するため -->
        </router-link>
      </template>
      <!-- authenticatedがtrueの場合だけこの中身が表示される -->
      <!-- 確かにログイン状態だと"HOME"と表示されて、ユーザーホーム画面に遷移する -->
      
      <template v-else>
        <router-link :to="{ name: 'login' }">
          {{ $t('login') }}
        </router-link>
        <router-link :to="{ name: 'register' }">
          {{ $t('register') }}
        </router-link>
      </template>
    </div>

    <div class="text-center">
      <div class="title mb-4">
        {{ title }}
        <!-- マスタッシュ構文 -->
      </div>

      <div class="links">
        <a href="https://github.com/cretueusebiu/laravel-vue-spa">github.com/cretueusebiu/laravel-vue-spa</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  layout: 'basic',

  metaInfo () {
    return { title: this.$t('home') }
  },

  data: () => ({
    title: window.config.appName
  }),
  // `window.config`は`resources/views/spa.blade.php`で定義されている

  computed: mapGetters({
    authenticated: 'auth/check'
  })
  // Vuexストアのauthモジュールのcheckというgetterの値をauthenticatedとして使う
  // Vuexストア: Vue.jsアプリケーション全体で使う状態(データ)を一元管理する仕組み
  //// 複数のコンポーネント間でデータを共有・管理できる
  //// 状態の変更は「ミューテーション」や「アクション」を通して行う
  //// データの取得には「ゲッター」を使う
}
</script>

<style scoped>
.top-right {
  position: absolute;
  right: 10px;
  top: 18px;
}

.title {
  font-size: 85px;
}
</style>

```

## 疑問
### Q:なんでHOMEが大文字で表記されている？
A: basic.vueに定義されているから
`resources/js/layouts/basic.vue`で記述されている
```vue
<style lang="scss">
.basic-layout {
  color: #636b6f;
  height: 100vh;
  font-weight: 100;
  position: relative;

  .links > a { // .linksクラス内の<a>タグのテキストに対してスタイルを当てている
    color: #636b6f;
    padding: 0 25px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .1rem;
    text-decoration: none;
    text-transform: uppercase; // ←これが大文字に変更している
  }
}
</style>
```

### Q:basic.vueは全てのコンポーネントに適用されるということ？
A: 指定したコンポーネントのみ
以下の部分でレイアウトコンポーネントとして指定している
```js
export default {
  layout: 'basic',
```
