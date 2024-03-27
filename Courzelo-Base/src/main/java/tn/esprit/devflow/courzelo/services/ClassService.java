package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Class;
import tn.esprit.devflow.courzelo.repository.ClassRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ClassService implements IClassService{
    @Autowired
    ClassRepository  classRepository;
    @Override
    public List<Class> retrieveAllClass() {
        return classRepository.findAll();
    }

    @Override
    public Class addClass(Class classe) {
        return classRepository.save(classe);
    }

    @Override
    public Class updateClass(Class classe) {
        return classRepository.save(classe);
    }

    @Override
    public void deleteClass(String idClass) {
         classRepository.deleteById(idClass);
    }

    @Override
    public Class retrieveClass(String idClass) {
        Optional<Class> classOptional = classRepository.findById(idClass);
        return classOptional.get();
    }
}
