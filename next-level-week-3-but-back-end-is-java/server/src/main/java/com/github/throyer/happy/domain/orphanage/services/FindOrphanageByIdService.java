package com.github.throyer.happy.domain.orphanage.services;

import com.github.throyer.happy.domain.orphanage.dtos.OrphanageInfo;
import com.github.throyer.happy.domain.orphanage.repositories.OrphanageRepository;
import com.github.throyer.happy.infra.envs.ImageServerProperties;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;


@Service
@AllArgsConstructor
public class FindOrphanageByIdService {
  private final OrphanageRepository orphanageRepository;
  private final ImageServerProperties statics;

  public OrphanageInfo find(String id) {
    var orphanage = orphanageRepository.findById(id)
      .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "orphanage '%s' not found".formatted(id)));   
    return new OrphanageInfo(orphanage, statics);
  }
}
