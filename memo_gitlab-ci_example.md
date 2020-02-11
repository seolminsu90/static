## 깃랩 러너 스크립트 설정 샘플
```bash
.tag only: &tag_only
  only:
    # 태그가 1.2.3 또는 1.2.3.RC4와 같은 형식일 경우에만 실행한다.
    - /\d+\.\d+\.\d+(\.RC\d+)?/
  except:
    # 브랜치 푸시는 무시한다.
    - branches

TEST:compile:
  stage: test
  script: bash mvnw -Dmaven.test.skip=true clean compile
  only:
    - branches
  except:
    - tags

"배포:알파":
  stage: deploy
  environment:
    name: alpha
  script:
    - bash mvnw -Dmaven.test.skip=true -Ptest clean package
    - bash .deploy.sh
  <<: *tag_only
  when: manual

"배포:데모":
  stage: deploy
  environment:
    name: demo
  script:
    - bash mvnw -Dmaven.test.skip=true -Pdev clean package
    - bash .deploy.sh
  <<: *tag_only
  when: manual

"배포:실서비스":
  stage: deploy
  environment:
    name: real
  script:
    - bash mvnw -Dmaven.test.skip=true -Pproduction clean package
    - bash .deploy.sh
  <<: *tag_only
  when: manual

```
