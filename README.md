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
  <p><a href="https://mui.com/?srsltid=AfmBOop8do6Wba8LfN2MGHwqont2Y-5YQS_0HLTznS-pKdzLV6jddKWl" target="_blank">MUI</a></p>
  <p><a href="https://mui.com/material-ui/material-icons/?srsltid=AfmBOorCIT-9uGtxweLdJDjlxByDjY5Nh_bYwiU2tleTXAV0o_AmdWr6" target="_blank">MUI - Material Icons</a></p>
  <p><a href="https://fullcalendar.io/docs/react" target="_blank">Fullcalendar</a></p>
  <p><a href="https://date-fns.org/" tartget="_blank">date-fns</a></p>
  <p><a href="https://react-chartjs-2.js.org/" target="_blank">react-chartjs</a></p>
  <p><a href="https://firebase.google.com/docs/web/setup?hl=ja" target="_blank">firebase</a></p>
  <p><a href="https://react-hook-form.com/" target="_blank">react-hook-form</a></p>
  <p><a href="https://zod.dev/" target="_blank">zod</a></p>
</div>


## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [開発メモ](#開発メモ)


## プロジェクトについて

<p align="right">(<a href="#top">トップへ</a>)</p>

<!-- プロジェクトの環境を記載 -->
### プロジェクトの概要

<p>
このアプリは、Next.js学習の前段階として、ReactとTypeScriptの基本的な構文や使用方法、そしてFirestoreを使用したCRUD操作の基礎を学ぶ目的でUdemy講座を参考に制作しました。<br />
フロントエンド開発において重要なコンポーネント設計とTypeScriptによる型定義について、実際に手を動かしながら理解を深めることができました。特に型安全性の確保と開発時のコード補完の恩恵を実感できた点は大きな収穫でした。<br />
また、Material UI (MUI)というUIライブラリを活用することで、コンポーネントベースの開発手法をさらに理解するとともに、アプリケーション全体のテーマ管理を効率的に行う手法についても学びを深めることができました。このライブラリ導入によって、一貫性のあるデザインの実現とコーディング時間の短縮を両立できたことは、実務を想定した開発フローを体験する良い機会となりました。
</p>


<a href="https://www.udemy.com/course/react-complete-guide/?couponCode=KEEPLEARNING">udemy - 【2024年最新】React(v18)完全入門ガイド｜Hooks、Next14、Redux、TypeScript</a>
<a href="https://www.udemy.com/course/reacttypescrip-reacttypescript/?couponCode=KEEPLEARNING">udemy - 【『React』×『TypeScrip』入門　】家計簿アプリ作成でReactとTypeScriptの開発方法を学ぼう</a>

### つまずいたところ

#### MUIのバージョンにより使用方法が変更になっていた

<p>
  udemy動画とバージョンの差分があり、私の環境(v6)ではimport先やpropsの渡し方が変更になっていた。ライブラリではバージョンによって使用方法が細かく変わるので<a href="https://mui.com/material-ui/migration/upgrade-to-v6/#grid">リファレンス</a>を確認する癖をつける良い学習になりました。
</p>

Gridコンポーネントではimport先変更、item,xs属性は渡せないようになっているのでsizeで渡す。  
```
旧:
import { Grid } from "@mui/material";

<Grid container spacing={1}>
  <Grid item xs={1}>
    {/* コンテンツ内容 */}
  </Grid>
  <Grid item xs={2.5}>
    {/* コンテンツ内容 */}
  </Grid>
</Grid>

新:
<Grid container spacing={1}>
  <Grid size={1}>
    {/* コンテンツ内容 */}
  </Grid>
  <Grid size={2.5}>
    {/* コンテンツ内容 */}
  </Grid>
</Grid>
```

#### interfaceではできない型定義がある

<img width="757" alt="スクリーンショット 2025-04-04 9 11 38" src="https://github.com/user-attachments/assets/8469dad3-9d36-4f86-b665-d3202cf6d759" />

```
const TransactionType = 'income' | 'expense';

//上記のような型定義はinterfaceではできない
const type TransactionType = 'income' | 'expense';

//下記のようにtypeでの宣言をinterfaceに含めることは可能
export interface Transaction {
  id: string;
  amount: number;
  content: string;
  type: TransactionType;
}
```

### 制作後の振り返り

<p>
TypeScriptの型定義の基本的な使い方や、Record型を用いたオブジェクトの型定義など、実践的な書き方に少し慣れることができました。これにより、コード補完や型チェックの恩恵を実感できるようになりました。<br />
今回初めてCRUD操作（作成・読取・更新・削除）を実装したことで、データの取得や送信をサーバーサイドで処理する基本的な流れを手を動かしながら理解できました。特にFirestoreとの連携方法や非同期処理の扱いについて、実践的な知識を得られたことは大きな学びでした。 <br />
UIライブラリ（MUI）については、その利便性を実感し、大規模アプリケーションやチーム開発における一貫性の担保に非常に有用であることを理解できました。しかし、カスタムテーマの設定やコンポーネントのカスタマイズについては、まだ十分に習得できておらず、効率的に活用するには更なる学習が必要だと感じています。<br />
今後の学習では、異なるUIライブラリやデータベースシステムも積極的に取り入れ、より幅広い技術スタックへの理解を深めていきたいと思います。特にモダンな開発ツールについても学習を進めたいと考えています。
</p>


### コンポーネントとレイアウトの構成

![AppLayout](https://github.com/user-attachments/assets/fda6f952-24cc-4729-9f06-85640fe8da54)

![Components](https://github.com/user-attachments/assets/6cca303f-d790-4237-ac1e-92545ea6030a)

![Components続き](https://github.com/user-attachments/assets/85336206-1f6f-4de1-bf00-3c71c61d166f)



<p align="right">(<a href="#top">トップへ</a>)</p>

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 18.20.4    |
| React                 | 18.3.1     |

その他のパッケージのバージョンは pyproject.toml と package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>


## ディレクトリ構成

```
.
├── .env
├── .gitignore
├── .vscode
│   └── settings.json
├── README.md
├── package-lock.json
├── package.json
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── Calendar.css
│   ├── components
│   │   ├── BarChart.tsx
│   │   ├── Calendar.tsx
│   │   ├── CategoryChart.tsx
│   │   ├── DailySummary.tsx
│   │   ├── MonthSelector.tsx
│   │   ├── MonthlySummary.tsx
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionMenu.tsx
│   │   ├── TransactionTable.tsx
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
│   ├── utils
│   │   ├── financeCalculations.ts
│   │   └── formatting.ts
│   └── validations
│       └── scheme.ts
└── tsconfig.json
```

コンポーネントとファイル構成
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
```
### 環境変数の一覧

| 変数名                 | 役割                                   
| ----------------------| ----------------------------------------------------------------
| FIREBASE_API_KEY      | household-typescriptプロジェクトのAPIキー(収支コレクションの取得に使用)

```

### 動作確認

#### `npm run start`


## 開発メモ

<p><a href="https://www.notion.so/Udemy-16adf53fe25a806fb081eceae3c53842?pvs=4">Notion まとめ</a></p>
<p align="right">(<a href="#top">トップへ</a>)</p>


