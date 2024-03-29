package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Course;
import tn.esprit.devflow.courzelo.entity.Program;

import java.util.List;

public interface IProgramService {
    public List<Program> retrieveAllProgram();
    public Program addProgram(Program Program);
    public Program updateProgram(Program Program);
    public void deleteProgram(String idprog);
    public Program retrieveProgram (String idprog);
}
