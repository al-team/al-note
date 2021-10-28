# 剑指 Offer 10- I. 斐波那契数列

题目说要答案需要取模，那么这里注意一下就可以了

递归解决：

```js
var fib = function (n) {
  if (n < 2) return n;
  return (fib(n - 1) + fib(n - 2)) % 1000000007;
};
```

弊端：重复计算，那么加入 map

```js
var fib = function (n) {
  const map = {};
  const rc = (n) => {
    if (n < 2) return n;
    if (map[n]) return map[n];
    const res = (rc(n - 1) + rc(n - 2)) % 1000000007;
    map[n] = res;
    return res;
  };
  return rc(n);
};
```

使用动态规划

```js
var fib = function (n) {
  if (n <= 1) return n;
  let dp = [];
  dp[0] = 1;
  dp[1] = 1;

  for (let i = 2; i < n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % 1000000007;
  }

  return dp[n - 1];
};
```
