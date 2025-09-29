GitHub Actionsを設定するにはリポジトリ内に `workflows` フォルダを作成し、その中にYAMLファイルを作成して、ワークフローを定義する必要がある。


name:, on:, jobs: の3つが基本的な構成になる

構成
```yaml
name:
on:
jobs:
    jobsname:
        runs-on:
        permission:
        steps:
            - name:
            - name:
            - name:
```


内容理解
```yaml
name: Update Learning Statistics # ワークフロー全体の名前
                                 # Actionタブや実行履歴で表示されるワークフローの識別名
on:
  issues:
    types: [opened, closed, labeled, unlabeled]
    schedule:
      - cron: '0 9 * * *' # 毎日午前9時（UTC）に実行
    workflow_dispatch: # 手動実行可能
jobs:
  update-stats: # 任意のジョブ名をつける 必須
    runs-on: ubuntu-latest # ワークフローが実行される仮想マシン(実行環境)の指定
                            # ubutuはLinuxOSの一つ
    permissions:
        contents: write # リポジトリ内のファイルの追加・編集・削除
                        # コミットやプッシュ
                        # リリースの作成 ができる
        issues: write # issueの作成・編集・クローズ・コメント追加ができる
    steps:
        - name: Checkout repository
            uses: actions/checkout@v4 # リポジトリのソースコードをGitHub Actionsの実行環境(仮想マシン)にチェックアウト(取得)している
                                        # actions/checkoutはGitHub公式が提供するアクションでリポジトリのコードを仮想環境にダウンロードするためのもの
            
        - name: Setup Python
            uses: actions/setup-python@v4 # GitHub Actionsの仮想環境に、指定したバージョンのPython実行環境をセットアップ
            with:
            python-version: '3.11' # バージョン指定
            
        - name: Install dependencies # Pythonのパッケージをインストール
            run: |  # run:ステップでは、仮想環境のシェルでコマンドを自動で実行する
                    # シェルコマンドを実行
                    # シェルは、コンピュータとユーザーの間でコマンドを受け付けて実行するプログラム
                    # ターミナルは、シェルを操作するための画面やアプリ
            pip install requests PyGithub  # requests と PyGithub をインストール
                                           # それぞれ外部ライブラリなのでインストールが必要
        
        - name: Create update script
            run: |
            cat > update_stats.py << 'EOF' # 複数行のテキストをupdate_stats.pyというファイルに書き込むための構文
                                           # cat > xxx.py 標準入力から受け取った内容をxxx.pyファイルに保存する
                                           # << 'EOF' `EOF`という文字列が現れるまで複数行テキストを入力として扱う `EOF`部分は任意の文字列
                                           # EOF: EndOfFile
            import os # Python標準ライブラリ ⇒ Pythonをインストールすれば追加インストール不要
                      # PythonでOS関連の操作を行うため
                      # 環境変数の取得・設定
                      # ファイルやディレクトリの操作
                      # パスの結合や分割
                      # GitHub Actionsのスクリプトでは、環境変数からGitHubのトークンやリポジトリ情報を取得するのに使うことが多い ← 今回もこれ
                      # モジュール
            import requests # HTTPリクエストを行うためのPythonライブラリ
                            # 現在は利用していない。
                            # PyGituhubライブラリを使ってGitHub APIとやりとりしている。
            from datetime import datetime # Python標準ライブラリ`datetime`から`datetime`クラスだけをインポートしている
                                          # 現在時刻の取得
                                          # 日付や時刻の操作 などが簡単に行えるようになる。
                                          # datetimeを丸ごとインポートした場合、コードが複雑になる。
                                          ## now = datetime.datetime.now() と書く必要がある
                                          ## now = datetime.now() datetimeクラスだけならこのように簡潔になる
            import json # JSON形式データの読み書きが行える
            from github import Github # `github`は`PyGithub`のモジュール
                                      # PyGithub (パッケージ) ← モジュールの集まり
                                      # └── github (モジュール)
                                      #     └── Github (クラス)
            
            def get_learning_stats(repo): # stats = statistics(統計)
                                          # `repo`は`main()`関数で作成されている
                """学習統計を取得"""
                try:
                    label = repo.get_label('学習記録')
                    issues = repo.get_issues(state='all', labels=[label])
                except:
                    # ラベルが存在しない場合は空の統計を返す
                    return {
                        'total_learning_topics': 0,
                        'completed_topics': 0,
                        'in_progress_topics': 0,
                        'categories': {},
                        'this_month_completed': 0,
                        'this_year_completed': 0
                    }
                
                stats = {
                    'total_learning_topics': 0,
                    'completed_topics': 0,
                    'in_progress_topics': 0,
                    'categories': {},
                    'this_month_completed': 0,
                    'this_year_completed': 0
                }
                
                current_year = datetime.now().year
                current_month = datetime.now().month
                
                for issue in issues:
                    stats['total_learning_topics'] += 1
                    
                    # ステータス分析
                    if issue.state == 'closed':
                        stats['completed_topics'] += 1
                        if issue.closed_at:
                            if issue.closed_at.year == current_year:
                                stats['this_year_completed'] += 1
                                if issue.closed_at.month == current_month:
                                    stats['this_month_completed'] += 1
                    else:
                        stats['in_progress_topics'] += 1
                    
                    # カテゴリ分析
                    category = 'その他'
                    title = issue.title.lower()
                    if any(word in title for word in ['javascript', 'js', 'react', 'vue', 'css', 'html']):
                        category = 'フロントエンド'
                    elif any(word in title for word in ['python', 'java', 'node', 'go', 'database', 'sql', 'php']):
                        category = 'バックエンド'
                    elif any(word in title for word in ['docker', 'kubernetes', 'aws', 'gcp', 'ci/cd']):
                        category = 'DevOps'
                    elif any(word in title for word in ['ios', 'android', 'flutter', 'mobile']):
                        category = 'モバイル'
                    elif any(word in title for word in ['algorithm', 'design pattern', 'architecture']):
                        category = 'その他'
                    
                    if category not in stats['categories']:
                        stats['categories'][category] = {'total': 0, 'completed': 0}
                    stats['categories'][category]['total'] += 1
                    if issue.state == 'closed':
                        stats['categories'][category]['completed'] += 1
                
                return stats
            
            def update_readme(stats):
                """README.mdを更新"""
                now = datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')
                
                readme_lines = [
                    "# 🎓 Learning Record System",
                    "",
                    "エンジニアとしての継続学習を記録・可視化するためのポートフォリオシステムです。",
                    "",
                    "## 📊 学習統計",
                    "",
                    "### 全体サマリー",
                    f"- **総学習トピック数**: {stats['total_learning_topics']}",
                    f"- **完了済み**: {stats['completed_topics']}",
                    f"- **進行中**: {stats['in_progress_topics']}",
                    f"- **今月完了**: {stats['this_month_completed']}",
                    f"- **今年完了**: {stats['this_year_completed']}",
                    "",
                    "### カテゴリ別統計"
                ]
                
                if stats['categories']:
                    for category, data in stats['categories'].items():
                        completion_rate = (data['completed'] / data['total'] * 100) if data['total'] > 0 else 0
                        readme_lines.append(f"- **{category}**: {data['completed']}/{data['total']} ({completion_rate:.1f}%完了)")
                else:
                    readme_lines.append("データの蓄積中...")
                
                readme_lines.extend([
                    "",
                    "## 🗂️ 学習分野",
                    "",
                    "### [Frontend](./frontend/)",
                    "フロントエンド技術の学習記録",
                    "- JavaScript, TypeScript",
                    "- React, Vue.js",
                    "- CSS, UI/UX",
                    "",
                    "### [Backend](./backend/)",
                    "バックエンド技術の学習記録",
                    "- Node.js, Python, Java, Go",
                    "- データベース設計・管理",
                    "",
                    "### [DevOps](./devops/)",
                    "DevOps・インフラ技術の学習記録",
                    "- Docker, Kubernetes",
                    "- CI/CD, AWS, GCP",
                    "",
                    "### [Mobile](./mobile/)",
                    "モバイルアプリ開発の学習記録",
                    "- iOS (Swift), Android (Kotlin)",
                    "- Flutter (Dart)",
                    "",
                    "### [Others](./others/)",
                    "その他の技術・スキルの学習記録",
                    "- アルゴリズム・データ構造",
                    "- デザインパターン",
                    "- システムアーキテクチャ",
                    "",
                    "## 🚀 使い方",
                    "",
                    "1. **新しい学習を開始**: [Issues](../../issues/new?template=learning-record.md)から学習記録を作成",
                    "2. **進捗を更新**: Issue上で学習の進捗を随時更新",
                    "3. **完了時**: Issueをクローズして学習完了をマーク",
                    "",
                    "詳細は[使い方ガイド](./USAGE.md)をご確認ください。",
                    "",
                    "## 🛠️ システム機能",
                    "",
                    "- ✅ 技術分野別のフォルダ構造",
                    "- ✅ 学習記録用Issueテンプレート",
                    "- ✅ 自動統計更新（GitHub Actions）",
                    "- ✅ 進捗可視化ダッシュボード",
                    "",
                    "## 📈 最新更新",
                    "",
                    f"最終更新: {now}",
                    "",
                    "---",
                    "",
                    "> このシステムは学習の継続性を支援し、採用活動でのポートフォリオとして活用できるよう設計されています。"
                ])
                
                return "\n".join(readme_lines)
            
            # メイン処理
            def main():
                token = os.environ['GITHUB_TOKEN'] # `GITHUB_TOKEN`はGitHub Actionsのワークフロー内で自動的に発行・利用できる認証用トークン
                                                   # ワークフロー実行時に自動生成
                                                   # リポジトリの読み書きやissue操作など、GitHub APIへの認証に使える
                                                   # 次のステップで環境変数として定義されている
                                                   # GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
                repo_owner = os.environ['REPO_OWNER'] # 次のステップで環境変数として定義されている。これを受け取っている
                                                      # REPO_OWNER: ${{ github.repository_owner }}
                repo_name = os.environ['REPO_NAME'] # 次のステップで環境変数として定義されている。
                                                    # REPO_NAME: ${{ github.event.repository.name }}
                
                g = Github(token) # `PyGithub`ライブラリの`Github`クラスで、GitHub APIとやりとりするためのインスタンスを作成
                                  # `token`を使って認証付きでGitHubにアクセスできるようにしている。
                repo = g.get_repo(f"{repo_owner}/{repo_name}") # `f`はf-string(フォーマット済み文字列リテラル)を表す。
                                                               # 指定したリポジトリのリポジトリオブジェクトを取得
                
                try:
                    # 学習記録ラベルが存在しない場合は作成
                    try:
                        repo.get_label('学習記録')  # 存在すればラベルオブジェクトが返る
                                                   # ラベルの名前・色・説明などを持ったオブジェクト
                                                   # 存在しなければ例外(`UnknownObjectException`など)が自動的に発生する
                                                   # → exceptブロックが実行される
                    except:
                        repo.create_label('学習記録', 'e1f5fe', '学習記録に関するIssue')
                        
                    try:
                        repo.get_label('進行中')
                    except:
                        repo.create_label('進行中', 'fbca04', '現在進行中の学習')
                        
                    # 統計取得
                    stats = get_learning_stats(repo) # 上記で定義している
                    
                    # README更新
                    new_readme = update_readme(stats)
                    
                    # ファイル更新
                    try:
                        readme_file = repo.get_contents("README.md")
                        repo.update_file("README.md", "📊 Update learning statistics [automated]", new_readme, readme_file.sha)
                    except:
                        repo.create_file("README.md", "📊 Create learning statistics [automated]", new_readme)
                        
                    print("✅ Learning statistics updated successfully!")
                    
                except Exception as e:
                    print(f"❌ Error: {e}")
                    # エラーでもワークフローを失敗させない
                    pass
            
            if __name__ == "__main__":
                main()
            EOF

        - name: Update learning statistics
            env:
                GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
                REPO_OWNER: ${{ github.repository_owner }}
                REPO_NAME: ${{ github.event.repository.name }}
            run: |
                python update_stats.py
                
            - name: Commit changes
            run: |
                git config --local user.email "action@github.com"
                git config --local user.name "GitHub Action"
                git add README.md
                if git diff --staged --quiet; then
                echo "No changes to commit"
                else
                git commit -m "📊 Update learning statistics [automated]"
                git push
                fi
```