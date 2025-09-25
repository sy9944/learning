# PHP: match 構文の使い方（PHP 8+）

概要
- 式として値を返す（switchは文）
- 厳密比較（===）で判定。フォールスルー無し
- 複数候補はカンマ区切り
- すべてのケースを網羅しない場合は UnhandledMatchError（default 推奨）
- 各アームは「式」1つ（関数呼び出し、配列、算術、throw など可）

基本
```php
<?php
$status = 201;

$message = match ($status) {
    200, 201 => 'OK',
    400      => 'Bad Request',
    404      => 'Not Found',
    default  => 'Unknown',
};

echo $message; // OK
```

厳密一致（===）
```php
<?php
$val = '10';
$result = match ($val) {
    10      => 'int 10',     // マッチしない
    '10'    => 'string 10',  // こちらが選ばれる
    default => 'other',
};
```

式として利用
```php
<?php
function httpClass(int $code): string {
    return match (intdiv($code, 100)) { // $codeを100で割った商を返す
        2 => 'success',
        4 => 'client-error',
        5 => 'server-error',
        default => 'other',
    };
}
```

条件分岐パターン（match(true)）
```php
<?php
$n = 42;
$label = match (true) {
    $n < 0    => 'negative',
    $n < 10   => 'small',
    $n < 100  => 'medium',
    default   => 'large',
};
```

例外を投げる（throw は式）
```php
<?php
$age = -1;
$category = match (true) {
    $age < 0           => throw new InvalidArgumentException('age must be >= 0'),
    $age < 20          => 'teen',
    $age < 65          => 'adult',
    default            => 'senior',
};
```

Tips / 注意
- default を省略すると未網羅時に UnhandledMatchError（網羅性担保に有効）
- 副作用目的なら if/switch、値のマッピングなら match が適任
- 複数値は「,」で同一アームにまとめる／ガード条件は match(true) で記述
