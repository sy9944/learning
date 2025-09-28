三項演算子はnullsafe演算子に置き換えた方が簡潔になる
<?php
// 三項演算子
$name = $user ? $user->profile->name : null;
// nullsafe演算子
$name = $user?->profile?->name ?? null;
?>