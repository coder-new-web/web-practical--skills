## 分片上传特征

前端不断生成Ajax请求，不断向服务器发送请求

## 为什么要使用分片上传

因为一旦文件过大，如果仅仅是把它当成一次请求发送上传的话，那么整个上传的时间将会非常的耗时，一旦网的请求异常，就可能导致不得不将整个文件重新上传。
浪费资源、上传耗时长、用户体验差

## 分片上传原理

首先把整个的大文件数据分成一个一个的数据小块

## 文件如何进行分片

```js
const ipt = document.querySelector("input");
ipt.onchange = e => {
  const file = ipt.files[0];
  if (!file) {
    return;
  }
  const chunksResult = createChunks(file, 10 * 1024 * 1024);
};

const createChunks = (file, chunkSize) => {
  const result = [];
  // file.slice得到的是blob类型
  for (let i = 0; i < file.size; i += chunkSize) {
    result.push(file.slice(i, i + chunkSize));
  }
  return result;
};
```

## 场景模拟

### 分片上传后断网了怎么办

如果文件分片上传过程中断网了，那下次上传的时候，就不用再次上传已上传成功后的内容。

原理就是跟服务器的一次对话，从服务器那知道还需要哪些分片。此时跟服务器的对话，就需要知道是哪一个文件，这里可以使用hash。MD5

利用hash：
  	任何数据 -> 固定长度字符串  这个过程是不可逆的

利用hash值来代表文件的整个数据。

hash算法：常用的是md5   可使用第三方库：spark-md5

将整个文件进行hash算法是不现实的，因为如果读完整个文件数据（fileReader），可能这个过程是十分漫长的、

因此这里这里需要使用增量算法，何为增量算法。意思：拿一块读完就扔掉，这样可以节省内存



等待时间过长就开一个web worker
web Worker()



如果时间还是过长，可以将一些分片块多合并在一起计算hash计算。



用MD5进行文件签名，MD5进行的文件签名，只要文件大小无变动，基本生成的值就是唯一的，任何数据都可以生成一个固定的字符串长度，这个过程是不可逆的。

分片上传——数据库不存在MD5签名

秒传——数据库存在MD5签名

断点续传——部分存在，但是该文件并没有上传完，只需要把剩下的上传完即可。



