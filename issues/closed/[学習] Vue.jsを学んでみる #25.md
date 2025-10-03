laravel-vue-spa という公開リポジトリがあったのでそれをクローンして触ってみる

## 環境構築
手順
- GitHubでForkする

リポジトリページ右上の「Fork」ボタンをクリック
自分のPCにクローンする

- セットアップする

```
cp .env.example .env
composer install
npm install
php artisan key:generate
```

- DBを用意して.envを編集

MySQLなどでDBを作成し、.envのDB設定を変更

- マイグレーション実行

```
php artisan migrate
```
- 開発サーバー起動

```
php artisan serve
npm run dev
```

コードを編集して動作を確認

resources/jsやroutes/api.phpなどを編集し、画面やAPIの挙動を変えてみる


## 学習
ログインしたらhome画面に遷移した。この画面遷移をどうやって行なっているのか学習しよう

画面構成
トップ
├── ログイン
│   └── ホーム
│       ├── 設定
│       │  ├── プロフィール
│       │   └── パスワード
│ 　　　 └── ログアウト　→ ログイン
└── 登録
    └── ホーム


トップからログイン画面への遷移を理解する
そもそも