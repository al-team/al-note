```js
class App extends Component {
  state = { val: 0 };

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 0
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val); // 0
  }

  render() {
    // render 1
    return <>{this.state.val}</>;
  }
}
```

非合成事件：

```js
class App extends Component {
  state = { val: 0 };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 1
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val); // 2
    });
  }

  render() {
    // render 2
    return <>{this.state.val}</>;
  }
}
```

concurrent 模式下表现一致，
