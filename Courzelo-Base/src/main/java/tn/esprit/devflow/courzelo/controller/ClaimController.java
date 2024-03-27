package tn.esprit.devflow.courzelo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import tn.esprit.devflow.courzelo.entity.Claim;
import tn.esprit.devflow.courzelo.services.IClaimService;

import java.util.List;

    @RestController
    @CrossOrigin(origins = "http://localhost:4200")
    public class ClaimController {
        @Autowired
        private IClaimService claimService;

        @PostMapping("/addClaim")
        public Claim addClaim(@RequestBody Claim c) {
            return claimService.createClaim(c);
        }

        @GetMapping("/retrieveallClaims")
        @ResponseBody
        public List<Claim> getClaim() {
            List<Claim> listClaim = claimService.getAllClaim();
            return listClaim ;
        }

        @PutMapping("/updateClaim/{idClaim}")
        @ResponseBody
        public Claim modifyClaim(@RequestBody Claim c, @PathVariable String idClaim) {
            return claimService.updateClaim(c);
        }
        @DeleteMapping("/deleteClaim/{idclaim}")
        @ResponseBody
        public void deleteClaim(@PathVariable String idclaim) {
            claimService.deleteClaim(idclaim);
        }

        @GetMapping("/retrieveidClaim/{idClaim}")
        @ResponseBody
        public Claim retrieveClaim (@PathVariable("idClaim")String idclaim) {
            return claimService.getClaimById(idclaim);
        }

       /* @GetMapping("/affecteClaimUser/{idClaim}/{idUser}")
        @ResponseBody
        public void assignClaim(String idClaim, String userId){
            claimService.assignClaim(idClaim,userId);
        }*/
    }

