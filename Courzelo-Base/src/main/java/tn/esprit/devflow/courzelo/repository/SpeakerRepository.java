package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import tn.esprit.devflow.courzelo.entity.Speaker;

public interface SpeakerRepository extends MongoRepository<Speaker,String> {
}
