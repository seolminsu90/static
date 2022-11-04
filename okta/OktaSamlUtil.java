import org.opensaml.Configuration;
import org.opensaml.DefaultBootstrap;
import org.opensaml.saml2.core.Response;
import org.opensaml.xml.ConfigurationException;
import org.opensaml.xml.io.Unmarshaller;
import org.opensaml.xml.io.UnmarshallerFactory;
import org.opensaml.xml.io.UnmarshallingException;
import org.opensaml.xml.util.XMLHelper;
import org.w3c.dom.Element;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.util.Base64;

public class OktaSamlUtil {
    private static Element parseNodeElement(byte[] base64EncodedSamlResponse) throws Exception {
        DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        documentBuilderFactory.setNamespaceAware(true);
        DocumentBuilder parserPool = documentBuilderFactory.newDocumentBuilder();

        return parserPool
                .parse(new ByteArrayInputStream(base64EncodedSamlResponse))
                .getDocumentElement();
    }

    private static Element parseNodeElement(String base64EncodedSamlResponse) throws Exception {
        return parseNodeElement(Base64.getDecoder().decode(base64EncodedSamlResponse));
    }

    public static String prettyPrint(Element node) {
        return XMLHelper.prettyPrintXML(node);
    }

    public static Response parseResponse(String base64EncodedSamlResponse) throws Exception {
        Element node = parseNodeElement(base64EncodedSamlResponse);
        DefaultBootstrap.bootstrap();
        UnmarshallerFactory factory = Configuration.getUnmarshallerFactory();
        Unmarshaller unmarshaller = factory.getUnmarshaller(node);

        return (Response) unmarshaller.unmarshall(node);
    }

    public static Response parseResponse(Element node) throws UnmarshallingException, ConfigurationException {
        DefaultBootstrap.bootstrap();
        UnmarshallerFactory factory = Configuration.getUnmarshallerFactory();
        Unmarshaller unmarshaller = factory.getUnmarshaller(node);

        return (Response) unmarshaller.unmarshall(node);
    }
}
