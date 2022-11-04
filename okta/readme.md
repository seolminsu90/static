## SAMLResponse 변조 검증용

### 사용예시
```
String base64StringResponse = {{ ENCODED_SAML_RESPONSE_BY_BASE64 }};

Response response = OktaSamlUtil.parseResponse(base64StringResponse);
OktaSamlValidator.getInstance().validSignature(response);
```

### Requirements

```xml
<dependency>
    <groupId>org.opensaml</groupId>
    <artifactId>opensaml</artifactId>
    <version>2.6.0</version>
</dependency>
```
