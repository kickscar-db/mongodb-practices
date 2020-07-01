## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch03. MongoDB Programming

### 1. [Python Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/1)

### 2. [Node Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/2)

### 3. [Java Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/3)

### 4. Understanding Driver

​	보통, 데이터베이스는 외부 프로그램과 정해진 프로토콜에 맞는 통신으로 기본 CRUD를 수행할 수 있어야 한다. 즉, 데이터베이스는 프로그래밍이 가능해야 한다. 데이터베이스 클라이언트라 부르는 이 프로그램을 작성할 수 있는 프로그래밍 언어는 많기도 하지만 새로 생겨날 가능성도 있기 때문에 데이터베이스가 이를 개별적으로 지원할 수는 없다. 그래서 보통 연결과 CRUD 등과 같은 기능의 인터페이스를 정의하고 개별적 언어들이 드라이버라 부르는 인터페이스의 구현체 라이브러리를 작성하고 지원하도록 하고 있다.

​	RDBMS는 연결, CRUD를 위한 SQL 실행과 결과 받기, 트랜잭션 관리 등에서 내부 통신 프로토콜에 차이가 있을 지 몰라도 지원하는 기능만 보면 벤더 별로 크게 차이가 나지 않는다. JDBC 드라이버라 부르는 Java의 경우, 프로그래밍 언어가 인터페이스를 정의하고 벤더들이 그 구현체 드라이버를 구현하여 제공하는 형태라 볼 수 있다.

​	No SQL 계열의 Mongo는 Python, Ruby, JavaScript, Java, C 등 언어별 드라이버를 직접 지원하고 있다. 그리고 다음의 Mongo의 드라이버 기능들을 이해해야 할 필요가 있다. 특히, RDBMS와 크게 차이점이 없는 정해진 프로토콜 기반의 네트워크 통신의 3번을 제외하고 Mongo만의 특별한 기능들을 이해해야 한다.

1. 모든 document의 _id에 저장되는 디폴트 객체 Id를 생성하는 기능

2. 각 언어의 드라이버는 자신들의 데이터셋과 BSON(Binary JSON) 사이의 변환 작업을 하는 기능이 있어야 한다.

3. MongoDB와 와이어 프로토콜을 통해 네트워크 통신 기능

   

#### 1-1. 객체ID

​	document의 primary key(문서를 식별하는) 이다. collection안에서 유일성을 보장해야 하며 각 document의 _id 필드에 저장되며 참조된다.  

#### 1-2. BSON
#### 1-3. Network

### 
