package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByIduser(String iduser);
    User findByEmail(String email);
    User findByUsername(String username);
}
