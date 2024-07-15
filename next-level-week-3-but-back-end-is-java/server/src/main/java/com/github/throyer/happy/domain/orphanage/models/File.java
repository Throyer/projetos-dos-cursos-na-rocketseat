package com.github.throyer.happy.domain.orphanage.models;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.aventrix.jnanoid.jnanoid.NanoIdUtils.randomNanoId;
import static java.lang.String.format;

@Getter
public class File {
  private final byte[] bytes;
  private final String filename;

  public File(MultipartFile file) {
    try {
      this.filename = format("%s-%s", randomNanoId(), file.getOriginalFilename());
      this.bytes = file.getBytes();
    } catch (IOException exception) {
      throw new RuntimeException("failed to crate file", exception);
    }    
  }
  public static List<File> from(List<MultipartFile> multipartFiles) {
    return multipartFiles.stream().map(File::new).toList();
  }
}
