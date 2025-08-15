package com.brodeckyondrej.SignUp.TestClass;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/test-class")
public class TestClassController {

    @Autowired
    TestClassService testClassService;

    @PostMapping("/")
    ResponseEntity<TestClass> saveTestClass(@RequestBody TestClass testClass) {
        return new ResponseEntity<>(testClassService.save(testClass), HttpStatus.CREATED);
    }

    @GetMapping("/")
    ResponseEntity<List<TestClass>> getAll(){
        return new ResponseEntity<>(testClassService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    ResponseEntity<TestClass> getById(@PathVariable UUID id){
        return new ResponseEntity<>(testClassService.findById(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteById(@PathVariable UUID id){
        testClassService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
