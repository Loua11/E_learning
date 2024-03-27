package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.ReadPreference;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Quiz;

@Repository
public interface QuizRepository extends MongoRepository<Quiz,String> {
}
