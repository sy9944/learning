## match構文（PHP 8+）
- 式として値を返す（switchは文）
- 厳密比較（===）で判定。フォールスルー無し
- 複数候補はカンマ区切り
- すべてのケースを網羅しない場合は UnhandledMatchError（default 推奨）
- 各アームは「式」1つ（関数呼び出し、配列、算術、throw など可）

```php
$status = 201;
$message = match ($status) {
    200, 201 => 'OK',
    400      => 'Bad Request',
    404      => 'Not Found',
    default  => 'Unknown',
};
echo $message; // OK
```

- 厳密一致（===）
```php
$val = '10';
$result = match ($val) {
    10      => 'int 10',     // マッチしない
    '10'    => 'string 10',  // こちらが選ばれる
    default => 'other',
};
```

- 式として利用
```php
function httpClass(int $code): string {
    return match (intdiv($code, 100)) {
        2 => 'success',
        4 => 'client-error',
        5 => 'server-error',
        default => 'other',
    };
}
```

- 条件分岐パターン（match(true)）
```php
$n = 42;
$label = match (true) {
    $n < 0    => 'negative',
    $n < 10   => 'small',
    $n < 100  => 'medium',
    default   => 'large',
};
```

- 例外を投げる（throw は式）
```php
$age = -1;
$category = match (true) {
    $age < 0           => throw new InvalidArgumentException('age must be >= 0'),
    $age < 20          => 'teen',
    $age < 65          => 'adult',
    default            => 'senior',
};
```

- Tips / 注意
    - default を省略すると未網羅時に UnhandledMatchError（網羅性担保に有効）
    - 副作用目的なら if/switch、値のマッピングなら match が適任
    - 複数値は「,」で同一アームにまとめる／ガード条件は match(true) で記述

---

## count()
- PHPの組み込み関数
- 配列やCountableオブジェクトの要素数を取得する

```php
$order = [];
foreach ($foos as $foo) {
    $order[$foo->id] = count($order);
}
// $order = [foo_id => index, ...]
// 例: $foos = [(id: 10), (id: 20), (id: 30)] → $order = [10 => 0, 20 => 1, 30 => 2]
```

---

## array_key_exists()
- PHPの組み込み関数
- 配列に指定したキーが存在するかを調べる

```php
array_key_exists('key', $array);
// true or false
// $array配列に'key'というキーが存在するか
```

---

## sprintf()
- PHPの組み込み関数
- 文字列をフォーマットする

```php
$name = 'John';
$age = 30;
$formatted = sprintf('My name is %s and I am %d years old.', $name, $age);
// $formatted = 'My name is John and I am 30 years old.'
```

## 静的メソッド・非静的メソッド
### 静的メソッド
静的メソッドは、クラスに属するメソッドであり、インスタンス化せずに直接呼び出すことができます。  
`static` キーワードを使用して定義され、クラス名を通じてアクセスします。

例:
```php
class Example {
    public static function staticMethod() {
        return "This is a static method.";
    }
}

// 静的メソッドの呼び出し
echo Example::staticMethod();
```

非静的メソッド
非静的メソッドは、クラスのインスタンスに属するメソッドであり、インスタンス化したオブジェクトを通じて呼び出します。
$this キーワードを使用して、クラス内のプロパティや他のメソッドにアクセスできます。

例:
```php
<?php
class Example {
    public function nonStaticMethod() {
        return "This is a non-static method.";
    }
}

// インスタンス化して非静的メソッドを呼び出す
$instance = new Example();
echo $instance->nonStaticMethod();
```

主な違い
静的メソッド: クラス全体で共有され、インスタンス化せずに使用可能。
非静的メソッド: インスタンスごとに異なる動作を持ち、インスタンス化が必要。

## `substr()`
```php
<?php
substr($string, $start, $length)
```
$string: 対象の文字列

$start: 開始位置（0が先頭）

$length: 切り出す長さ（省略すると最後まで）

例
```php
<?php
$time = "16:45:00";
$shortTime = substr($time, 0, 5); // "16:45"
```