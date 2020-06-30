## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch01. Installation

### 1. Mac(for Development)

​	개발을 위해 Mac에 MongoDB를 설치해 본다, brew를 사용해 설치하는 방법이 있지만 관리를 위해 tgz Archive를 다운받아 직접 설치하고 설정해 보는 것이 여러모로 편하고 유익하다. 자동 실행을 위해 서비스 등록을 하고 운용을 위한 간단한 방법을 정리한다.

#### 1-1. 다운로드
1. MongoDB Community Server(.tgz Archive) 다운로드

#### 1-2. 설치 

1. 적당한 위치에 .tgz 제거 후, 복사

#### 1-3. 서비스 등록

1. MongoDB startup plist 작성 및 설정

   - ~/Library/LaunchAgents/com.mongodb.mongod.plist 생성

   - 다음 내용 작성

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
         </array>
       </dict>
     </plist>
     ```

2. db및 로그 디렉토리 생성

   ```bash
   $ mkdir -p ~/mongodb/db
   $ mkdir -p ~/mongodb/log
   ```

3. 서비스 등록

   ```bash
   $ launchctl load ~/Library/LaunchAgents/com.mongodb.mongod.plist
   ```

4. 서비스 제거

   ```bash
   $ launchctl unload ~/Library/LaunchAgents/com.mongodb.mongod.plist
   ```

5. 서비스 실행

   ```bash
   $ launchctl start org.mongo.mongod
   ```

6. 서비스 종료

   ```bash
   $ launchctl start org.mongo.mongod
   ```

   

### 2. Linux(for Service Operations)

​	개발을 위해 Mac에 했던 설치 및 설정 방법에 다소 차이가 있지 전반적으로 크게 다르지 않다. 실행 바이너리는 MongoDB 소스를 다운받아 직접 컴파일하고 CentOS7 기준 서비스 데몬 설정을 한다.