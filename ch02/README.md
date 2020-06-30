## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch02. Basics

### 1. 개요
​	MongoDB 데이터의 기본 단위는 Document이다. RDBMS의 Table의 row와 유사하다. Document의 모음을 Collection이라 하며 RDBMS의 Table로 생각할 수 있다. MongoDB의 실행 즉, 하나의 인스탄스로 여러 데이터베이스를 운용할 수 있다

#### 1-1. Document

=================================================

#### 1-2. Collection

=================================================

#### 1-3. Database(instance)

=================================================

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
   > db.runCommand( { listCollections: 1.0, nameOnly: true } )
   {
   	"cursor" : {
   		"id" : NumberLong(0),
   		"ns" : "mydb.$cmd.listCollections",
   		"firstBatch" : [ ]
     },
     "ok" : 1
   }
   ```

   ​	collection list를 출력하기 위해서는 runCommand(...) 함수를 사용해야 한다. 결과는 firstBatch이름의 배열에 collection 정보가 들어 있다. 하나의 collection도 존재하지 않음을 확인할 수 있다. 

   

### 3. Data Type

=================================================



### 4. Management

#### 4-1. MongoDB 시작과 중지

=================================================

#### 4-2. Monitoring

=================================================

#### 4-3. Security &amp; Authentification

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

