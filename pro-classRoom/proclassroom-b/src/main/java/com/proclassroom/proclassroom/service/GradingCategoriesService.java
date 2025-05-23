package com.proclassroom.proclassroom.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.proclassroom.proclassroom.dto.GradingCategoriesDTO;
import com.proclassroom.proclassroom.model.ClassRoom;
import com.proclassroom.proclassroom.model.GradingCategories;
import com.proclassroom.proclassroom.repository.ClassroomRepository;
import com.proclassroom.proclassroom.repository.GradingCategoriesRepositroy;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class GradingCategoriesService {

    @Autowired
    private ClassroomRepository classroomRepository;

    @Autowired
    private GradingCategoriesRepositroy gradingCategoriesRepositroy;

    public GradingCategories createGraing(GradingCategoriesDTO dto) {

        ClassRoom persentClass = classroomRepository.findById(dto.getClassRoom())
                .orElseThrow(() -> new IllegalArgumentException("ClassRoom is not Found" + dto.getClassRoom()));

        GradingCategories newGradingCategories = new GradingCategories();
        newGradingCategories.setClassRoom(persentClass);
        newGradingCategories.setName(dto.getName());
        newGradingCategories.setWeight(dto.getWeight());

        return gradingCategoriesRepositroy.save(newGradingCategories);

    }

}
