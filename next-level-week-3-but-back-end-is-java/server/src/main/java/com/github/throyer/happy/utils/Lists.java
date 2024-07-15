package com.github.throyer.happy.utils;

import java.util.List;
import java.util.Optional;

import static java.util.Optional.ofNullable;

public class Lists {
  public static <T> List<T> fromNullable(T[] array) {
    return ofNullable(array).map(List::of).orElse(List.of());
  }
}
