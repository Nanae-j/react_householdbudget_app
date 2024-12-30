<div id="top"></div>

## 使用技術一覧

<div style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <!-- フロントエンドの言語 -->
  <img src="https://img.shields.io/badge/-Typescript-FFF.svg?logo=typescript&style=for-the-badge">
  <!-- ミドルウェア -->
  <img src="https://img.shields.io/badge/-Firebase-FFCA28.svg?logo=firebase&style=for-the-badge">
</div>

#### 使用ライブラリ
<div>
  <!-- 使用ライブラリ -->
  <p>MUI</p>
  <p>MUI - Material Icons</p>
  <p>Fullcalendar</p>
  <p>date-fns</p>
</div>


## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)


## react_householdbudget_app

<!-- プロジェクトの概要を記載 -->

  <p align="left">
    <br />
    <a href=""><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />

<p align="right">(<a href="#top">トップへ</a>)</p>

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 18.20.4    |
| React                 | 18.3.1     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>


## ディレクトリ構成

tree -a -I "node_modules|.git|public" -L 3

```
.
├── .env
├── .gitignore
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── Calendar.css
│   ├── components
│   │   ├── Calendar.tsx
│   │   ├── DailySummary.tsx
│   │   ├── MonthlySummary.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionMenu.tsx
│   │   ├── common
│   │   └── layout
│   ├── firebase.ts
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── NoMatch.tsx
│   │   └── Report.tsx
│   ├── theme
│   │   └── theme.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       ├── financeCalculations.ts
│       └── formatting.ts
└── tsconfig.json
```

 補足
```
├── components
│   ├── common - 複数のファイルで呼び出す汎用コンポーネント
│   └── layout - アプリ全体のレイアウト
├── pages
├── theme - MUIテーマの拡張
├── types - アプリ全体で使用する型定義
└── utils - アプリ全体で使用する汎用関数
               ├── financeCalculations.ts - 収支計算に関する関数
               └── formatting.ts - 日付や金額のデータをフォーマットする関数
```

<p align="right">(<a href="#top">トップへ</a>)</p>


## 開発環境構築

In the project directory, you can run:

#### `npm install`

### .env ファイルを作成

以下の環境変数例と[環境変数の一覧](#環境変数の一覧)を元に作成

.env
FIREBASE_API_KEY=jvA2fVnrPn

```
### 環境変数の一覧

| 変数名                 | 役割                                   
| ----------------------| ----------------------------------------------------------------
| FIREBASE_API_KEY      | household-typescriptプロジェクトのAPIキー(収支コレクションの取得に使用)

```

### 動作確認

#### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<p align="right">(<a href="#top">トップへ</a>)</p>


