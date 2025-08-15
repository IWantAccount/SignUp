package com.brodeckyondrej.SignUp.TestClass;

import jakarta.transaction.Transactional;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TestClassService {

    private TestClassRepository repository;

    @Autowired
    public TestClassService(TestClassRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public List<TestClass> findAll() {
        return repository.findAll();
    }

    @Transactional
    public TestClass findById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public TestClass save(TestClass testClass) {
        return repository.save(testClass);
    }

    @Transactional
    public void delete(UUID id) {
        repository.deleteById(id);
    }
}
