package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.devflow.courzelo.entity.Lesson;
import tn.esprit.devflow.courzelo.entity.Program;
import tn.esprit.devflow.courzelo.repository.ProgramRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService implements IProgramService {
    @Autowired
    ProgramRepository progRepository;
    @Override
    public List<Program> retrieveAllProgram() {
        return progRepository.findAll();
    }

    @Override
    public Program addProgram(Program Program) {
        return progRepository.save(Program);
    }

    @Override
    public Program updateProgram(Program Program) {
        return progRepository.save(Program);
    }

    @Override
    public void deleteProgram(String idprog) {
progRepository.deleteById(idprog);
    }

    @Override
    public Program retrieveProgram(String idprog) {
        Optional<Program> progOptional = progRepository.findById(idprog);
        return progOptional.get();
    }
}
