package com.github.throyer.happy.infra.errors;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import org.springframework.web.bind.MethodArgumentNotValidException;

import java.util.List;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_NULL;

@Getter
public class ValidationError {
  @JsonInclude(NON_NULL)
  private final String field;
  
  private final String message;

  public ValidationError(String message) {
    this.field = null;
    this.message = message;
  }

  public ValidationError(org.springframework.validation.FieldError error) {
    this.field = error.getField();
    this.message = error.getDefaultMessage();
  }

  public ValidationError(String field, String message) {
    this.field = field;
    this.message = message;
  }

  public static List<ValidationError> of(MethodArgumentNotValidException exception) {
    return exception.getBindingResult()
      .getAllErrors()
      .stream()
      .map((error) -> (new ValidationError((org.springframework.validation.FieldError) error)))
      .toList();
  }
}
