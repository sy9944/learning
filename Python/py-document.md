## f
f-string: フォーマット済み文字列リテラル
```py
name = "Alice"
msg = f"Hello, {name}!"  # → "Hello, Alice!"
```
## lower()
lower(): 文字列を小文字に変換
```py
text = "Hello"
print(text.lower())  # → "hello"
```
## リスト内包表記
word in tiltle for word in [...]
リスト[...]の各要素wordについて、`word in title`を順番に判定し、その結果(true/false)を並べたイテレータを作る
例：
```py
title = "learn javascript and react"
[word in title for word in ['javascript', 'js', 'react']]
# 結果: [True, False, True]
```
## 三項演算子
計算式 if 条件式 else 計算式
例:
```py
x = 10
result = "Positive" if x > 0 else "Non-positive"
# xが0より大きければ"Positive"、そうでなければ"Non-positive"をresultに代入
```
## :.1f
浮動小数点数を小数点以下1桁で表示
```py
value = 3.14159
formatted = f"{value:.1f}"  # → "3.1"
# ':' フォーマット指定開始
# '.1f' 小数点以下1桁の浮動小数点数(float型)
```
## extend()
extend(): リストに別のリストの要素を追加
```py
list1 = [1, 2, 3]
list2 = [4, 5]
list1.extend(list2)  # → list1は[1, 2, 3, 4, 5]になる
# append()との違い: append()はリスト全体を1つの要素として追加する
```
## append()
append(): リストの末尾に要素を追加
```py
my_list = [1, 2, 3]
my_list.append(4)  # → my_listは[1, 2, 3, 4]になる
# extend()との違い: extend()は別のリストの要素を個別に追加する
```
## if __name__ == "__main__":
Python プログラムでよく使われる特殊な構文。この行は、スクリプトがコマンドラインから直接実行された場合にのみ特定のコードを実行するための条件を定義します。
Pythonファイルには、`__name__`という特別な変数がある。この変数は、スクリプトがどのように実行されているかによって異なる値を持つ。
1. スクリプトが直接実行された場合
`python script.py`のように実行すると、`__name__`の値は`"__main__"`になる。
この場合、`if __name__ == "__main__"`の下に書かれたコードが実行される
2. スクリプトがモジュールとしてインポートされた場合
`import script`のように他ファイルからインポートされた場合、`__name__`の値はそのファイル名(例: "script")になる。
この場合、`if __name__ == "__main__"`の下のコードは実行されない
