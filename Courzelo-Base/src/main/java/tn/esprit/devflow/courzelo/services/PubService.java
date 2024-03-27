package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.devflow.courzelo.entity.Publication;
import tn.esprit.devflow.courzelo.repository.PubRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PubService implements IPubService {
    @Autowired
    PubRepository pubRepository;
    @Override
    public List<Publication> retrieveAllPublication() {
        return pubRepository.findAll();
    }

    @Override
    public Publication addPublication(Publication Publication) {
        return pubRepository.save(Publication);
    }

    @Override
    public Publication updatePublication(Publication Publication) {
        return pubRepository.save(Publication);
    }

    @Override
    public void deletePublication(String idpub) {
pubRepository.deleteById(idpub);
    }

    @Override
    public Publication retrievePublication(String idpub) {
        Optional<Publication> pubOptional = pubRepository.findById(idpub);
        return pubOptional.get();
    }
}
