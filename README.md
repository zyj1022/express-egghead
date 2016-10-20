本资源为 egghead 的 Getting Started with Express 课程源码

# 使用方式：

```
npm install
```

安装 mongodb `brew install mongodb`

添加mongodb安装目录到环境变量中

```
export PATH=/usr/local/Cellar/mongodb/3.2.10//bin:$PATH
```
执行 `source ~/.bash_profile`

启动 mongodb

```
mongod --dbpath /Users/[用户名]/mongodb/data/db
```

导入数据

```
mongoimport --db test --collection users --drop --file user_list.json
```

然后可以启动查看

```
npm run dev
```

