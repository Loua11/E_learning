package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.entity.Status;
import tn.esprit.devflow.courzelo.entity.TypeClaim;
import tn.esprit.devflow.courzelo.repository.ClaimRepository;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ClaimService implements IClaimService {

    @Autowired
    private ClaimRepository claimRepository;


    @Override
    public Claim createClaim(Claim claimDTO) {

        return claimRepository.save(claimDTO);
    }

    @Override
    public Claim getClaimById(String idclaim) {

        Optional<Claim> claimOptional = claimRepository.findById(idclaim);
        return claimOptional.get();
    }

    @Override

    public List<Claim> getAllClaim() {

        return claimRepository.findAll();
    }

    @Override
    public Claim updateClaim(Claim claim) {
       return claimRepository.save(claim);
    }

    @Override
    public void deleteClaim(String idclaim) {
       claimRepository.deleteById(idclaim);
    }

 /*   @Override
    public void assignClaim(String idClaim, String userId) {
        User user = userRepository.findByIduser(userId);
        Claim claim = claimRepository.findClaimByIdclaim(idClaim);
        if (user != null && claim != null) {
            claim.setUser(user);
            claimRepository.save(claim);
        }
    }*/


    @Override
    public List<Claim> filterClaimsByStatus(Status status) {
        List<Claim> claim = claimRepository.findClaimByStatus(status);
        return claim;
    }

    @Override
    public List<Claim> searchClaimsByTitle(String Title) {
        List<Claim> claim = claimRepository.findClaimByTitle(Title);
        return claim;
    }


    @Override
    public List<Claim> getClaimsbyTypeandStatus(Status s, TypeClaim tp) {
        List<Claim> c = claimRepository.findClaimByTypeclaimAndAndStatus(tp , s);
        return c;
    }

    @Override
    public Map<Status, Double> calculateClaimPercentagesForDay(LocalDate date) {
        LocalDate startOfDay = date.atStartOfDay().toLocalDate();
        LocalDate endOfDay = startOfDay.plusDays(1).atTime(23, 59, 59).toLocalDate();
        List<Claim> claimsForDay = claimRepository.findClaimsByDateclaimBetween(startOfDay, endOfDay);

        int totalClaims = claimsForDay.size();
        Map<Status, Long> claimStatusCounts = new HashMap<>();
        for (Status status : Status.values()) {
            long count = claimsForDay.stream()
                    .filter(claim -> claim.getStatus() == status)
                    .count();
            claimStatusCounts.put(status, count);
        }

        Map<Status, Double> claimStatusPercentages = new HashMap<>();
        for (Map.Entry<Status, Long> entry : claimStatusCounts.entrySet()) {
            double percentage = (entry.getValue() * 100.0) / totalClaims;
            claimStatusPercentages.put(entry.getKey(), percentage);
        }

        return claimStatusPercentages;
    }
}
