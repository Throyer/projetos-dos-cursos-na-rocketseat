package com.github.throyer.happy.domain.orphanage.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Image {
  private String path;

  public Image(String path) {
    this.path = path;
  }
  
  public static List<Image> from(List<File> files) {
    return files.stream().map(File::getFilename).map(Image::new).toList();
  }
}
