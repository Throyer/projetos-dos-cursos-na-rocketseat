package com.github.throyer.happy.domain.orphanage.repositories;

import com.github.throyer.happy.domain.orphanage.models.Orphanage;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrphanageRepository extends MongoRepository<Orphanage, String> { }
