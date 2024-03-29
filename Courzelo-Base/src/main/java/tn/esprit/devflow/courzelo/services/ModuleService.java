package tn.esprit.devflow.courzelo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import tn.esprit.devflow.courzelo.entity.Module;
import tn.esprit.devflow.courzelo.repository.ModuleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService implements IModuleService{
    @Autowired
    ModuleRepository moduleRepository;
    @Override
    public List<Module> retrieveAllModule() {
        return moduleRepository.findAll();
    }

    @Override
    public Module addModule(Module Module) {
        return moduleRepository.save(Module);
    }

    @Override
    public Module updateModule(Module Module) {
        return moduleRepository.save(Module);
    }

    @Override
    public void deleteModule(String idmodule) {
moduleRepository.deleteById(idmodule);
    }

    @Override
    public Module retrieveModule(String idmodule) {
        Optional<Module> moduleOptional = moduleRepository.findById(idmodule);
        return moduleOptional.get();
    }
}
