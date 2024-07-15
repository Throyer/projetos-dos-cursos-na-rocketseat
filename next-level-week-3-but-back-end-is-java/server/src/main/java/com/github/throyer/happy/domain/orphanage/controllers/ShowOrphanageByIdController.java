package com.github.throyer.happy.domain.orphanage.controllers;

import com.github.throyer.happy.domain.orphanage.dtos.OrphanageInfo;
import com.github.throyer.happy.domain.orphanage.models.Orphanage;
import com.github.throyer.happy.domain.orphanage.repositories.OrphanageRepository;
import com.github.throyer.happy.domain.orphanage.services.FindOrphanageByIdService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.NOT_FOUND;
import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequestMapping("/orphanages")
@AllArgsConstructor
public class ShowOrphanageByIdController {
  private final FindOrphanageByIdService service;

  @GetMapping("/{orphanage_id}")
  public ResponseEntity<OrphanageInfo> index(@PathVariable(name = "orphanage_id") String id) {
    return ok(service.find(id));
  }
}
