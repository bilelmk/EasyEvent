package com.event_manager.eventservice.services;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
public class MapService {

    private ModelMapper modelMapper = new ModelMapper();

    public <S, D> D convert(S sourceObject, Class<D> targetObject) {
        return this.modelMapper.map(sourceObject, targetObject);
    }
}