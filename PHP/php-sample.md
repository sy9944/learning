## 各グループごとに値の初出順を記録するPHPコード例
```php
$firstOrderPerGroup = [];
foreach ($items as $item) {
    // グループキーと値を取得
    $groupKey = $item->group_key;
    $value = $item?->value ?? '';

    // グループが未登録なら初期化
    if (!array_key_exists($groupKey, $firstOrderPerGroup)) {
        $firstOrderPerGroup[$groupKey] = [];
    }
    // 値が未登録なら初出順を記録
    if (!array_key_exists($value, $firstOrderPerGroup[$groupKey])) {
        $firstOrderPerGroup[$groupKey][$value] = count($firstOrderPerGroup[$groupKey]);
    }
}
// $firstOrderPerGroup['A'] = ['foo' => 0, 'bar' => 1, ...]
```