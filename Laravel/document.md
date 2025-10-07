## sortBy
Laravelのコレクションで使用されるメソッド
```php
<?php
// $foosはFooモデルのコレクション
// $fooは$foosの各要素　foreachの$fooに相当
$foos = $foos->sortBy(function ($foo) {
	return $foo->someProperty;
});
?>
```

## Validator::make()
Laravelのバリデーションを行うためのファサードメソッド
検証したいデータ、ルール、カスタムメッセージ、属性名(ラベル)を渡す
```php
<?php
use Illuminate\Support\Facades\Validator;

$data = [
	'name' => 'John Doe',
	'email' => 'john.doe@example.com',
	'password' => 'secret',
];

$rules = [
	'name' => 'required|string|max:255',
	'email' => 'required|email|unique:users,email',
	'password' => 'required|min:8',
];

$validator = Validator::make($data, $rules);

if ($validator->fails()) {
	$errors = $validator->errors();
	// エラー処理
}
?>
```
