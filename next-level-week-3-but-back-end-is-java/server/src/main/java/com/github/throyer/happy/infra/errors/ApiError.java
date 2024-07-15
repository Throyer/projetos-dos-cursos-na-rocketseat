package com.github.throyer.happy.infra.errors;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Getter
public class ApiError {
  private final String message;
  private final Integer status;

  @JsonInclude(NON_NULL)
  public final Collection<ValidationError> errors;

  public ApiError(String message, Integer status) {
    this.message = message;
    this.status = status;
    this.errors = null;
  }

  public ApiError(String message, HttpStatusCode status) {
    this.message = message;
    this.status = status.value();
    this.errors = null;
  }

  public ApiError(HttpStatusCode status, Collection<ValidationError> errors) {
    this.message = "Check the 'errors' property for more details.";
    this.status = status.value();
    this.errors = errors;
  }

  public ApiError(HttpStatusCode status, String error) {
    this.message = "Check the 'errors' property for more details.";
    this.status = status.value();
    this.errors = List.of(new ValidationError(error));
  }

  public ApiError(HttpStatusCode status, ValidationError error) {
    this.message = "Check the 'errors' property for more details.";
    this.status = status.value();
    this.errors = List.of(error);
  }

  public static ResponseEntity<ApiError> fromException(ResponseStatusException exception) {
    return ResponseEntity.status(exception.getStatusCode())
      .body(new ApiError(exception.getReason(), exception.getStatusCode()));
  }
}
