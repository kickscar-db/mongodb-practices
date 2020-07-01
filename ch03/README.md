## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch03. MongoDB Programming

### 1. [Python Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/1)

### 2. [Node Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/2)

### 3. [Java Examples](https://github.com/kickscar-db/mongodb-practices/tree/master/ch03/3)

### 4. Understanding Driver

​	보통, 데이터베이스는 외부 프로그램과 통신을 통해 CRUD를 수행할 수 있어야 한다. 즉, 프로그래밍이 가능해야 한다. 이 프로그램을 개발하는 프로그래밍 언어는 수도 없이 많고 새로 생겨날 가능성도 있기 때문에 MongoDB가 다 이를 개별적으로 지원할 수는 없다. 그래서 연결, CRUD등 공통 인터페이스를 정의하고 언어별로 이 인터페이스를 구현하게 하고 있는 데, 그 구현된 라이브러리를 드라이버라 부른다.

​	RDBMS는 연결, CRUD를 위한 SQL 실행과 결과 받기, 트랜잭션 관리 등의 내부 통신 프로토콜에 차이가 있을 지 몰라도 지원하는 기능만 보면 벤더 별로 크게 차이가 나지 않는다. 프로그래밍 언어가 인터페이스를 정의하고 벤더들이 그 구현체 드라이버를 제공하는 모습도 보인다. JDBC Driver가 그 예이다.

​	No Sql 계열의 MongoDB는 Python, Ruby, JavaScript, Java, C 등 언어별로 지원하는 드라이버가 다양하다. MongoDB의 드라이버 기능은 정해진 프로토콜을 사용하는 네트워크 통신은  RDBMS와 동일하지만 다른 기능들도 있다. 

1. 모든 document의 _id에 저장되는 디폴트 객체 Id를 생성한다.

2. 각 언어의 드라이버는 자신들의 데이터셋과 BSON 사이의 변환 작업을 한다.

3. MongoDB와 와이어 프로토콜을 통해 네트워크 통신을 한다.

   

#### 1-1. 객체ID

​	document의 primary key(문서를 식별하는) 이다. collection안에서 유일성을 보장해야 하며 각 document의 _id 필드에 저장되며 참조된다.  

#### 1-2. BSON
#### 1-3. Network

### 
