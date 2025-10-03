sortBy
Laravelのコレクションで使用されるメソッド
<?php
// $foosはFooモデルのコレクション
// $fooは$foosの各要素　foreachの$fooに相当
$foos = $foos->sortBy(function ($foo) {
	return $foo->someProperty;
});
?>