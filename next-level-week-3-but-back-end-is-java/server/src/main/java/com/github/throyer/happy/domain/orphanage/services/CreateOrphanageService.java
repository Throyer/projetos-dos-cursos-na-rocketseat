package com.github.throyer.happy.domain.orphanage.services;

import com.github.throyer.happy.domain.orphanage.dtos.CreateOrphanageData;
import com.github.throyer.happy.domain.orphanage.dtos.OrphanageInfo;
import com.github.throyer.happy.domain.orphanage.models.File;
import com.github.throyer.happy.domain.orphanage.models.Image;
import com.github.throyer.happy.domain.orphanage.models.Orphanage;
import com.github.throyer.happy.domain.orphanage.repositories.OrphanageRepository;
import com.github.throyer.happy.infra.envs.ImageServerProperties;
import com.github.throyer.happy.utils.Lists;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@Service
@AllArgsConstructor
public class CreateOrphanageService {
  private final OrphanageRepository orphanageRepository;
  private final UploadImageService uploadService;
  private final ImageServerProperties statics;
  
  public OrphanageInfo image(CreateOrphanageData data) {
    var files = Lists.fromNullable(data.getImages());    
    var orphanage = orphanageRepository.save(new Orphanage(data, upload(files)));    
    return new OrphanageInfo(orphanage, statics);
  }
  
  public List<Image> upload(List<MultipartFile> multipartFiles) {
    try {
      var files = File.from(multipartFiles);      
      uploadService.upload(files);
      return Image.from(files);
    } catch (Exception exception) {
      throw new ResponseStatusException(INTERNAL_SERVER_ERROR, "error on upload images");
    }
  };
}
