package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Question;

@Repository
public interface QuestionRepository extends MongoRepository<Question,String> {

}
