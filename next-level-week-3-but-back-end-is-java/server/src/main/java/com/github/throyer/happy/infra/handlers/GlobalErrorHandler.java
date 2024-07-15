package com.github.throyer.happy.infra.handlers;

import com.github.throyer.happy.infra.errors.ApiError;
import com.github.throyer.happy.infra.errors.ValidationError;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import static com.github.throyer.happy.infra.errors.ApiError.fromException;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@RestControllerAdvice
public class GlobalErrorHandler {
  @ResponseStatus(code = BAD_REQUEST)
  @ExceptionHandler(MissingServletRequestParameterException.class)
  public ApiError badRequest(MissingServletRequestParameterException exception) {
    return new ApiError(BAD_REQUEST, new ValidationError(exception.getParameterName(), exception.getMessage()));
  }

  @ResponseStatus(code = BAD_REQUEST)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ApiError badRequest(MethodArgumentNotValidException exception) {
    return new ApiError(BAD_REQUEST, ValidationError.of(exception));
  }
  
  @ExceptionHandler(ResponseStatusException.class)
  public ResponseEntity<ApiError> status(ResponseStatusException exception) {
    return fromException(exception);
  }
}
