package com.github.throyer.happy.domain.orphanage.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateOrphanageData {
  @NotBlank
  private String name;

  @NotNull
  private BigDecimal latitude;

  @NotNull
  private BigDecimal longitude;

  @NotBlank
  private String about;

  @NotBlank
  private String instructions;

  @NotBlank
  private String opening_hours;

  private MultipartFile[] images;

  private Boolean open_on_weekends = false;
}
