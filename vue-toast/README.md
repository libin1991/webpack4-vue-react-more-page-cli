###微博toast

```
this.$toast({
	type: "loading", //success fail  warning loading msg
	msg: "操作操作操作操作成功操作",
})

setTimeout(()=>{
	this.$toast.close();   //手动关闭
	this.$toast("操作操作操作操作成功操作")
},3000)
```