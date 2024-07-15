package com.github.throyer.happy.domain.orphanage.services;

import com.github.throyer.happy.domain.orphanage.dtos.OrphanageInfo;
import com.github.throyer.happy.domain.orphanage.repositories.OrphanageRepository;
import com.github.throyer.happy.infra.envs.ImageServerProperties;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FindAllOrphanagesService {
  private final OrphanageRepository orphanageRepository;
  private final ImageServerProperties statics;
  
  public List<OrphanageInfo> findAll() {
    var orphanages = orphanageRepository.findAll();
    return orphanages.stream()
      .map(orphanage -> new OrphanageInfo(orphanage, statics))
      .toList();
  }
}
