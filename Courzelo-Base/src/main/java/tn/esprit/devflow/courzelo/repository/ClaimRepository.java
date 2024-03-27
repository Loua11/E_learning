package tn.esprit.devflow.courzelo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Status;
import tn.esprit.devflow.courzelo.entity.TypeClaim;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ClaimRepository  extends MongoRepository<Claim,String> {
    Claim findClaimByIdclaim(String idclaim);
    List<Claim> findClaimByTitle(String string);
    List<Claim> findClaimByStatus(Status status);
    List<Claim>  findClaimByTypeclaimAndAndStatus(TypeClaim tp, Status status);
    List<Claim> findClaimsByDateclaimBetween(LocalDate startOfDay, LocalDate endOfDay);
}
