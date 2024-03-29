package tn.esprit.devflow.courzelo.services;

import tn.esprit.devflow.courzelo.entity.Module;
import java.util.List;

public interface IModuleService {

    public List<Module> retrieveAllModule();
    public Module addModule(Module Module);
    public Module updateModule(Module Module);
    public void deleteModule(String idmodule);
    public Module retrieveModule (String idmodule);
}
