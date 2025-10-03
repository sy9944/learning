# Guess4 - 数字当てゲーム

4桁の数字を当てるマルチプレイヤーゲームです。リアルタイム通信を使って2人のプレイヤーが対戦できます。

## 🎯 プロジェクト概要

**Guess4**は、4桁の数字を当てるゲーム「ヒット&ブロー」のオンライン対戦版です。

### ゲームルール
1. 各プレイヤーは重複しない4桁の数字を選択
2. 交互に相手の数字を予想
3. 結果は「ヒット」（数字と位置が正解）と「ブロー」（数字のみ正解）で表示
4. 先に相手の数字を完全に当てた方が勝利

## 🛠️ 技術スタック

### フロントエンド
- **Next.js 15** - React フレームワーク
- **React 19** - UI ライブラリ  
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **Socket.io Client** - リアルタイム通信

### バックエンド
- **Express.js** - Web サーバー
- **Socket.io** - リアルタイム通信
- **CORS** - クロスオリジン対応
- **UUID** - ルームID生成

## 🚀 セットアップ・実行方法

### 1. 依存関係のインストール

```bash
# フロントエンドの依存関係をインストール
npm install

# サーバーの依存関係をインストール
cd guess4-server
npm install
cd ..
```

### 2. サーバーの起動

```bash
# サーバーを起動（別ターミナルで）
cd guess4-server
npm start
# または
node server.js
```

サーバーは `http://localhost:3001` で起動します。

### 3. フロントエンドの起動

```bash
# メインディレクトリで
npm run dev
```

フロントエンドは `http://localhost:3000` で起動します。

### 4. ゲームのプレイ

1. `http://localhost:3000` にアクセス
2. 「部屋を作成する」ボタンをクリック
3. 表示されたURLを他のプレイヤーと共有
4. 両プレイヤーが部屋に入ったらゲーム開始

## 📁 プロジェクト構造

```
guess4/
├── src/
│   ├── app/
│   │   ├── page.tsx              # メインページ（部屋作成）
│   │   ├── layout.tsx            # レイアウト
│   │   ├── globals.css           # グローバルスタイル
│   │   └── room/[roomId]/
│   │       ├── page.tsx          # ゲームルーム
│   │       └── NumberSelector.tsx # 数字選択コンポーネント
│   └── hooks/
│       └── useSocket.ts          # Socket.io フック
├── guess4-server/
│   ├── server.js                 # Express + Socket.io サーバー
│   └── package.json              # サーバー依存関係
├── public/                       # 静的ファイル
├── package.json                  # フロントエンド依存関係
├── tsconfig.json                 # TypeScript設定
├── next.config.ts                # Next.js設定
├── eslint.config.mjs             # ESLint設定
└── postcss.config.mjs            # PostCSS設定
```

## 🎮 機能詳細

### リアルタイム機能
- **ルーム作成**: 6桁のランダムなルームID生成
- **プレイヤー参加**: URLシェアによる簡単参加
- **リアルタイム通信**: Socket.ioによる即座の状態同期
- **対戦準備**: 両プレイヤーの準備完了検知

### UI/UX機能
- **レスポンシブデザイン**: モバイル・デスクトップ対応
- **URLコピー機能**: 一発で招待URL をクリップボードにコピー
- **リアルタイム状態表示**: 相手の準備状況を即座に表示

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクション起動
npm start

# ESLint チェック
npm run lint

# サーバー起動（別プロセス）
cd guess4-server && npm start
```

## 📈 学習ポイント

このプロジェクトを通して学習できる技術：

- **Next.js App Router**: 最新のNext.js機能
- **Socket.io**: リアルタイム通信の実装
- **TypeScript**: 型安全なReact開発
- **状態管理**: React Hooks を使った状態管理
- **レスポンシブデザイン**: Tailwind CSS でのモダンUI
- **フルスタック開発**: フロントエンド・バックエンド連携

## 🚧 今後の拡張予定

- [ ] ゲームログイック完全実装（ヒット&ブロー判定）
- [ ] ゲーム履歴・統計機能
- [ ] チャット機能
- [ ] 観戦機能
- [ ] ランキングシステム
- [ ] モバイルアプリ化

## 📝 学習記録

このプロジェクトに関する学習記録は、Issuesを作成して管理してください。
詳細は[学習記録システム使い方ガイド](../../USAGE.md)を参照してください。
