## Jenkins 컨테이너 설치

### jenkins docker 이미지를 설치한다.

```bash
docker run \
  -p 8080:8080 -p 50000:50000 \
  -v /home/jenkins/:/var/jenkins_home \
  --name my-jenkins \
  jenkins/jenkins
/home/jenkins 폴더안에 jenkins 데이터가 저장되며, uid(1000) 유저 권한을 부여해야 한다. (이 경로는 원하는 경로로 변경할 수 있다.)
chown 1000 /home/jenkins/
```

### jenkins 실행 후 화면에 표시되는 비밀키를 복사하고, http://serverip:8080/ 접속시 표시되는 화면에 입력한다.

### 최초 사용자를 등록하고, 추천 플러그인들을 설치한다.

http://serverip:8080/jenkins/ 와 같이 context path를 지정하려면 아래 옵션을 추가한다.
```bash
docker run \
  -p 8080:8080 -p 50000:50000 \
  -v /home/jenkins/:/var/jenkins_home \
  --name my-jenkins \
  -e "JENKINS_OPTS=--prefix=/jenkins" \
  jenkins/jenkins
```
### github 계정 설정 (private 저장소인 경우에만 해당)

Credentials > System > Global credentials > Add Credentials 메뉴 선택

개인키를 만들지 않은 경우
Kind : Username with password 선택
Username, Password : github 로그인 정보 입력

개인키가 있는 경우
Kind : SSH Username with private key 선택
Username : github 계정
Private Key : (Enter directly, Add, 내용 복사)

### jdk 설정

Global Tool Configuration 페이지

JDK > JDK installations… 클릭

Add JDK 클릭

Name: java8

JAVA_HOME: /usr/local/openjdk-8 입력 (도커 이미지에 포함되어 있다)

Save 클릭

### 프로젝트 생성

새로운 Item 선택

프로젝트명 입력하고 Free style project 선택

#### General 항목

Github project: 프로젝트 url을 입력하면 바로 이동할 수 있는 링크버튼이 생긴다

소스 코드 관리

Git 을 선택하고 repository url를 입력한다 (git 저장소 주소)

crendentials은 위에서 생성한것을 선택한다

#### 빌드 유발

빌드를 원격으로 유발 (github의 webhook에 이 주소를 입력할 경우 자동빌드하도록 설정할 수 있다)

Build after other projects are built : 다른 프로젝트의 후속으로 자동 빌드되어야할 경우 선택하고 선행 프로젝트명 입력

Build periodically : 주기적으로 빌드되어야할 경우 crontab 형태로 입력

#### Build

1. Invoke top-level Maven targets 선택방식

maven version: maven

goals: clean install 혹은 clean package 등 입력

-DskipTests=true 를 추가하면 빌드하면서 테스트 수행 생략

2. Execute Shell 방식

스크립트 커맨드 입력
ex)
```bash
cd xxx...
mvn clean package -DskipTests=true...
java -jar xxx...
```
