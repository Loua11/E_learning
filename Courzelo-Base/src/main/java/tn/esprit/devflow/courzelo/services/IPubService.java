package tn.esprit.devflow.courzelo.services;


import tn.esprit.devflow.courzelo.entity.Publication;

import java.util.List;

public interface IPubService {
    public List<Publication> retrieveAllPublication();
    public Publication addPublication(Publication Publication);
    public Publication updatePublication(Publication Publication);
    public void deletePublication(String idpub);
    public Publication retrievePublication (String idpub);
}
