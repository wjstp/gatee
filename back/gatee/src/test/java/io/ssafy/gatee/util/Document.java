package io.ssafy.gatee.util;

import org.springframework.restdocs.mockmvc.RestDocumentationResultHandler;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.request.ParameterDescriptor;

import java.util.List;

import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.formParameters;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;

public interface Document {
    static RestDocumentationResultHandler getMethodDocument(String identifier,
                                                            List<ParameterDescriptor> queryParameters,
                                                            List<FieldDescriptor> responseFields){
        return document(identifier,
                ApiDocumentUtils.getRequestPreProcessor(),
                ApiDocumentUtils.getResponsePreProcessor(),
                formParameters(queryParameters),
                responseFields(responseFields));
    }

    static RestDocumentationResultHandler getMethodDocument(String identifier,
                                                            List<FieldDescriptor> responseFields){
        return document(identifier,
                ApiDocumentUtils.getRequestPreProcessor(),
                ApiDocumentUtils.getResponsePreProcessor(),
                responseFields(responseFields));
    }

    static ParameterDescriptor queryParam(String name, String description){
        return parameterWithName(name).description(description);
    }

    static FieldDescriptor responseField(String jsonPath, String description){
        return fieldWithPath(jsonPath).description(description);
    }
}
