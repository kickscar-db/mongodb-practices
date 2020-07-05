## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch04. Scheme Design

### 1. 개요
### 2. 실습: 온라인 쇼핑몰

#### 2-1. RDBMS 정규화된 데이터 모델 : ERD

RDBMS의 모델링에 친숙하다 가정하고 실습 온라인 쇼핑몰의 비즈니스를 설명하기 위해 온라인 쇼핑몰 ERD를 제시한다. 그리고 각각의 Entity와 Relation을 Mongo의 Document 와 Relation 대체 테크닉으로 설명한다.

2-2. 상품

2-3. 카테고리

[계층구조 데이타 모델](http://mikehillyer.com/articles/managing-hierarchical-data-in-mysql/)

2-4. 카테고리와 상품(ManyToMany 관계)

2-5. 사용자

2-6. 주문

2-7. 사용자와 주문(OneToMany 관계) 

### 3. 디자인 패턴 

 	MonggoDB의 스키마 설계에 정해진 규칙은 없다. 하지만 MongoDB 스키마 설계 시, 권장되는 패턴은 많은 엔지니어들의 설계 애플리케이션 작성과 운용의 경험을 바탕으로 정리되어 존재한다. 온라인 쇼핑몰 실습도 그 패턴에 따라 작성되었다. 여기서는 그 패턴들을 다시 정리하면 다른 비즈니스 모델 적용에 도움이 될 것이다.     

### 
