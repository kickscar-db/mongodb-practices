## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch02. Basics

### 1. 개요
​	MongoDB 데이터의 기본 단위는 Document이다. RDBMS의 Table의 row와 유사하다. Document의 모음을 Collection이라 하며 RDBMS의 Table로 생각할 수 있다. MongoDB의 실행 즉, 하나의 인스탄스로 여러 데이터베이스를 운용할 수 있다

#### 1-1. Document

#### 1-2. Collection

#### 1-3. Database(instance)



### 2. Shell과 기본 CRUD 연습

​	MongoDB는 MongoDB 인스탄스와 인스탄스의 여러 데이터베이스에 대한 관리와 조작에 유용한 강력한 JavaScript Shell를 제공한다.

#### 2-1. Shell 실행

   ```bash
$ mongo
   ```

   ​	기본적으로 연결하면 test database에 연결된다. 사실, test database는 이 시점에 생성되지 않는다. 첫 번째 document가 insert될 때, collection과 database가 생성된다. MongoDB는 데이터에 대해 동적 접근 방식을 택하고 있으며 이는 docuemnt의 shceme가 미리 정의될 필요가 없으며 개별 collection과 database 역시 미리 생성될 필요가 없다는 뜻이다.  

#### 2-2. database 생성

1. mydb 연결

   ```javascript
   > use mydb
   switched to db mydb
   ```

   ​	JavaScript Shell 이기 때문에  JavaScript 코드로 설명하면, database mydb 연결을 db라는 전역변수에 할당(assignment) 한 것이다. db 전역 변수를 출력해 보자.

2. db 값이 출력

   ```javascript
   > db
   mydb
   ```

      ​	shell이기 때문에 변수 db의 값이 출력된다.


#### 2-3. document 생성

1. 간단한 document(json 형식) {name:'둘리', email:'dooly@kickscar.me'} 를 mydb의 user collection에 insert 해보자.

   ```javascript
   > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
   WriteResult({ "nInserted" : 1 })
   ```

2. 조회를 위해 하나 더 추가 해보자.

   ```javascript
   > db.user.insert({name:'마이콜', email:'michol@kickscar.me'})
   WriteResult({ "nInserted" : 1 })
   ```

#### 2-4. document 조회

1. count() 함수를 사용해서 user collection의 document 수를 세어 보자.

   ```javascript
   > db.user.count()
   2
   ```

2. user collection의 모든 document 보기 위해서 find() 함수를 사용한다.

   ```javascript
   > db.user.find()
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me" }
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@kickscar.me" }
   ```

3. query selector를 사용해서 특정 document 찾아보자.

   ```javascript
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me" }
   ```

#### 2-5. document 업데이트

1. 마이콜의 email을 'michol@gmail.com' 으로 수정해 보자.

   ```javascript
   > db.user.update({name:'마이콜'}, {$set:{email:'michol@gmail.com'}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com" }
   ```

      ​	update() 함수는 두 개의 파라미터가 필요하다. 첫 번째는 업데이트 대상 document를 찾기 위한 query selector이며 두 번째는 찾은 문서에 대한   수정 내용을 담고 있는 json이 된다.

2. 앞의 예제는 존재하는 데이터의 수정 이었지만 새로운 데이터도 추가할 수 있다. 배열 형식의 취미들을 추가해 보자.

   ```javascript
   > db.user.update({name:'둘리'}, {$set: {hobby:['Coding', 'Swimming']}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me", "hobby" : [ "Coding", "Swimming" ] }
   
   > db.user.update({name:'마이콜'}, {$set: {hobby:['Reading', 'Cooking']}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

3. 배열 같은 경우에는 변경 보다는 추가라고 볼 수 있다. 배열에 대한 수정으로 $push와 $addToSet 연산자도 제공한다.  '기타연주' 를  둘리의 취미에 추가를 위해 $push 연산자를 사용해 보자.

   ```javascript
   > db.user.update({name:'둘리'}, {$push: {hobby:'Playing a guitar'}}, false, true)
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
   > db.user.find({name:'둘리'})
   { "_id" : ObjectId("5ef03032a2dce6bf54348bec"), "name" : "둘리", "email" : "dooly@kickscar.me", "hobby" : [ "Coding", "Swimming", "Playing a guitar" ] }
   ```

      	쿼리를 보면 이해하는 데 크게 어렵지 않지만 세 번째, 네 번째 파라미터가 추가된 것을 볼 수 있다. 세번째 파라미터는....  네번째 파라미터는 다중 업데이트를 할 것인지에 대한 것이다. 기본은 조건의 첫 번째 document만 업데이트하기 때문에 해당 조건의 document를 모두 업데이트하기 위해서는 true로 설정해야 한다. 

4. $addToSet은 연산자는 배열에 해당 값이 존재하면 추가하지 않는다.  다음 예제로 확인해 보자.

   ```javascript
   > db.user.update({name:'마이콜'}, {$addToSet:{hobby:'Cooking'}})
   WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 0 })
   > db.user.find({name:'마이콜'})
   { "_id" : ObjectId("5ef041d2a2dce6bf54348bee"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

#### 2-6. document 삭제

1. document의 삭제를 위해서는 remove() 함수를 사용한다. 취미 중에 'Swimming'이 취미인 사용자를 삭제해보자.

   ```javascript
   > db.user.remove({'hobby': 'Swimming'})
   WriteResult({ "nRemoved" : 1 })
   > db.user.find()
   { "_id" : ObjectId("5ef035d0a2dce6bf54348bed"), "name" : "마이콜", "email" : "michol@gmail.com", "hobby" : [ "Reading", "Cooking" ] }
   ```

2. remove() 연산은 collection을 삭제하지 않는다. collection을 삭제하기 위해서는 drop() 함수를 사용해야 한다.

   ```javascript
   > db.user.drop()
   true
   > show collections;
   >
   ```

   ​	collection list를 출력하기 위해서 show collections 명령을 사용했다. collection이 존재하지 않음을 확인할 수 있다. 

### 3. index & explain()

#### 3-1. 실습 Collection 생성

​	전통적인 RDBMS에서는 쿼리의 성능 향상을 위해 보통 index를 생성하는 것이 보통이다. MongoDB도 마찬가지이며 비교적 쉽게 index를 생성할 수 있다. index의 필요성을 확인하기 위해 대용량 collection을 생성해 보자.

```javascript
> for(i=0; i<200000; i++){
  db.numbers.save({num: i});
}
WriteResult({ "nInserted" : 1 })
> 
```

​	조금 시간이 걸리지만 1분 이내로 끝난다. 확인을 위해 갯 수를 세어 보자.

```javascript
> db.numbers.count()
200000
```

#### 3-2. query

1. 기본 find() 와 it 사용

   ```javascript
   > db.numbers.find()
   { "_id" : ObjectId("5efaec69c24235ab07858221"), "num" : 0 }
   { "_id" : ObjectId("5efaec69c24235ab07858222"), "num" : 1 }
   { "_id" : ObjectId("5efaec69c24235ab07858223"), "num" : 2 }
   { "_id" : ObjectId("5efaec69c24235ab07858224"), "num" : 3 }
   { "_id" : ObjectId("5efaec69c24235ab07858225"), "num" : 4 }
   { "_id" : ObjectId("5efaec69c24235ab07858226"), "num" : 5 }
   { "_id" : ObjectId("5efaec69c24235ab07858227"), "num" : 6 }
   { "_id" : ObjectId("5efaec69c24235ab07858228"), "num" : 7 }
   { "_id" : ObjectId("5efaec69c24235ab07858229"), "num" : 8 }
   { "_id" : ObjectId("5efaec69c24235ab0785822a"), "num" : 9 }
   { "_id" : ObjectId("5efaec69c24235ab0785822b"), "num" : 10 }
   { "_id" : ObjectId("5efaec69c24235ab0785822c"), "num" : 11 }
   { "_id" : ObjectId("5efaec69c24235ab0785822d"), "num" : 12 }
   { "_id" : ObjectId("5efaec69c24235ab0785822e"), "num" : 13 }
   { "_id" : ObjectId("5efaec69c24235ab0785822f"), "num" : 14 }
   { "_id" : ObjectId("5efaec69c24235ab07858230"), "num" : 15 }
   { "_id" : ObjectId("5efaec69c24235ab07858231"), "num" : 16 }
   { "_id" : ObjectId("5efaec69c24235ab07858232"), "num" : 17 }
   { "_id" : ObjectId("5efaec69c24235ab07858233"), "num" : 18 }
   { "_id" : ObjectId("5efaec69c24235ab07858234"), "num" : 19 }
   Type "it" for more
   > it
   { "_id" : ObjectId("5efaec69c24235ab07858235"), "num" : 20 }
   { "_id" : ObjectId("5efaec69c24235ab07858236"), "num" : 21 }
   { "_id" : ObjectId("5efaec69c24235ab07858237"), "num" : 22 }
   { "_id" : ObjectId("5efaec69c24235ab07858238"), "num" : 23 }
   { "_id" : ObjectId("5efaec69c24235ab07858239"), "num" : 24 }
   { "_id" : ObjectId("5efaec69c24235ab0785823a"), "num" : 25 }
   { "_id" : ObjectId("5efaec69c24235ab0785823b"), "num" : 26 }
   { "_id" : ObjectId("5efaec69c24235ab0785823c"), "num" : 27 }
   { "_id" : ObjectId("5efaec69c24235ab0785823d"), "num" : 28 }
   { "_id" : ObjectId("5efaec69c24235ab0785823e"), "num" : 29 }
   { "_id" : ObjectId("5efaec69c24235ab0785823f"), "num" : 30 }
   { "_id" : ObjectId("5efaec69c24235ab07858240"), "num" : 31 }
   { "_id" : ObjectId("5efaec69c24235ab07858241"), "num" : 32 }
   { "_id" : ObjectId("5efaec69c24235ab07858242"), "num" : 33 }
   { "_id" : ObjectId("5efaec69c24235ab07858243"), "num" : 34 }
   { "_id" : ObjectId("5efaec69c24235ab07858244"), "num" : 35 }
   { "_id" : ObjectId("5efaec69c24235ab07858245"), "num" : 36 }
   { "_id" : ObjectId("5efaec69c24235ab07858246"), "num" : 37 }
   { "_id" : ObjectId("5efaec69c24235ab07858247"), "num" : 38 }
   { "_id" : ObjectId("5efaec69c24235ab07858248"), "num" : 39 }
   Type "it" for more
   >
   ```

   기본적으로 find()는 20개씩 doument를 출력하고 it 명령으로 다음 20개를 더 출력할 수 있다.

2. find() 와 조건

   ```javascript
   > db.numbers.find({num: 9999});
   { "_id" : ObjectId("5efaec6dc24235ab0785a930"), "num" : 9999 }
   >
   ```

3. find() 와 $lt 연산자 사용

   ```javascript
   > db.numbers.find({num: {'$lt':5}});
   { "_id" : ObjectId("5efaec69c24235ab07858221"), "num" : 0 }
   { "_id" : ObjectId("5efaec69c24235ab07858222"), "num" : 1 }
   { "_id" : ObjectId("5efaec69c24235ab07858223"), "num" : 2 }
   { "_id" : ObjectId("5efaec69c24235ab07858224"), "num" : 3 }
   { "_id" : ObjectId("5efaec69c24235ab07858225"), "num" : 4 }
   >
   ```

4. find() 와 $lt, $gt 연산자 함께 사용

   ```javascript
   > db.numbers.find({num: {'$gt':20, '$lt':30}});
   { "_id" : ObjectId("5efaec69c24235ab07858236"), "num" : 21 }
   { "_id" : ObjectId("5efaec69c24235ab07858237"), "num" : 22 }
   { "_id" : ObjectId("5efaec69c24235ab07858238"), "num" : 23 }
   { "_id" : ObjectId("5efaec69c24235ab07858239"), "num" : 24 }
   { "_id" : ObjectId("5efaec69c24235ab0785823a"), "num" : 25 }
   { "_id" : ObjectId("5efaec69c24235ab0785823b"), "num" : 26 }
   { "_id" : ObjectId("5efaec69c24235ab0785823c"), "num" : 27 }
   { "_id" : ObjectId("5efaec69c24235ab0785823d"), "num" : 28 }
   { "_id" : ObjectId("5efaec69c24235ab0785823e"), "num" : 29 }
   >
   ```

#### 3-3. profiling with explain()

앞의 쿼리에 explain()를 사용해서 쿼리의 성능을 테스트해 보자.

```javascript
> db.numbers.find({num: {'$gt':199995}}).explain('executionStats');
{
(생략)
.
.
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 4,
		"executionTimeMillis" : 137,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 200000,
		"executionStages" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"num" : {
					"$gt" : 199995
				}
			},
.
.
(생략)
}
```

​	'executionStats' 인자를 통해 explain()을 실행하면, 인덱스 사용여부, 스캔한 문서 수, 쿼리 수행 시간등을 알 수 있다. totalDocsExamined 값을 찾아 보면 4개의 문서를 찾기 위해 전체 문서를 스캔한 것을 알 수 있다.

#### 3-4. index 생성

1. numbers collection에 index를 생성해 보자. index 많은 옵션과 튜닝을 위한 파라미터들이 있다. 여기서는 간단히 num키에 대한 오름차순 index를 생성해 보자.

   ```javascript
   > db.numbers.ensureIndex({num: 1})
   {
   	"createdCollectionAutomatically" : false,
   	"numIndexesBefore" : 1,
   	"numIndexesAfter" : 2,
   	"ok" : 1
   }
   >
   ```

2. explain()을 사용한 프로파일링

   ```javascript
   > db.numbers.find({num: {'$gt':199995}}).explain('executionStats');
   {
   (생략)
   .
   .
   	"executionStats" : {
   		"executionSuccess" : true,
   		"nReturned" : 4,
   		"executionTimeMillis" : 11,
   		"totalKeysExamined" : 4,
   		"totalDocsExamined" : 4,
   		"executionStages" : {
   			"stage" : "FETCH",
   			"nReturned" : 4,
   			"executionTimeMillisEstimate" : 0,
   			"works" : 5,
   			"advanced" : 4,
   			"needTime" : 0,
   			"needYield" : 0,
   			"saveState" : 0,
   			"restoreState" : 0,
   			"isEOF" : 1,
   			"docsExamined" : 4,
   			"alreadyHasObj" : 0,
   .
   .
   (생략)
   }
   ```

   많은 항목이 나타나지만 "executionStages" 섹션에 executionTimeMillisEstimate, docsExamined 항목만 보면 쿼리가 향상되어 있음을 확인할 수 있다.

### 4. Data Type

=====================

### 5. Management

#### 5-1. Basics

1. 데이터베이스 정보

   - show dbs

     ```javascript
     > show dbs
     admin   0.000GB
     config  0.000GB
     local   0.000GB
     mydb    0.001GB
     ```

     전체 database가 리스팅 된다.

   - show collections

     ```javascript
     > show collections
     numbers
     user
     ```

     지금까지의 실습을 위해 mydb를 사용하고 있기 때문에 mydb의 collection들이 리스팅 된다.

   - stats()

     ```javascript
     > db.stats()
     {
     	"db" : "mydb",
     	"collections" : 2,
     	"views" : 0,
     	"objects" : 200001,
     	"avgObjSize" : 35.000384998075006,
     	"dataSize" : 7000112,
     	"storageSize" : 2383872,
     	"numExtents" : 0,
     	"indexes" : 3,
     	"indexSize" : 4313088,
     	"scaleFactor" : 1,
     	"fsUsedSize" : 144439803904,
     	"fsTotalSize" : 250685575168,
     	"ok" : 1
     }
     >
     ```

     사용 중인 database mydb의 정보가 출력된다.

     ```javascript
     > db.numbers.stats();
     {
     	"ns" : "mydb.numbers",
     	"size" : 7000000,
     	"count" : 200000,
     	"avgObjSize" : 35,
     	"storageSize" : 2347008,
     	"capped" : false,
     	"wiredTiger" : {
     		"metadata" : {
     			"formatVersion" : 1
     		},
     .
     .
     .
     (생략)
     ```

     collection에 대한 정보도 얻을 수 있다.

2. 도움말

   - 현재 사용 중인 database에 사용할 수 있는 명령 보기

     ```javascript
     > db.help()
     DB methods:
     
     	db.auth(username, password)
     	db.cloneDatabase(fromhost) - will only function with MongoDB 4.0 and below
     	db.commandHelp(name) returns the help for the command
     	db.copyDatabase(fromdb, todb, fromhost) - will only function with MongoDB 4.0 and below
     	db.createCollection(name, {size: ..., capped: ..., max: ...})
     	db.createUser(userDocument)
     	db.createView(name, viewOn, [{$operator: {...}}, ...], {viewOptions})
     	db.currentOp() displays currently executing operations in the db
     	db.dropDatabase(writeConcern)
     	db.dropUser(username)
     	db.eval() - deprecated
     	db.fsyncLock() flush data to disk and lock server for backups
     	db.fsyncUnlock() unlocks server following a db.fsyncLock()
     	db.getCollection(cname) same as db['cname'] or db.cname
     	.
       .
       .
     	(생략)
     > 
     ```

   - database의 collection에 사용할 수 있는 명령 보기

     ```javascript
     > db.user.help()
     DBCollection help
     	db.user.find().help() - show DBCursor help
     	db.user.convertToCapped(maxBytes) - calls {convertToCapped:'user', size:maxBytes}} command
     	db.user.createIndex(keypattern[,options])
     	db.user.createIndexes([keypatterns], <options>)
     	db.user.dataSize()
     	db.user.drop() drop the collection
     	db.user.dropIndexes()
     	db.user.ensureIndex(keypattern[,options]) - DEPRECATED, use createIndex() instead
     	db.user.explain().help() - show explain help
     	db.user.reIndex()
     	db.user.find(...).count()
     	db.user.find(...).limit(n)
     	db.user.find(...).skip(n)
     	db.user.find(...).sort(...)
     	db.user.findOne([query], [fields], [options], [readConcern])
     	db.user.getDB() get DB object associated with collection
     	db.user.getPlanCache() get query plan cache associated with collection
     	db.user.getIndexes()
     	db.user.insert(obj)
     	.
       .
       .
     	(생략)
     > 
     ```

   - 함수 구현 코드  출력

     ```javascript
     > db.numbers.insert
     function(obj, options) {
         if (!obj)
             throw Error("no object passed to insert!");
     
         var flags = 0;
     
         var wc = undefined;
         var allowDottedFields = false;
         if (options === undefined) {
             // do nothing
         } else if (typeof (options) == 'object') {
             if (options.ordered === undefined) {
                 // do nothing, like above
             } else {
                 flags = options.ordered ? 0 : 1;
             }
     
             if (options.writeConcern)
                 wc = options.writeConcern;
             if (options.allowdotted)
                 allowDottedFields = true;
         } else {
             flags = options;
         }
     
         // 1 = continueOnError, which is synonymous with unordered in the write commands/bulk-api
         var ordered = ((flags & 1) == 0);
     
         if (!wc)
             wc = this.getWriteConcern();
     
         var result = undefined;
         var startTime =
             (typeof (_verboseShell) === 'undefined' || !_verboseShell) ? 0 : new Date().getTime();
     	.
       .
       .
     	(생략)
     >
     ```

#### 5-2. Security &amp; Authentification

   1. admin 계정 추가

      ```javascript
       > use admin
       > db.createUser({user:"root", pwd:"password", roles:["root"]})
       Successfully added user: { "user" : "root", "roles" : [ "root" ] }
      ```

   2. --auth 옵션으로 mongod 실행하기

      Mac에서는 ~/Library/LaunchAgents/com.mongodb.mongod.plist 내용을 다음과 같이 수정하고 재실행한다.

      ```xml
       <?xml version="1.0" encoding="UTF-8"?>
       <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
       <plist version="1.0">
         <dict>
           <key>Label</key>
           <string>org.mongo.mongod</string>
           <key>RunAtLoad</key>
           <true/>
           <key>ProgramArguments</key>
           <array>
               <string>/Users/kickscar/Applications/mongodb-macos-x86_64-4.2.8/bin/mongod</string>
               <string>--dbpath</string>
               <string>/Users/kickscar/mongodb/db</string>
               <string>--logpath</string>
               <string>/Users/kickscar/mongodb/log/mongodb.log</string>
               <string>--auth</string>
           </array>
         </dict>
       </plist>
      ```

   3. admin db 접속

      ```javascript
       > use admin
       switched to db admin
       > db.auth('root', 'password')
       1
      ```

   4. mydb database에 사용자 추가하기

      ```javascript
       > use admin
       switched to db admin
       > db.auth('root', 'password')
       1
       > use mydb
       switched to db mydb
       > db.createUser( {user:"mydb", pwd:"mydb", roles:["readWrite"]} )
       Successfully added user: { "user" : "mydb", "roles" : [ "readWrite" ] }
      ```

   5. mydb 사용자로 mydb database 접속하기

      ```javascript
       $ mongo
       MongoDB shell version v4.2.8
       connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
       Implicit session: session { "id" : UUID("d9609c18-6273-4043-bae9-0332bbe72695") }
       MongoDB server version: 4.2.8
       > use mydb
       switched to db mydb
       > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
       WriteCommandError({
       	"ok" : 0,
       	"errmsg" : "command insert requires authentication",
       	"code" : 13,
       	"codeName" : "Unauthorized"
       })
       > 
      ```

      인증 없이 document insert 작업 시 오류가 발생한다.

      ```javascript
       > use mydb
       switched to db mydb
       > db.auth('mydb', 'mydb')
       1
       > db.user.insert({name:'둘리', email:'dooly@kickscar.me'})
       WriteResult({ "nInserted" : 1 })
       > db.user.find()
       { "_id" : ObjectId("5ef06036275e8e21067f6937"), "name" : "둘리", "email" : "dooly@kickscar.me" }
      ```

      인증 후, document insert 작업은 성공한다.

