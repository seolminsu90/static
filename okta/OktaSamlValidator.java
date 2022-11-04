import lombok.extern.slf4j.Slf4j;
import org.opensaml.saml2.core.Response;
import org.opensaml.xml.security.credential.BasicCredential;
import org.opensaml.xml.signature.Signature;
import org.opensaml.xml.signature.SignatureValidator;
import org.opensaml.xml.signature.X509Certificate;
import org.opensaml.xml.signature.X509Data;
import org.opensaml.xml.validation.ValidationException;
import org.springframework.security.authentication.BadCredentialsException;

import java.io.ByteArrayInputStream;
import java.security.PublicKey;
import java.security.cert.Certificate;
import java.security.cert.CertificateException;
import java.security.cert.CertificateFactory;

@Slf4j
public class OktaSamlValidator {

    private OktaSamlValidator() {

    }

    public static OktaSamlValidator getInstance() {
        return LazyHolder.ins;
    }

    private static class LazyHolder {
        private static final OktaSamlValidator ins = new OktaSamlValidator();
    }

    public void validSignature(Response samlResponse) {
        try {
            Signature signature = samlResponse.getSignature();
            PublicKey publicKey = extractPublicKey(signature);
            SignatureValidator validator = createValidator(publicKey);
            validator.validate(samlResponse.getSignature());
            log.debug("Signature validation success");
        } catch (CertificateException e) {
            log.error("Invalid certification(public key)", e);
            throw new BadCredentialsException("Invalid certification(public key)", e);
        } catch (ValidationException e) {
            log.error("Signature validation fail.", e);
            throw new BadCredentialsException("Signature validation fail", e);
        }
    }

    private PublicKey extractPublicKey(Signature signature) throws CertificateException {
        X509Data x509Data = signature.getKeyInfo().getX509Datas().get(0);
        X509Certificate cert = x509Data.getX509Certificates().get(0);
        String wrappedCert = wrapBase64String(cert.getValue());
        CertificateFactory certFactory = CertificateFactory.getInstance("X.509");
        Certificate certificate = certFactory.generateCertificate(new ByteArrayInputStream(wrappedCert.getBytes()));
        return certificate.getPublicKey();
    }

    private String wrapBase64String(String base64String) {
        int lineLength = 64;
        char[] rawArr = base64String.toCharArray();
        int wrappedArrLength = rawArr.length + (int) Math.ceil(rawArr.length / 64d) - 1;
        char[] wrappedArr = new char[wrappedArrLength];

        int destPosition = 0;
        for (int i = 0; i < rawArr.length; i += lineLength) {
            if (rawArr.length - i > lineLength) {
                System.arraycopy(rawArr, i, wrappedArr, destPosition, lineLength);
                destPosition += lineLength;
                wrappedArr[destPosition] = '\n';
                destPosition += 1;
            } else {
                System.arraycopy(rawArr, i, wrappedArr, destPosition, rawArr.length - i);
            }
        }
        return "-----BEGIN CERTIFICATE-----\n" + String.valueOf(wrappedArr) + "\n-----END CERTIFICATE-----";
    }

    private SignatureValidator createValidator(PublicKey publicKey) {
        BasicCredential credential = new BasicCredential();
        credential.setPublicKey(publicKey);
        return new SignatureValidator(credential);
    }
}
