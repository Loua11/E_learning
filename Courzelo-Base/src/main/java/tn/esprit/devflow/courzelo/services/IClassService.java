package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Class;

import java.util.List;

public interface IClassService {

    public List<Class> retrieveAllClass();
    public Class addClass(Class classe);
    public Class updateClass(Class classe);
    public void deleteClass(String idClass);
    public Class retrieveClass (String idClass);
}
