## [mongodb-practices](https://github.com/kickscar-db/mongodb-practices) / ch01. Installtion

### 1. Mac(for Development, .tgz Archive 설치)

1. 다운로드 MongoDB Community Server(.tgz Archive)

2. 적당한 위치에 .tgz 제거 후, 복사 

3. MongoDB startup plist 작성 및 설정

   - ~/Library/LaunchAgents/com.mongodb.mongod.plist 생성

   - 다음 내용 작성

     ```XML
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

   - db및 로그 디렉토리 생성

     ```bash
     $ mkdir -p ~/mongodb/db
     $ mkdir -p ~/mongodb/log
     ```

   - 서비스 등록

     ```bash
     $ launchctl load ~/Library/LaunchAgents/com.mongodb.mongod.plist
     ```

   - 서비스 제거

     ```bash
     $ launchctl unload ~/Library/LaunchAgents/com.mongodb.mongod.plist
     ```

   - 서비스 실행

     ```bash
     $ launchctl start org.mongo.mongod
     ```

   - 서비스 종료

     ```bash
     $ launchctl stop org.mongo.mongod
     ```

     

### 2. Linux(for Service Operations, Source Compile Installation)