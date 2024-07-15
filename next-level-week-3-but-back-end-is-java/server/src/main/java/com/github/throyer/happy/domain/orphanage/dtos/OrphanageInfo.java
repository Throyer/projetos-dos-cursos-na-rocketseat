package com.github.throyer.happy.domain.orphanage.dtos;

import com.github.throyer.happy.domain.orphanage.models.Image;
import com.github.throyer.happy.domain.orphanage.models.Orphanage;
import com.github.throyer.happy.infra.envs.ImageServerProperties;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import static java.lang.String.format;

@Getter
public class OrphanageInfo {
  private final String id;
  private final String name;
  private final BigDecimal latitude;
  private final BigDecimal longitude;
  private final String about;
  private final String instructions;
  private final String opening_hours;
  private final Boolean open_on_weekends;
  private final List<Map<String, String>> images;

  public OrphanageInfo(Orphanage orphanage, ImageServerProperties staticFilesServer) {
    this.id = orphanage.getId();
    this.name = orphanage.getName();
    this.latitude = orphanage.getLatitude();
    this.longitude = orphanage.getLongitude();
    this.about = orphanage.getAbout();
    this.instructions = orphanage.getInstructions();
    this.opening_hours = orphanage.getOpeningHours();
    this.open_on_weekends = orphanage.getOpenOnWeekends();
    this.images = orphanage.getImages().stream()
      .map(image -> Map.of("url", format("%s/%s", staticFilesServer.getHost(), image.getPath())))
        .toList();
  }
}
