package com.github.throyer.happy.domain.orphanage.controllers;

import com.github.throyer.happy.domain.orphanage.dtos.OrphanageInfo;
import com.github.throyer.happy.domain.orphanage.services.FindAllOrphanagesService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orphanages")
@AllArgsConstructor
public class ListAllOrphanagesController {
  private final FindAllOrphanagesService service;
  
  @GetMapping
  public List<OrphanageInfo> index() {
    return service.findAll();
  }
}
