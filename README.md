#Selenium 서버 실행
```bash
java -D'webdriver.chrome.driver=.\chromedriver.exe' -jar .\selenium-server-standalone-3.141.59.jar -timeout 300 -browserTimeout 60 -port 44444
```
#Crawler 실행
```bash
java -jar .\line-crawler-0.0.1-SNAPSHOT.jar
```

자세한건

https://github.com/seolminsu90/line-crawler/blob/master/README.md

를 참조해주세요.
